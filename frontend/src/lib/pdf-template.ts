import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export function isPdfFile(file: File): boolean {
  return file.type === "application/pdf" || /\.pdf$/i.test(file.name);
}

/** Total rendered height (px) when the PDF is scaled to `displayWidth`. */
export async function getPdfDisplayHeight(blob: Blob, displayWidth: number): Promise<number> {
  const data = new Uint8Array(await blob.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  let totalHeight = 0;

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
    const page = await doc.getPage(pageNum);
    const base = page.getViewport({ scale: 1 });
    const scale = displayWidth / base.width;
    totalHeight += base.height * scale;
  }

  return Math.ceil(totalHeight);
}

/** Renders the first page of a PDF to a PNG data URL for the print canvas. */
export async function pdfFirstPageToDataUrl(
  file: File,
  options?: { maxWidth?: number },
): Promise<{ dataUrl: string; pageCount: number }> {
  const maxWidth = options?.maxWidth ?? 1600;
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const page = await doc.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(2, maxWidth / baseViewport.width);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas for PDF rendering.");

  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  return { dataUrl: canvas.toDataURL("image/png"), pageCount: doc.numPages };
}

/** Renders the first page of a PDF blob to a PNG data URL for overlay previews. */
export async function pdfBlobFirstPageToDataUrl(
  blob: Blob,
  options?: { maxWidth?: number },
): Promise<{ dataUrl: string; pageCount: number }> {
  const file = new File([blob], "document.pdf", { type: blob.type || "application/pdf" });
  return pdfFirstPageToDataUrl(file, options);
}

/** Renders every page of a PDF blob to PNG data URLs (filled ticket docs). */
export async function pdfBlobAllPagesToDataUrls(
  blob: Blob,
  options?: { maxWidth?: number },
): Promise<{ dataUrls: string[]; pageCount: number }> {
  // Higher default width keeps glyph spacing even when zoomed in the viewer.
  const maxWidth = options?.maxWidth ?? 2000;
  const data = new Uint8Array(await blob.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const dataUrls: string[] = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
    const page = await doc.getPage(pageNum);
    const baseViewport = page.getViewport({ scale: 1 });
    // Prefer integer-ish scale for more even character spacing in canvas text.
    const rawScale = Math.min(2.5, maxWidth / baseViewport.width);
    const scale = Math.round(rawScale * 100) / 100;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create canvas for PDF rendering.");

    // Crisp glyphs — avoid fractional smoothing artifacts that look like uneven letters.
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    await page.render({ canvas, canvasContext: ctx, viewport }).promise;
    dataUrls.push(canvas.toDataURL("image/png"));
  }

  return { dataUrls, pageCount: doc.numPages };
}
