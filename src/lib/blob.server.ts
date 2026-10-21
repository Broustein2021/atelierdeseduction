import { del } from "@vercel/blob";
import { generateClientTokenFromReadWriteToken } from "@vercel/blob/client";

/**
 * Vercel Blob (server-only).
 *
 * The catalogue's media live in a Vercel Blob store; `BLOB_READ_WRITE_TOKEN` is
 * the project's read-write token.
 *
 * Uploads go through a CLIENT TOKEN so the file travels straight from the
 * browser to Blob (a serverless function caps request bodies at 4.5 MB, the
 * catalogue accepts 10 MB images and 50 MB videos). The server keeps control
 * of the destination path, the accepted content types and the maximum size —
 * the token is bound to a single path and expires in minutes.
 *
 * This file is `.server.ts` so Vite never ships it to the browser.
 */

export type UploadKind = "images" | "videos";

const KIND_CONFIG = {
  images: {
    prefix: "product-images",
    allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
    maximumSizeInBytes: 10 * 1024 * 1024,
  },
  videos: {
    prefix: "product-videos",
    allowedContentTypes: ["video/mp4", "video/webm", "video/quicktime"],
    maximumSizeInBytes: 50 * 1024 * 1024,
  },
} as const;

/** True when the project has a Blob store wired up. */
export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

/** Build a safe, unique destination path for an uploaded file. */
export function uploadPathname(kind: UploadKind, fileName: string): string {
  const config = KIND_CONFIG[kind];
  const extension = (fileName.split(".").pop() ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const safeExtension = /^[a-z0-9]{1,8}$/.test(extension) ? extension : "bin";
  const unique = `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
  return `${config.prefix}/${unique}.${safeExtension}`;
}

/**
 * Mint a client token scoped to one destination path.
 *
 * The token encodes the accepted content types and the maximum size, so the
 * browser cannot upload anything else to that path.
 */
export async function createUploadToken(
  kind: UploadKind,
  pathname: string,
): Promise<string> {
  const config = KIND_CONFIG[kind];
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) {
    throw new Error(
      "Vercel Blob n'est pas configuré (BLOB_READ_WRITE_TOKEN manquant).",
    );
  }
  return generateClientTokenFromReadWriteToken({
    token,
    pathname,
    allowedContentTypes: [...config.allowedContentTypes],
    maximumSizeInBytes: config.maximumSizeInBytes,
    addRandomSuffix: false,
    allowOverwrite: false,
    validUntil: Date.now() + 10 * 60 * 1000,
  });
}

/** Delete a blob by URL. Missing blobs are not an error. */
export async function deleteBlob(url: string): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return;
  await del(url, { token });
}
