import { useMemo } from "react";
import type { TicketRecord } from "@/lib/api/types";
import { buildPlacementOverlay } from "@/components/documents/buildPlacementOverlay";
import { ViewOnlyDocumentViewer } from "@/components/documents/ViewOnlyDocumentViewer";
import { api } from "@/lib/api/client";
import { isImagePath, isPdfPath } from "@/lib/media-url";
import {
  hasFilledAnswers,
  resolveFormPlacementFontSize,
  resolveFormPlacements,
} from "@/lib/placement-values";
import type { PortalSlot } from "@/lib/sessions";

type TicketSubmittedFileViewerProps = {
  ticket: TicketRecord;
  enabled?: boolean;
  className?: string;
  viewportClassName?: string;
  fileLabel?: string;
  fillHeight?: boolean;
  slot?: PortalSlot;
};

function populatedForm(ticket: TicketRecord) {
  return typeof ticket.formId === "object" && ticket.formId !== null ? ticket.formId : null;
}

function resolveFallbackFile(ticket: TicketRecord): string | null {
  const attachment = ticket.attachmentUrl?.trim();
  if (attachment) return attachment;

  const form = populatedForm(ticket);
  return form?.printTemplateImagePath?.trim() || null;
}

/**
 * Shows the client's submitted form with answers.
 * Prefers server-filled PDF; falls back to template + overlay for image templates.
 */
export function TicketSubmittedFileViewer({
  ticket,
  enabled = true,
  className,
  viewportClassName,
  fileLabel,
  fillHeight,
  slot,
}: TicketSubmittedFileViewerProps) {
  const form = populatedForm(ticket);
  const templateSrc = form?.printTemplateImagePath?.trim() ?? null;
  const placements = useMemo(() => (form ? resolveFormPlacements(form) : []), [form]);
  const hasPlacements = placements.length > 0;
  const isPdfTemplate = Boolean(templateSrc && isPdfPath(templateSrc));
  const isImageTemplate = Boolean(templateSrc && isImagePath(templateSrc));
  const filled = hasFilledAnswers(ticket.answers);
  const workProcedurePath = form?.workProcedurePath?.trim() ?? "";
  const hasWorkProcedure = Boolean(workProcedurePath && isPdfPath(workProcedurePath));

  /** Primary: server PDF with answers burned in. */
  const useTicketDocument = Boolean(filled && ticket._id && (isPdfTemplate || hasWorkProcedure || !form));

  /** Fallback overlay on image templates when not using server PDF. */
  const useClientOverlay =
    !useTicketDocument && Boolean(form && hasPlacements && filled && isImageTemplate);

  const blobLoader = useMemo(() => {
    if (!useTicketDocument || !enabled) return undefined;
    return () => api.getTicketDocument(ticket._id, slot);
  }, [ticket._id, useTicketDocument, enabled, slot]);

  const overlay = useMemo(() => {
    if (!useClientOverlay || !form) return undefined;
    return buildPlacementOverlay(
      form.fields,
      placements,
      ticket.answers ?? {},
      resolveFormPlacementFontSize(form),
    );
  }, [useClientOverlay, form, placements, ticket.answers]);

  const src = blobLoader ? null : (templateSrc ?? resolveFallbackFile(ticket));

  const alt =
    fileLabel?.trim() ||
    ticket.attachmentName?.trim() ||
    ticket.formTitle ||
    ticket.ticketNumber ||
    "Submitted request";

  const displayLabel =
    hasWorkProcedure && form?.workProcedureName?.trim()
      ? `${alt} + ${form.workProcedureName.trim()}`
      : hasWorkProcedure
        ? `${alt} + work procedure`
        : alt;

  return (
    <ViewOnlyDocumentViewer
      src={src}
      blobLoader={blobLoader}
      enabled={enabled}
      alt={alt}
      fileLabel={displayLabel}
      overlay={overlay}
      className={className}
      viewportClassName={viewportClassName}
      fillHeight={fillHeight}
      emptyMessage="No uploaded file is attached to this request."
    />
  );
}
