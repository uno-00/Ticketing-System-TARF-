<?php

namespace App\Services;

use App\Models\Form;
use App\Models\Ticket;
use App\Models\User;
use App\Support\ApiException;
use App\Support\AuthUser;
use App\Support\Id;
use App\Utils\PlacementValues;
use App\Utils\ProfilePlacementFields;
use App\Utils\TicketNumber;

class TicketService
{
    private const ADMIN_STATUS_UPDATES = ['open', 'in_progress', 'pending', 'reopened'];

    public function __construct(
        private FormService $forms,
        private ActivityService $activity,
        private TicketConversationService $ticketConversations,
    ) {}

    /**
     * @param  array{answers: array<string, mixed>, attachmentUrl?: string, attachmentName?: string, attachmentMimeType?: string}  $body
     * @return array<string, mixed>
     */
    public function createTicketFromClient(AuthUser $user, string $formId, array $body): array
    {
        $form = $this->forms->getPublishedForm($formId);
        $answers = $body['answers'] ?? [];
        $subject = (string) ($answers['txt_subject'] ?? $answers['subject'] ?? $form['title']);

        $attachmentUrl = $body['attachmentUrl'] ?? null;
        $attachmentMimeType = $body['attachmentMimeType'] ?? null;
        $attachmentName = $body['attachmentName'] ?? null;
        if (
            $attachmentUrl
            && $attachmentMimeType
            && $attachmentMimeType !== 'application/pdf'
            && ! preg_match('/\.pdf$/i', (string) ($attachmentName ?? $attachmentUrl))
        ) {
            throw new ApiException(400, 'Only PDF attachments are allowed');
        }

        $mergedAnswers = ProfilePlacementFields::mergeRequesterProfileIntoAnswers([
            'name' => $user->name,
            'email' => $user->email,
            'division' => $user->division,
        ], $answers);

        $fields = $form['fields'] ?? [];
        $storedAnswers = PlacementValues::normalizeTicketAnswers($fields, $mergedAnswers);

        $description = collect($fields)->map(function ($field) use ($storedAnswers) {
            $variable = (string) ($field['variable'] ?? '');
            $value = PlacementValues::resolveAnswerForVariable($storedAnswers, $variable);
            $type = (string) ($field['type'] ?? 'textbox');
            if ($value === null || $value === '') {
                $formatted = '—';
            } elseif ($type === 'checkbox') {
                $formatted = ($value === true || $value === 'true') ? 'Yes' : 'No';
            } else {
                $formatted = is_array($value) ? implode(', ', $value) : (string) $value;
            }

            return (($field['label'] ?? $variable).': '.$formatted);
        })->implode("\n");

        $ticket = Ticket::create([
            'ticket_number' => TicketNumber::generateTicketNumber(),
            'form_id' => $formId,
            'form_title' => $form['title'],
            'title' => $form['title'].' — '.$subject,
            'description' => $description,
            'creator_id' => $user->id,
            'creator_name' => $user->name,
            'creator_email' => $user->email,
            'division' => $user->division,
            'answers' => $storedAnswers,
            'attachment_url' => (string) ($attachmentUrl ?? ''),
            'attachment_name' => (string) ($attachmentName ?? ''),
            'attachment_mime_type' => (string) ($attachmentMimeType ?? ''),
            'status' => 'pending_approval',
            'priority' => 'medium',
            'rejection_reason' => '',
            'feedback_comment' => '',
            'feedback_submitted' => false,
            'client_confirmed' => false,
        ]);

        $this->activity->logActivity($user, [
            'action' => 'ticket_created',
            'entityType' => 'ticket',
            'entityId' => (string) $ticket->id,
            'summary' => 'Request '.$ticket->ticket_number.' submitted — pending admin approval',
        ]);

        $this->ticketConversations->ensureTicketConversation((string) $ticket->id);

        return $ticket->fresh(['assignees'])->toApiArray();
    }

    /**
     * @param  array{status?: string, search?: string, page?: int, limit?: int}  $query
     * @return array{items: list<array<string, mixed>>, total: int, page: int, limit: int, pendingCount: int}
     */
    public function listTicketsForAdmin(array $query): array
    {
        $page = max(1, (int) ($query['page'] ?? 1));
        $limit = min(50, (int) ($query['limit'] ?? 20));
        $builder = Ticket::query()->with('assignees');

        if (! empty($query['status'])) {
            $builder->where('status', $query['status']);
        }
        if (! empty($query['search']) && trim($query['search']) !== '') {
            $search = trim($query['search']);
            $builder->where(function ($q) use ($search) {
                $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('ticket_number', 'like', '%'.$search.'%')
                    ->orWhere('creator_name', 'like', '%'.$search.'%');
            });
        }

        $total = (clone $builder)->count();
        $pendingCount = Ticket::query()->where('status', 'pending_approval')->count();
        $items = $builder->orderByDesc('updated_at')
            ->skip(($page - 1) * $limit)
            ->limit($limit)
            ->get()
            ->map(fn (Ticket $t) => $t->toApiArray())
            ->all();

        return compact('items', 'total', 'page', 'limit', 'pendingCount');
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function listTicketsForClient(string $userId): array
    {
        return Ticket::query()
            ->with('assignees')
            ->where('creator_id', $userId)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Ticket $t) => $t->toApiArray())
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    public function getTicketById(string $id): array
    {
        $ticket = Ticket::query()
            ->with([
                'assignees',
                'creator',
                'form' => fn ($q) => $q->select([
                    'id', 'title', 'ref_number', 'fields', 'print_template',
                    'print_template_image_path', 'print_placements', 'print_placement_font_size',
                    'work_procedure_path', 'work_procedure_name',
                ]),
            ])
            ->find($id);

        if (! $ticket) {
            throw new ApiException(404, 'Ticket not found');
        }

        return $ticket->toApiArray();
    }

    /**
     * @param  array<string, mixed>  $ticket
     */
    public function assertTicketAccess(AuthUser $user, array $ticket): void
    {
        if ($user->role === 'admin') {
            return;
        }

        $creatorId = Id::of($ticket['creatorId'] ?? '');
        if ($user->role === 'user' && $creatorId === $user->id) {
            return;
        }

        throw new ApiException(403, 'You do not have access to this request');
    }

    /**
     * @return array<string, mixed>
     */
    public function approveTicket(AuthUser $actor, string $id): array
    {
        $ticket = Ticket::query()->find($id);
        if (! $ticket) {
            throw new ApiException(404, 'Ticket not found');
        }
        if ($ticket->status !== 'pending_approval') {
            throw new ApiException(400, 'Ticket is not pending approval');
        }

        $ticket->status = 'open';
        $ticket->save();

        $this->activity->logActivity($actor, [
            'action' => 'ticket_approved',
            'entityType' => 'ticket',
            'entityId' => (string) $ticket->id,
            'summary' => 'Request '.$ticket->ticket_number.' approved',
        ]);

        $this->ticketConversations->syncTicketConversationParticipants((string) $ticket->id);

        return $ticket->fresh(['assignees'])->toApiArray();
    }

    /**
     * @return array<string, mixed>
     */
    public function rejectTicket(AuthUser $actor, string $id, string $reason): array
    {
        $ticket = Ticket::query()->find($id);
        if (! $ticket) {
            throw new ApiException(404, 'Ticket not found');
        }
        if ($ticket->status !== 'pending_approval') {
            throw new ApiException(400, 'Ticket is not pending approval');
        }

        $ticket->status = 'rejected';
        $ticket->rejection_reason = $reason;
        $ticket->save();

        $this->activity->logActivity($actor, [
            'action' => 'ticket_rejected',
            'entityType' => 'ticket',
            'entityId' => (string) $ticket->id,
            'summary' => 'Request '.$ticket->ticket_number.' rejected',
            'meta' => ['reason' => $reason],
        ]);

        return $ticket->fresh(['assignees'])->toApiArray();
    }

    /**
     * @param  list<string>  $assigneeIds
     * @return array<string, mixed>
     */
    public function assignTicket(AuthUser $actor, string $id, array $assigneeIds): array
    {
        $ticket = Ticket::query()->find($id);
        if (! $ticket) {
            throw new ApiException(404, 'Ticket not found');
        }
        if ($ticket->status === 'pending_approval') {
            throw new ApiException(400, 'Approve the request before assigning personnel');
        }
        if (in_array($ticket->status, ['rejected', 'closed'], true)) {
            throw new ApiException(400, 'Cannot assign personnel to a closed or rejected request');
        }

        $users = User::query()
            ->whereIn('id', $assigneeIds)
            ->where('role', 'admin')
            ->where('active', true)
            ->get();

        if ($users->isEmpty()) {
            throw new ApiException(400, 'No valid personnel to assign');
        }

        $ids = $users->map(fn (User $u) => (string) $u->id)->all();
        $ticket->assignees()->sync($ids);
        if (! in_array($ticket->status, ['resolved', 'closed'], true)) {
            $ticket->status = 'in_progress';
        }
        $ticket->save();

        $this->activity->logActivity($actor, [
            'action' => 'ticket_assigned',
            'entityType' => 'ticket',
            'entityId' => (string) $ticket->id,
            'summary' => 'Request '.$ticket->ticket_number.' assigned to '.$users->pluck('name')->implode(', ').' — in progress',
            'meta' => ['assigneeIds' => $ids],
        ]);

        $this->ticketConversations->syncTicketConversationParticipants((string) $ticket->id);

        return $ticket->fresh(['assignees'])->toApiArray();
    }

    /**
     * @return array<string, mixed>
     */
    public function updateTicketStatus(AuthUser $actor, string $id, string $status): array
    {
        if ($status === 'closed') {
            throw new ApiException(403, 'Only the client can close a completed request');
        }
        if (! in_array($status, self::ADMIN_STATUS_UPDATES, true)) {
            throw new ApiException(400, 'Invalid status update');
        }

        $ticket = Ticket::query()->find($id);
        if (! $ticket) {
            throw new ApiException(404, 'Ticket not found');
        }

        $prev = $ticket->status;
        $ticket->status = $status;
        if ($status === 'resolved') {
            $ticket->resolved_at = now();
        }
        $ticket->save();

        $this->activity->logActivity($actor, [
            'action' => 'ticket_status_updated',
            'entityType' => 'ticket',
            'entityId' => (string) $ticket->id,
            'summary' => "Request {$ticket->ticket_number}: {$prev} → {$status}",
        ]);

        return $ticket->fresh(['assignees'])->toApiArray();
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function listTicketsAssignedToAdmin(string $userId): array
    {
        return Ticket::query()
            ->with('assignees')
            ->whereHas('assignees', fn ($q) => $q->where('users.id', $userId))
            ->whereIn('status', ['open', 'in_progress', 'pending', 'reopened'])
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (Ticket $t) => $t->toApiArray())
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    public function completeTicketService(AuthUser $actor, string $id): array
    {
        $ticket = Ticket::query()->find($id);
        if (! $ticket) {
            throw new ApiException(404, 'Ticket not found');
        }
        if ((string) $ticket->creator_id !== $actor->id) {
            throw new ApiException(403, 'Only the client can mark this service complete');
        }
        if (! in_array($ticket->status, ['open', 'in_progress', 'pending', 'reopened'], true)) {
            throw new ApiException(400, 'This request is not awaiting service completion');
        }

        $ticket->status = 'resolved';
        $ticket->resolved_at = now();
        $ticket->save();

        $this->activity->logActivity($actor, [
            'action' => 'ticket_service_completed',
            'entityType' => 'ticket',
            'entityId' => (string) $ticket->id,
            'summary' => 'Client marked '.$ticket->ticket_number.' complete — feedback pending',
        ]);

        return $ticket->fresh(['assignees'])->toApiArray();
    }

    /**
     * @return array<string, mixed>
     */
    public function clientConfirmResolution(AuthUser $user, string $id, bool $satisfied): array
    {
        $ticket = Ticket::query()->find($id);
        if (! $ticket) {
            throw new ApiException(404, 'Ticket not found');
        }
        if ((string) $ticket->creator_id !== $user->id) {
            throw new ApiException(403, 'Not your request');
        }
        if ($ticket->status !== 'resolved') {
            throw new ApiException(400, 'Ticket is not awaiting client action');
        }

        if ($satisfied) {
            if (! $ticket->feedback_submitted) {
                throw new ApiException(400, 'Submit feedback before closing this request');
            }
            $ticket->status = 'closed';
            $ticket->client_confirmed = true;
            $ticket->closed_at = now();
        } else {
            $ticket->status = 'reopened';
            $ticket->client_confirmed = false;
        }
        $ticket->save();

        $this->activity->logActivity($user, [
            'action' => $satisfied ? 'ticket_confirmed' : 'ticket_reopened',
            'entityType' => 'ticket',
            'entityId' => (string) $ticket->id,
            'summary' => $satisfied
                ? 'Client confirmed resolution for '.$ticket->ticket_number
                : 'Client reopened '.$ticket->ticket_number,
        ]);

        $this->ticketConversations->setTicketConversationClosedState((string) $ticket->id, $satisfied);

        return $ticket->fresh(['assignees'])->toApiArray();
    }

    /**
     * @param  array{rating?: int, comment?: string}  $body
     * @return array<string, mixed>
     */
    public function submitFeedback(AuthUser $user, string $id, array $body): array
    {
        $ticket = Ticket::query()->find($id);
        if (! $ticket) {
            throw new ApiException(404, 'Ticket not found');
        }
        if ((string) $ticket->creator_id !== $user->id) {
            throw new ApiException(403, 'Not your request');
        }
        if ($ticket->status !== 'resolved') {
            throw new ApiException(400, 'Mark the service complete before submitting feedback');
        }
        if ($ticket->feedback_submitted) {
            throw new ApiException(400, 'Feedback was already submitted for this request');
        }
        if (isset($body['rating']) && ($body['rating'] < 1 || $body['rating'] > 5)) {
            throw new ApiException(400, 'Rating must be 1–5');
        }

        $ticket->feedback_rating = $body['rating'] ?? null;
        $ticket->feedback_comment = trim((string) ($body['comment'] ?? ''));
        $ticket->feedback_submitted = true;
        $ticket->save();

        $this->activity->logActivity($user, [
            'action' => 'feedback_submitted',
            'entityType' => 'ticket',
            'entityId' => (string) $ticket->id,
            'summary' => 'Feedback submitted for '.$ticket->ticket_number.' ('.($body['rating'] ?? '').'/5)',
        ]);

        return $ticket->fresh(['assignees'])->toApiArray();
    }

    /**
     * @return list<array{id: string, email: string, name: string, role: string, division: string}>
     */
    public function listAssignees(): array
    {
        return User::query()
            ->where('role', 'admin')
            ->where('active', true)
            ->orderBy('name')
            ->get()
            ->map(fn (User $u) => [
                '_id' => (string) $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'division' => $u->division ?? '',
            ])
            ->all();
    }
}
