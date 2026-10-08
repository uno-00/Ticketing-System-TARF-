/**
 * Finds the blank area of the form template around a mapped field so populated
 * text can wrap inside its own cell instead of running over printed labels,
 * ruled lines, or neighbouring fields.
 *
 * Pure pixel logic (no DOM) so it can be unit-checked outside the browser.
 */

export type TemplateDarkMap = {
  width: number;
  height: number;
  /** 1 = printed ink (text, ruled line), 0 = blank paper. Row-major. */
  dark: Uint8Array;
};

export type FreeSlot = {
  /** Right edge of the blank area, % of form width. */
  rightPct: number;
  /** Top edge of the blank area, % of form height. */
  topPct: number;
  /** Bottom edge of the blank area, % of form height. */
  bottomPct: number;
};

/** Longest side used for analysis — enough to keep 1px ruled lines visible. */
export const DARK_MAP_MAX_WIDTH = 1200;
/** Anything darker than this is ink. Light cell shading stays "blank". */
const INK_LUMINANCE = 200;
/** One line of overlay text (16px × 1.15) relative to the 960px reading width. */
const NOMINAL_LINE_RATIO = (16 * 1.15) / 960;

export function darkMapFromRgba(
  rgba: Uint8ClampedArray | Uint8Array,
  width: number,
  height: number,
): TemplateDarkMap {
  const dark = new Uint8Array(width * height);
  for (let i = 0, p = 0; i < dark.length; i += 1, p += 4) {
    const alpha = rgba[p + 3];
    if (alpha < 128) continue;
    const lum = 0.299 * rgba[p] + 0.587 * rgba[p + 1] + 0.114 * rgba[p + 2];
    if (lum < INK_LUMINANCE) dark[i] = 1;
  }
  return { width, height, dark };
}

function inkInColumn(map: TemplateDarkMap, col: number, rowFrom: number, rowTo: number): number {
  let count = 0;
  for (let row = rowFrom; row <= rowTo; row += 1) count += map.dark[row * map.width + col];
  return count;
}

function inkInRow(map: TemplateDarkMap, row: number, colFrom: number, colTo: number): number {
  let count = 0;
  const base = row * map.width;
  for (let col = colFrom; col <= colTo; col += 1) count += map.dark[base + col];
  return count;
}

/**
 * Blank rectangle that starts at the field's mapped point.
 * Returns null when the first text line is not on blank paper (the template
 * cannot tell us anything reliable there — callers fall back to marker spacing).
 */
export function measureFreeSlot(
  map: TemplateDarkMap,
  xPct: number,
  yPct: number,
  maxRightPct = 99.2,
): FreeSlot | null {
  const { width: W, height: H } = map;
  if (W < 8 || H < 8) return null;

  const line = Math.max(6, NOMINAL_LINE_RATIO * W);
  const pad = Math.max(2, Math.round(W * 0.004));
  const x0 = Math.round((xPct / 100) * W);
  const y0 = Math.round((yPct / 100) * H);
  if (x0 < 0 || x0 >= W || y0 < 0 || y0 >= H) return null;

  // Middle of the first text line — ignores an underline sitting at the baseline.
  const bandTop = Math.min(H - 1, y0 + Math.round(line * 0.2));
  const bandBottom = Math.min(H - 1, y0 + Math.round(line * 0.8));
  const maxRight = Math.min(W - 1, Math.round((maxRightPct / 100) * W));

  let col = x0;
  while (col <= maxRight && inkInColumn(map, col, bandTop, bandBottom) < 2) col += 1;
  const hitInk = col <= maxRight;
  const right = hitInk ? col - 1 - pad : maxRight;
  if (right - x0 < line * 3) return null;

  let bottom = bandBottom + 1;
  while (bottom < H && inkInRow(map, bottom, x0, right) < 3) bottom += 1;
  bottom = bottom - 1 - pad;

  let top = bandTop - 1;
  while (top >= 0 && inkInRow(map, top, x0, right) < 3) top -= 1;
  top = top + 1 + pad;

  return {
    rightPct: ((right + 1) / W) * 100,
    topPct: Math.min(yPct, (top / H) * 100),
    bottomPct: ((bottom + 1) / H) * 100,
  };
}

/** Rasterise a loaded template image into an ink map (null if the canvas is unreadable). */
export function darkMapFromImageSource(
  source: CanvasImageSource,
  naturalWidth: number,
  naturalHeight: number,
): TemplateDarkMap | null {
  if (!(naturalWidth > 0) || !(naturalHeight > 0)) return null;
  const scale = Math.min(1, DARK_MAP_MAX_WIDTH / naturalWidth);
  const width = Math.max(1, Math.round(naturalWidth * scale));
  const height = Math.max(1, Math.round(naturalHeight * scale));
  try {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(source, 0, 0, width, height);
    // Throws SecurityError when the image is cross-origin without CORS.
    const { data } = ctx.getImageData(0, 0, width, height);
    return darkMapFromRgba(data, width, height);
  } catch {
    return null;
  }
}
