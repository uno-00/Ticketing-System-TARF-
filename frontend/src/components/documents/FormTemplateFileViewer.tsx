import { useMemo } from "react";
import type { FormRecord, LiveFormField } from "@/lib/api/types";
import {
  buildPlacementLayoutOverlay,
  buildPlacementOverlay,
} from "@/components/documents/buildPlacementOverlay";
import { EmptyState } from "@/components/layout/workspace-ui";
import { ViewOnlyDocumentViewer } from "@/components/documents/ViewOnlyDocumentViewer";
import { DEFAULT_PROFILE_PLACEMENT_FIELDS } from "@/lib/profile-placement-fields";
import {
  hasFilledAnswers,
  resolveFormPlacementFontSize,
  resolveFormPlacements,
} from "@/lib/placement-values";

type FormTemplateFileViewerProps = {
  form: FormRecord;
  enabled?: boolean;
  className?: string;
  viewportClassName?: string;
  fillHeight?: boolean;
  fileLabel?: string;
  emptyMessage?: string;
  /** Live or submitted answers — when provided, shown on template instead of layout labels. */
  answers?: Record<string, unknown>;
};

function withProfileFields(fields: LiveFormField[]): LiveFormField[] {
  const existing = new Set(
    fields.map((field) => field.variable.replace(/^\{\{|\}\}$/g, "")),
  );
  const extras: LiveFormField[] = [];
  for (const profile of DEFAULT_PROFILE_PLACEMENT_FIELDS) {
    const inner = profile.variable.replace(/^\{\{|\}\}$/g, "");
    if (existing.has(inner)) continue;
    extras.push({
      id: `profile_${inner}`,
      type: "textbox",
      variable: profile.variable,
      label: profile.label,
    });
  }
  return extras.length ? [...fields, ...extras] : fields;
}

/**
 * Uploaded template + field placements.
 * Same CSS overlay path for Admin, Records, and Client so fonts/positions match Form Builder.
 */
export function FormTemplateFileViewer({
  form,
  enabled = true,
  className,
  viewportClassName,
  fillHeight,
  fileLabel = "Form template",
  emptyMessage = "No form file was uploaded.",
  answers,
}: FormTemplateFileViewerProps) {
  const templateSrc = form.printTemplateImagePath?.trim() ?? null;
  const placements = useMemo(() => resolveFormPlacements(form), [form]);
  const fields = useMemo(() => withProfileFields(form.fields ?? []), [form.fields]);
  const hasPlacements = placements.length > 0;
  const filled = hasFilledAnswers(answers);
  const hasProfileAnswers = Boolean(
    answers &&
      Object.entries(answers).some(
        ([key, value]) =>
          key.includes("prof_") && typeof value === "string" && value.trim() !== "",
      ),
  );
  // Client/ticket preview always passes `answers` — paint real values (or blanks),
  // never the layout field labels ("First Name", "Division/Section", …).
  const previewMode = answers !== undefined;
  const showFilledOverlay = previewMode || filled || hasProfileAnswers;

  const profilePaintKey = useMemo(() => {
    if (!answers) return "none";
    return DEFAULT_PROFILE_PLACEMENT_FIELDS.map((field) =>
      String(answers[field.variable] ?? ""),
    ).join("|");
  }, [answers]);

  const overlay = useMemo(() => {
    if (!hasPlacements) return undefined;
    if (showFilledOverlay) {
      // Always return a layer in preview mode so the PDF path stays on MappedFormPage.
      return (
        buildPlacementOverlay(
          fields,
          placements,
          answers ?? {},
          resolveFormPlacementFontSize(form),
        ) ?? (
          <div className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
        )
      );
    }
    return buildPlacementLayoutOverlay(form);
  }, [form, fields, hasPlacements, showFilledOverlay, answers, placements]);

  if (!templateSrc) {
    return <EmptyState title="No template uploaded" description={emptyMessage} />;
  }

  return (
    <ViewOnlyDocumentViewer
      key={`form-viewer-${form._id}-${profilePaintKey}`}
      src={templateSrc}
      enabled={enabled}
      alt={fileLabel}
      fileLabel={fileLabel}
      overlay={overlay}
      className={className}
      viewportClassName={viewportClassName}
      fillHeight={fillHeight}
      emptyMessage={emptyMessage}
    />
  );
}
