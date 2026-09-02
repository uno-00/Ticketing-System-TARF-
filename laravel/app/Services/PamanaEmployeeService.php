<?php

namespace App\Services;

use App\Models\OrgUser;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Requester profile from pamana_employees_new for TA form auto-fill.
 *
 *  {{prof_division}}    = staffinformations.section_id
 *  {{prof_first}}       = staffinformations.first_name (fallback staffs.first_name)
 *  {{prof_middle}}      = staffinformations.middle_name (fallback staffs.middle_name)
 *  {{prof_last}}        = staffinformations.last_name (fallback staffs.last_name)
 *  {{prof_email}}       = staffs.secondary_email ?? staffs.email
 *  {{prof_designation}} = staffinformations.position
 */
class PamanaEmployeeService
{
    /**
     * @return array{
     *   firstName: string,
     *   middleName: string,
     *   lastName: string,
     *   email: string,
     *   division: string,
     *   sectionId: string,
     *   designation: string,
     *   name: string
     * }|null
     */
    public function findForTicketingUser(User $user): ?array
    {
        $email = strtolower(trim((string) $user->email));
        $org = OrgUser::query()
            ->whereRaw('LOWER(email) = ?', [$email])
            ->first();

        // Fallback: museum logins sometimes store a different email than users_.email
        // but share the username local-part (e.g. resty.morancil).
        if (! $org && str_contains($email, '@')) {
            $local = strstr($email, '@', true) ?: '';
            if ($local !== '') {
                $org = OrgUser::query()
                    ->whereRaw('LOWER(username) = ?', [strtolower($local)])
                    ->first();
            }
        }

        if ($org) {
            $hit = $this->findForOrgUser($org);
            if ($hit) {
                if ($hit['email'] === '') {
                    $hit['email'] = (string) ($org->email ?: $user->email);
                }

                return $hit;
            }
        }

        $byEmail = $this->lookupByEmailOnly($email);
        if ($byEmail && $byEmail['email'] === '') {
            $byEmail['email'] = (string) $user->email;
        }

        return $byEmail;
    }

    /**
     * @return array{
     *   firstName: string,
     *   middleName: string,
     *   lastName: string,
     *   email: string,
     *   division: string,
     *   sectionId: string,
     *   designation: string,
     *   name: string
     * }|null
     */
    public function findForOrgUser(OrgUser $org): ?array
    {
        // Primary link: nmp_ticketing.users.id === pamana staffs.user_id
        // (most employees are not in the small pamana `user` login table).
        $hit = $this->loadByStaffUserId((string) $org->id);
        if ($hit) {
            return $this->withLoginEmailFallback($hit, (string) $org->email);
        }

        $pamanaUserId = $this->resolvePamanaUserId($org);
        if ($pamanaUserId !== null && $pamanaUserId !== (string) $org->id) {
            $hit = $this->loadByStaffUserId($pamanaUserId);
            if ($hit) {
                return $this->withLoginEmailFallback($hit, (string) $org->email);
            }
        }

        $byEmail = $this->lookupByEmailOnly((string) $org->email);

        return $byEmail ? $this->withLoginEmailFallback($byEmail, (string) $org->email) : null;
    }

    /**
     * @param  array{
     *   firstName: string,
     *   middleName: string,
     *   lastName: string,
     *   email: string,
     *   division: string,
     *   sectionId: string,
     *   designation: string,
     *   name: string
     * }  $employee
     * @return array{
     *   firstName: string,
     *   middleName: string,
     *   lastName: string,
     *   email: string,
     *   division: string,
     *   sectionId: string,
     *   designation: string,
     *   name: string
     * }
     */
    private function withLoginEmailFallback(array $employee, string $loginEmail): array
    {
        if ($employee['email'] === '' && trim($loginEmail) !== '') {
            $employee['email'] = trim($loginEmail);
        }

        return $employee;
    }

    /**
     * @return array{
     *   firstName: string,
     *   middleName: string,
     *   lastName: string,
     *   email: string,
     *   division: string,
     *   sectionId: string,
     *   designation: string,
     *   name: string
     * }|null
     */
    public function findByUsernameOrEmail(string $username, string $email): ?array
    {
        $username = trim($username);
        $email = strtolower(trim($email));

        if ($username !== '') {
            try {
                $pu = DB::connection('pamana')->selectOne(
                    'SELECT id FROM `user` WHERE LOWER(username) = ? LIMIT 1',
                    [strtolower($username)],
                );
                if ($pu) {
                    $hit = $this->loadByStaffUserId((string) $pu->id);
                    if ($hit) {
                        return $hit;
                    }
                }
            } catch (Throwable $e) {
                Log::warning('Pamana username lookup failed', ['error' => $e->getMessage()]);
            }
        }

        return $this->lookupByEmailOnly($email);
    }

    /**
     * Resolve PAMANA staffs.user_id for an org login account.
     * Prefer username identity — never bind seed/demo org ids to unrelated staff rows.
     */
    private function resolvePamanaUserId(OrgUser $org): ?string
    {
        $orgId = (string) $org->id;
        $username = strtolower(trim((string) ($org->username ?? '')));
        $email = strtolower(trim((string) $org->email));

        try {
            if ($username !== '') {
                $byUsername = DB::connection('pamana')->selectOne(
                    'SELECT id FROM `user` WHERE LOWER(username) = ? LIMIT 1',
                    [$username],
                );
                if ($byUsername) {
                    return (string) $byUsername->id;
                }
            }

            if ($email !== '') {
                $byEmail = DB::connection('pamana')->selectOne(
                    'SELECT id FROM `user` WHERE LOWER(email) = ? LIMIT 1',
                    [$email],
                );
                if ($byEmail) {
                    return (string) $byEmail->id;
                }
            }

            // Same numeric id only when PAMANA username matches org username (true shared identity).
            if ($username !== '') {
                $byId = DB::connection('pamana')->selectOne(
                    'SELECT id FROM `user` WHERE id = ? AND LOWER(username) = ? LIMIT 1',
                    [$orgId, $username],
                );
                if ($byId) {
                    return (string) $byId->id;
                }
            }
        } catch (Throwable $e) {
            Log::warning('Pamana resolve user id failed', ['error' => $e->getMessage()]);
        }

        return null;
    }

    /**
     * @return array{
     *   firstName: string,
     *   middleName: string,
     *   lastName: string,
     *   email: string,
     *   division: string,
     *   sectionId: string,
     *   designation: string,
     *   name: string
     * }|null
     */
    private function loadByStaffUserId(string $staffUserId): ?array
    {
        try {
            $row = DB::connection('pamana')->selectOne(
                "SELECT
                    COALESCE(NULLIF(TRIM(si.first_name), ''), NULLIF(TRIM(st.first_name), '')) AS first_name,
                    COALESCE(NULLIF(TRIM(si.middle_name), ''), NULLIF(TRIM(st.middle_name), '')) AS middle_name,
                    COALESCE(NULLIF(TRIM(si.last_name), ''), NULLIF(TRIM(st.last_name), '')) AS last_name,
                    NULLIF(TRIM(si.section_id), '') AS section_id,
                    NULLIF(TRIM(si.section), '') AS section_name,
                    COALESCE(NULLIF(TRIM(si.position), ''), '') AS position,
                    st.email AS staff_email,
                    st.secondary_email
                 FROM staffs st
                 LEFT JOIN staffinformations si
                    ON si.user_id COLLATE utf8mb4_unicode_ci
                     = st.user_id COLLATE utf8mb4_unicode_ci
                 WHERE st.user_id COLLATE utf8mb4_unicode_ci = ? COLLATE utf8mb4_unicode_ci
                   AND (st.deleted = 0 OR st.deleted IS NULL)
                 ORDER BY (si.user_id IS NULL) ASC, st.updated_at DESC
                 LIMIT 1",
                [$staffUserId],
            );

            if (! $row) {
                $row = DB::connection('pamana')->selectOne(
                    "SELECT
                        NULLIF(TRIM(si.first_name), '') AS first_name,
                        NULLIF(TRIM(si.middle_name), '') AS middle_name,
                        NULLIF(TRIM(si.last_name), '') AS last_name,
                        NULLIF(TRIM(si.section_id), '') AS section_id,
                        NULLIF(TRIM(si.section), '') AS section_name,
                        COALESCE(NULLIF(TRIM(si.position), ''), '') AS position,
                        NULL AS staff_email,
                        NULL AS secondary_email
                     FROM staffinformations si
                     WHERE si.user_id COLLATE utf8mb4_unicode_ci = ? COLLATE utf8mb4_unicode_ci
                     LIMIT 1",
                    [$staffUserId],
                );
            }
        } catch (Throwable $e) {
            Log::warning('Pamana loadByStaffUserId failed', [
                'staffUserId' => $staffUserId,
                'error' => $e->getMessage(),
            ]);

            return null;
        }

        return $this->mapRow($row);
    }

    /**
     * @return array{
     *   firstName: string,
     *   middleName: string,
     *   lastName: string,
     *   email: string,
     *   division: string,
     *   sectionId: string,
     *   designation: string,
     *   name: string
     * }|null
     */
    private function lookupByEmailOnly(string $email): ?array
    {
        $email = strtolower(trim($email));
        if ($email === '') {
            return null;
        }

        // Ignore shared placeholder emails that many staff rows share.
        if (str_contains($email, 'dextercellonabanawon')) {
            return null;
        }

        try {
            $row = DB::connection('pamana')->selectOne(
                "SELECT
                    COALESCE(NULLIF(TRIM(si.first_name), ''), NULLIF(TRIM(st.first_name), '')) AS first_name,
                    COALESCE(NULLIF(TRIM(si.middle_name), ''), NULLIF(TRIM(st.middle_name), '')) AS middle_name,
                    COALESCE(NULLIF(TRIM(si.last_name), ''), NULLIF(TRIM(st.last_name), '')) AS last_name,
                    NULLIF(TRIM(si.section_id), '') AS section_id,
                    NULLIF(TRIM(si.section), '') AS section_name,
                    COALESCE(NULLIF(TRIM(si.position), ''), '') AS position,
                    st.email AS staff_email,
                    st.secondary_email
                 FROM staffs st
                 LEFT JOIN staffinformations si
                    ON si.user_id COLLATE utf8mb4_unicode_ci
                     = st.user_id COLLATE utf8mb4_unicode_ci
                 WHERE (st.deleted = 0 OR st.deleted IS NULL)
                   AND (
                        LOWER(COALESCE(st.email, '')) = ?
                        OR LOWER(COALESCE(st.secondary_email, '')) = ?
                   )
                 ORDER BY (si.user_id IS NULL) ASC, st.updated_at DESC
                 LIMIT 1",
                [$email, $email],
            );
        } catch (Throwable $e) {
            Log::warning('Pamana email lookup failed', ['error' => $e->getMessage()]);

            return null;
        }

        return $this->mapRow($row);
    }

    /**
     * @param  object|null  $row
     * @return array{
     *   firstName: string,
     *   middleName: string,
     *   lastName: string,
     *   email: string,
     *   division: string,
     *   sectionId: string,
     *   designation: string,
     *   name: string
     * }|null
     */
    private function mapRow(?object $row): ?array
    {
        if (! $row) {
            return null;
        }

        $first = trim((string) ($row->first_name ?? ''));
        $middle = trim((string) ($row->middle_name ?? ''));
        $last = trim((string) ($row->last_name ?? ''));
        $sectionId = trim((string) ($row->section_id ?? ''));
        $sectionName = trim((string) ($row->section_name ?? ''));
        $secondary = trim((string) ($row->secondary_email ?? ''));
        $primary = trim((string) ($row->staff_email ?? ''));
        $profileEmail = $secondary !== '' ? $secondary : $primary;
        // Shared placeholder inbox used by many PAMANA rows — never treat as the employee's email.
        if ($profileEmail !== '' && str_contains(strtolower($profileEmail), 'dextercellonabanawon')) {
            $profileEmail = '';
        }

        if ($first === '' && $last === '' && $sectionId === '' && $sectionName === '') {
            return null;
        }

        // Division/Section on TA form: section name from staffinformations (via section_id).
        $division = $sectionName !== '' ? $sectionName : $sectionId;

        // Middle Initial box on Support Ticketing System forms: first letter of middle_name.
        $middleInitial = $middle !== '' ? mb_strtoupper(mb_substr($middle, 0, 1)) : '';

        $nameParts = array_values(array_filter([$first, $middle, $last], fn ($p) => $p !== ''));

        return [
            'firstName' => $first,
            'middleName' => $middleInitial,
            'lastName' => $last,
            'email' => $profileEmail,
            'division' => $division,
            'sectionId' => $sectionId,
            'designation' => trim((string) ($row->position ?? '')),
            'name' => implode(' ', $nameParts),
        ];
    }

    /**
     * @return array{
     *   id: string,
     *   email: string,
     *   name: string,
     *   role: string,
     *   division: string,
     *   designation: string,
     *   firstName: string,
     *   middleName: string,
     *   lastName: string
     * }
     */
    public function enrichPublicUser(User $user): array
    {
        $base = $user->toPublicUser();
        $employee = $this->findForTicketingUser($user);

        if (! $employee) {
            return [
                ...$base,
                'firstName' => '',
                'middleName' => '',
                'lastName' => '',
            ];
        }

        return [
            'id' => $base['id'],
            'email' => $base['email'],
            'name' => $employee['name'] !== '' ? $employee['name'] : $base['name'],
            'role' => $base['role'],
            'division' => $employee['division'] !== '' ? $employee['division'] : $base['division'],
            'designation' => $employee['designation'] !== '' ? $employee['designation'] : ($base['designation'] ?? ''),
            'firstName' => $employee['firstName'],
            'middleName' => $employee['middleName'],
            'lastName' => $employee['lastName'],
        ];
    }

    /**
     * @param  User|array<string, mixed>  $user
     * @return array{name: string, email: string, division: string, designation: string, firstName: string, middleName: string, lastName: string}
     */
    public function requesterProfileFor(User|array $user): array
    {
        $public = is_array($user) ? $user : $this->enrichPublicUser($user);

        return [
            'name' => (string) ($public['name'] ?? ''),
            'email' => (string) ($public['email'] ?? ''),
            'division' => (string) ($public['division'] ?? ''),
            'designation' => (string) ($public['designation'] ?? ''),
            'firstName' => (string) ($public['firstName'] ?? ''),
            'middleName' => (string) ($public['middleName'] ?? ''),
            'lastName' => (string) ($public['lastName'] ?? ''),
        ];
    }

    public function syncTicketingUser(User $user): User
    {
        $employee = $this->findForTicketingUser($user);
        if (! $employee) {
            return $user;
        }

        if ($employee['name'] !== '') {
            $user->name = $employee['name'];
        }
        if ($employee['division'] !== '') {
            $user->division = $employee['division'];
        }
        if ($employee['designation'] !== '') {
            $user->designation = $employee['designation'];
        }
        $user->save();

        return $user;
    }
}
