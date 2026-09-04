import type { CSSProperties, ReactNode } from "react";
import type { FormRecord, LiveFormField } from "@/lib/api/types";
import type { PrintFieldPlacement } from "@/lib/form-builder-store";
import { DEFAULT_PRINT_PLACEMENT_FONT_SIZE } from "@/lib/form-builder-store";
import {
  isSignatureImageValue,
  resolveSignatureImageSrc,
} from "@/lib/form-field-values";
import { PLACEMENT_CHECKMARK } from "@/lib/placement-choice-values";
import {
  displayValueForPlacement,
  resolveAnswerForVariable,
  resolveFormPlacementFontSize,
  resolveFormPlacements,
} from "@/lib/placement-values";
import { cn } from "@/lib/utils";

type BuildPlacementOverlayOptions = {
  /** Show field label at placement when there is no submitted answer (Records layout review). */
  showLabelWhenEmpty?: boolean;
};

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
  return placements
    .map((placement) => {
      const field = findFieldForPlacement(fields, placement.variable);
      const raw = resolveAnswerForVariable(answers, placement.variable);

      if (field?.type === "signature" && isSignatureImageValue(raw)) {
        const src = resolveSignatureImageSrc(raw);
        if (!src) return null;
        return (
          <span
            key={placement.id}
            className="dynamic-text-anchor pointer-events-none"
            style={{ left: `${placement.xPct}%`, top: `${placement.yPct}%` }}
            title={placement.label}
          >
            <img
              src={src}
              alt="Signature"
              className="placement-signature-img block h-auto object-contain"
            />
          </span>
        );
      }

      const text = displayValueForPlacement(
        fields,
        placement.variable,
        placement.label,
        answers,
        options?.showLabelWhenEmpty,
      );
      if (!text) return null;

      const isCheckmark = text === PLACEMENT_CHECKMARK;

      return (
        <span
          key={placement.id}
          className="dynamic-text-anchor pointer-events-none bg-transparent"
          style={{ left: `${placement.xPct}%`, top: `${placement.yPct}%` }}
          title={placement.label}
        >
          <span
            className={cn(
              "dynamic-text bg-transparent",
              isCheckmark && "placement-checkmark",
            )}
          >
            {text}
          </span>
        </span>
      );
    })
    .filter(Boolean);
}

/** CSS vars Form Builder sets on the print canvas — viewers must set the same. */
export function placementCanvasStyle(
  fontSize: number,
  naturalWidth?: number | null,
): CSSProperties {
  const fieldTextWidth = Math.round(fontSize * 15);
  return {
    "--dynamic-text-size": `${fontSize}px`,
    "--dynamic-text-width": `${fieldTextWidth}px`,
    ...(naturalWidth && naturalWidth > 0
      ? { "--placement-natural-width": naturalWidth }
      : {}),
  } as CSSProperties;
}

/** Submitted answers at exact admin-mapped %. */
export function buildPlacementOverlay(
  fields: LiveFormField[],
  placements: PrintFieldPlacement[],
  answers: Record<string, unknown>,
  _fontSize = DEFAULT_PRINT_PLACEMENT_FONT_SIZE,
): ReactNode {
  const markers = renderPlacementMarkers(fields, placements, answers);
  if (!markers.length) return null;
  return <>{markers}</>;
}

/** Field labels at saved placements — Records/Admin layout review. */
export function buildPlacementLayoutOverlay(form: FormRecord): ReactNode {
  const placements = resolveFormPlacements(form);
  if (!placements.length) return null;
  const markers = renderPlacementMarkers(form.fields, placements, {}, {
    showLabelWhenEmpty: true,
  });
  if (!markers.length) return null;
  return <>{markers}</>;
}

export function canShowFilledTemplate(form: FormRecord | null | undefined): form is FormRecord {
  return Boolean(form?.printTemplateImagePath?.trim() && resolveFormPlacements(form).length > 0);
}

export function resolveOverlayFontSize(form: FormRecord): number {
  return resolveFormPlacementFontSize(form) || DEFAULT_PRINT_PLACEMENT_FONT_SIZE;
}
