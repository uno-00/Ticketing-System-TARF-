import type { CSSProperties, ReactNode } from "react";
import { PlacementSignature } from "@/components/documents/PlacementSignature";
import {
  PlacementTextSlot,
  placementSlotWidthPct,
} from "@/components/documents/PlacementTextSlot";
import type { FormRecord, LiveFormField } from "@/lib/api/types";
import type { PrintFieldPlacement } from "@/lib/form-builder-store";
import { DEFAULT_PRINT_PLACEMENT_FONT_SIZE } from "@/lib/form-builder-store";
import { PRINT_OVERLAY_FONT_SIZE_PX } from "@/lib/print-overlay-font";
import {
  isSignatureImageValue,
  resolveSignatureImageSrc,
} from "@/lib/form-field-values";
import {
  extractOthersDetail,
  isOthersBlankPlacementLabel,
  isOthersOptionLabel,
  PLACEMENT_CHECKMARK,
} from "@/lib/placement-choice-values";
import {
  displayValueForPlacement,
  resolveAnswerForVariable,
  resolveFormPlacements,
} from "@/lib/placement-values";

export { placementSlotWidthPct };

type BuildPlacementOverlayOptions = {
  /**
   * Always paint every mapped marker. Empty text/profile/signature slots show the
   * same label Admin saw while dragging. Empty checkbox/radio boxes show ✓ only
   * when `emptyChoiceAsCheckmark` is true (Form Builder / Records / Client preview).
   */
  showLabelWhenEmpty?: boolean;
  /** Match Form Builder: unselected option boxes still show a ✓ so the mapping is visible. */
  emptyChoiceAsCheckmark?: boolean;
};

/** Gap after the Others checkbox so typed text sits at the start of the blank. */
const OTHERS_BLANK_AUTO_OFFSET = "2.75em";

function findFieldForPlacement(fields: LiveFormField[], placementVariable: string) {
  const inner = placementVariable.replace(/^\{\{|\}\}$/g, "");
  return (
    fields.find(
      (field) =>
        field.variable === placementVariable ||
        field.variable === inner ||
        field.variable.replace(/^\{\{|\}\}$/g, "") === inner,
    ) ?? null
  );
}

function sameVariable(a: string, b: string): boolean {
  const innerA = a.replace(/^\{\{|\}\}$/g, "");
  const innerB = b.replace(/^\{\{|\}\}$/g, "");
  return a === b || innerA === innerB;
}

/**
 * Markers only — parent must be the same shell as Form Builder:
 * relative canvas with --dynamic-text-* / --placement-natural-width,
 * then `absolute inset-0 placement-scale-root`.
 * left/top % only — transparent text, no white box, no vertical nudge.
 */
function renderPlacementMarkers(
  fields: LiveFormField[],
  placements: PrintFieldPlacement[],
  answers: Record<string, unknown>,
  options?: BuildPlacementOverlayOptions,
) {
  const markers: ReactNode[] = [];
  const showLabelWhenEmpty = options?.showLabelWhenEmpty ?? true;
  const emptyChoiceAsCheckmark = options?.emptyChoiceAsCheckmark ?? showLabelWhenEmpty;

  for (const placement of placements) {
    const field = findFieldForPlacement(fields, placement.variable);
    const raw = resolveAnswerForVariable(answers, placement.variable);

    if (isSignatureImageValue(raw)) {
      const src = resolveSignatureImageSrc(raw);
      if (src) {
        markers.push(
          <PlacementSignature
            key={placement.id}
            placement={placement}
            placements={placements}
            src={src}
          />,
        );
        continue;
      }
    }

    const text = displayValueForPlacement(
      fields,
      placement.variable,
      placement.label,
      answers,
      showLabelWhenEmpty,
      emptyChoiceAsCheckmark,
    );
    if (!text) continue;

    const isCheckmark = text === PLACEMENT_CHECKMARK;
    const isOthersBlank = isOthersBlankPlacementLabel(placement.label);

    if (isCheckmark) {
      markers.push(
        <span
          key={placement.id}
          className="dynamic-text-anchor pointer-events-none bg-transparent"
          style={{ left: `${placement.xPct}%`, top: `${placement.yPct}%`, overflow: "visible" }}
          title={placement.label}
        >
          <span className="dynamic-text placement-checkmark bg-transparent">{text}</span>
        </span>,
      );
    } else {
      // Every populated value goes through the same wrapping slot.
      markers.push(
        <PlacementTextSlot
          key={placement.id}
          placement={placement}
          placements={placements}
          text={text}
          title={placement.label}
          className={isOthersBlank ? "placement-others-blank" : undefined}
        />,
      );
    }

    // Existing forms often only mapped the Others checkbox. Put typed text on the
    // blank line to the right when no explicit "Other (blank)" marker exists.
    if (
      field &&
      isOthersOptionLabel(placement.label) &&
      isCheckmark &&
      !emptyChoiceAsCheckmark
    ) {
      const detail = extractOthersDetail(raw);
      const hasBlankMarker = placements.some(
        (p) =>
          sameVariable(p.variable, placement.variable) && isOthersBlankPlacementLabel(p.label),
      );
      if (detail && !hasBlankMarker) {
        markers.push(
          <PlacementTextSlot
            key={`${placement.id}-others-blank`}
            placement={placement}
            placements={placements}
            text={detail}
            title={`${placement.label} (blank)`}
            className="placement-others-blank"
            inset={OTHERS_BLANK_AUTO_OFFSET}
          />,
        );
      }
    }
  }

  return markers;
}

/** CSS vars every form viewer must set — same 16px overlay everywhere. */
export function placementCanvasStyle(
  zoom = 1,
  naturalWidth?: number | null,
): CSSProperties {
  const fontSize = PRINT_OVERLAY_FONT_SIZE_PX * zoom;
  const fieldTextWidth = Math.round(fontSize * 15);
  return {
    "--dynamic-text-size": fontSize,
    "--dynamic-text-width": fieldTextWidth,
    "--placement-natural-width": naturalWidth && naturalWidth > 0 ? naturalWidth : 1600,
  } as CSSProperties;
}

/** Answers (when present) at exact admin-mapped %. Empty slots keep the mapped label. */
export function buildPlacementOverlay(
  fields: LiveFormField[],
  placements: PrintFieldPlacement[],
  answers: Record<string, unknown>,
  _fontSize = DEFAULT_PRINT_PLACEMENT_FONT_SIZE,
  overlayOptions?: BuildPlacementOverlayOptions,
): ReactNode {
  const markers = renderPlacementMarkers(fields, placements, answers, {
    showLabelWhenEmpty: overlayOptions?.showLabelWhenEmpty ?? true,
    emptyChoiceAsCheckmark: overlayOptions?.emptyChoiceAsCheckmark ?? false,
  });
  if (!markers.length) return null;
  return <>{markers}</>;
}

/** Field labels at saved placements — Records/Admin layout review. */
export function buildPlacementLayoutOverlay(form: FormRecord, fields?: LiveFormField[]): ReactNode {
  const placements = resolveFormPlacements(form);
  if (!placements.length) return null;
  const markers = renderPlacementMarkers(fields ?? form.fields, placements, {}, {
    showLabelWhenEmpty: true,
    emptyChoiceAsCheckmark: true,
  });
  if (!markers.length) return null;
  return <>{markers}</>;
}

export function canShowFilledTemplate(form: FormRecord | null | undefined): form is FormRecord {
  return Boolean(form?.printTemplateImagePath?.trim() && resolveFormPlacements(form).length > 0);
}

export function resolveOverlayFontSize(_form?: FormRecord): number {
  return PRINT_OVERLAY_FONT_SIZE_PX;
}
