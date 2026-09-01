import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormTemplateFileViewer } from "@/components/documents/FormTemplateFileViewer";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth";
import {
  buildRequesterProfileAnswerValues,
  mergeRequesterProfileIntoAnswers,
} from "@/lib/profile-placement-fields";

type ClientFormFileViewerDialogProps = {
  formId: string | null;
  formTitle?: string;
  refNumber?: string;
  /** Answers already collected on the submit page (plus any parent-merged profile values). */
  answers?: Record<string, unknown>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function nonEmptyProfileValues(values: Record<string, string> | undefined): boolean {
  if (!values) return false;
  return Object.values(values).some((value) => String(value ?? "").trim() !== "");
}

/**
 * Client-side TA form preview.
 * Loads the requesting client's PAMANA profile and paints {{prof_*}} on the template.
 */
export function ClientFormFileViewerDialog({
  formId,
  formTitle,
  refNumber,
  answers,
  open,
  onOpenChange,
}: ClientFormFileViewerDialogProps) {
  const { user, sessions } = useAuth();
  const clientUser = sessions.client ?? user;
  const clientUserId = clientUser?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["published-form", formId],
    queryFn: () => api.getPublishedForm(formId!),
    enabled: open && Boolean(formId),
  });

  const {
    data: requesterData,
    isLoading: profileLoading,
    isFetching: profileFetching,
    error: profileError,
  } = useQuery({
    queryKey: ["requester-profile", "client-preview", clientUserId],
    queryFn: () => api.requesterProfile("client"),
    enabled: open && Boolean(clientUserId),
    staleTime: 0,
    refetchOnMount: "always",
  });

  const form = data?.form;

  const previewAnswers = useMemo(() => {
    const merged: Record<string, unknown> = { ...(answers ?? {}) };

    // 1) Auth /me enrichment (available immediately after login sync).
    if (clientUser) {
      Object.assign(
        merged,
        buildRequesterProfileAnswerValues({
          name: clientUser.name,
          email: clientUser.email,
          division: clientUser.division,
          designation: clientUser.designation,
          firstName: clientUser.firstName,
          middleName: clientUser.middleName,
          lastName: clientUser.lastName,
        }),
      );
    }

    // 2) Parent submit-page answers (field inputs).
    if (answers) Object.assign(merged, answers);

    // 3) Live PAMANA requester-profile — only when found with real values.
    if (requesterData?.found && nonEmptyProfileValues(requesterData.values)) {
      Object.assign(merged, requesterData.values);
    } else if (requesterData?.found && requesterData.profile) {
      Object.assign(merged, mergeRequesterProfileIntoAnswers(requesterData.profile, {}));
    }

    return merged;
  }, [answers, clientUser, requesterData]);

  const profileReady = Boolean(
    requesterData?.found && nonEmptyProfileValues(requesterData.values),
  );
  const waiting = isLoading || profileLoading || (open && profileFetching && !requesterData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[100dvh] max-h-[100dvh] !w-screen !max-w-none flex-col gap-0 overflow-hidden rounded-none border-0 p-0 sm:!max-w-none">
        <DialogHeader className="shrink-0 border-b border-border/80 px-6 py-4 pr-12 text-left">
          <DialogTitle>
            {formTitle ? `${formTitle}${refNumber ? ` (${refNumber})` : ""}` : "Form file"}
          </DialogTitle>
          <DialogDescription>
            {profileReady
              ? `Requestor details for ${clientUser?.email ?? "your account"} are filled from PAMANA.`
              : waiting
                ? "Loading your requestor details from PAMANA…"
                : "Preview how your answers will appear on the form. View only."}
          </DialogDescription>
        </DialogHeader>

        {!waiting && !profileReady ? (
          <div className="shrink-0 border-b border-amber-200 bg-amber-50 px-6 py-3 text-sm text-amber-950">
            {profileError
              ? "Could not load your employee profile. Sign in again on the client portal."
              : `No PAMANA staff record for ${clientUser?.email ?? "this login"}. Sign in with your museum username so Division, Name, Designation, and Email auto-fill.`}
          </div>
        ) : null}

        {profileReady ? (
          <div className="shrink-0 border-b border-border/60 bg-muted/30 px-6 py-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Auto-filled:</span>{" "}
            {String(previewAnswers["{{prof_first}}"] || "—")}{" "}
            {String(previewAnswers["{{prof_middle}}"] || "")}{" "}
            {String(previewAnswers["{{prof_last}}"] || "—")}
            {" · "}
            {String(previewAnswers["{{prof_designation}}"] || "—")}
            {" · "}
            {String(previewAnswers["{{prof_division}}"] || "—")}
          </div>
        ) : null}

        <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden bg-background">
          {waiting ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Loading form file and requestor details…
            </p>
          ) : isError || !form ? (
            <p className="py-16 text-center text-sm text-destructive">Could not load form file.</p>
          ) : (
            <FormTemplateFileViewer
              form={form}
              enabled={open}
              fillHeight
              className="h-full w-full min-w-0"
              answers={previewAnswers}
              emptyMessage="This form has no uploaded file."
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
