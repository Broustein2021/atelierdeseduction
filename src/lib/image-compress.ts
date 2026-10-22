"use client";

/**
 * Browser-side image compression, run before an upload.
 *
 * Vercel Blob stores files as-is (no resizing, no conversion), so a phone
 * photo lands on the catalogue at several megabytes and every visitor pays for
 * it. Downscaling to 1600 px and re-encoding to WebP keeps the shop's photos
 * sharp while cutting most pages' weight by 5-10x.
 */

const MAX_EDGE = 1600;
const QUALITY = 0.82;
const SKIP_BELOW_BYTES = 300 * 1024;

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || typeof document === "undefined") {
    return file;
  }

  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createBitmap(file);
    const longEdge = Math.max(bitmap.width, bitmap.height);
    const scale = Math.min(1, MAX_EDGE / longEdge);
    if (scale === 1 && file.size <= SKIP_BELOW_BYTES) return file;

    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    // JPEG has no alpha channel: flatten onto white so transparent PNGs do
    // not turn black.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, width, height);

    const encoded =
      (await toBlob(canvas, "image/webp", QUALITY)) ??
      (await toBlob(canvas, "image/jpeg", QUALITY));
    if (!encoded || encoded.size >= file.size) return file;

    const extension =
      encoded.type === "image/webp"
        ? "webp"
        : encoded.type === "image/png"
          ? "png"
          : "jpg";
    const base = (file.name.replace(/\.[^.]+$/, "") || "image").slice(0, 80);
    return new File([encoded], `${base}.${extension}`, {
      type: encoded.type,
      lastModified: Date.now(),
    });
  } catch {
    return file;
  } finally {
    bitmap?.close();
  }
}

async function createBitmap(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return await createImageBitmap(file);
  }
}

function toBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}
