"use client";

import { put } from "@vercel/blob/client";

const UPLOAD_API = "/api/admin/upload";

export type UploadKind = "images" | "videos";

/**
 * Media upload (browser side).
 *
 * The server mints a short-lived Vercel Blob client token bound to one
 * destination path — it checks the session belongs to the shop owner — then
 * the browser PUTs the file to Blob directly. The file never travels through
 * a serverless function, so the 4.5 MB request limit does not apply.
 *
 * The session is a same-origin HttpOnly cookie: it rides along with the
 * `fetch` calls below, no Authorization header needed.
 */
export async function uploadMedia(
  kind: UploadKind,
  file: File,
  onUploadProgress?: (percentage: number) => void,
): Promise<{ url: string; pathname: string }> {
  const res = await fetch(UPLOAD_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      kind,
      fileName: file.name,
      contentType: file.type,
      size: file.size,
    }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    token?: string;
    pathname?: string;
  };
  if (!res.ok || !data.token || !data.pathname) {
    throw new Error(data.error ?? "Impossible de préparer l'upload.");
  }

  try {
    const blob = await put(data.pathname, file, {
      access: "public",
      token: data.token,
      contentType: file.type,
      onUploadProgress: onUploadProgress
        ? ({ percentage }) => onUploadProgress(Math.round(percentage))
        : undefined,
    });

    return { url: blob.url, pathname: blob.pathname };
  } catch (e) {
    throw new Error(explainUploadError(e));
  }
}

/** Turn raw Blob SDK errors into something the shop owner can act on. */
function explainUploadError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error ?? "");
  if (/private store/i.test(message)) {
    return (
      "Le store Vercel Blob est en accès privé : les images du catalogue doivent être publiques. " +
      "Créez un store public (projet > Storage > Create Storage > Blob > Public), " +
      "puis reconnectez-le au projet."
    );
  }
  if (/Failed to fetch|NetworkError|load failed/i.test(message)) {
    return "L'upload a été bloqué par le navigateur (CSP ou réseau). Réessayez.";
  }
  return message || "Erreur d'upload.";
}

/** Remove a media file from the Blob store. */
export async function deleteAdminMedia(url: string): Promise<void> {
  const res = await fetch(UPLOAD_API, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error("Suppression du média échouée.");
}
