"use client";

const UPLOAD_API = "/api/admin/upload";

async function adminToken(): Promise<string> {
  const { getSupabaseBrowser } = await import("@/lib/supabase-browser");
  const {
    data: { session },
  } = await getSupabaseBrowser().auth.getSession();
  if (!session) throw new Error("Session expirée, reconnectez-vous.");
  return session.access_token;
}

export async function createAdminUploadUrl(
  bucket: string,
  productId: string,
  fileName: string,
  contentType: string,
): Promise<{ signedUrl: string; path: string }> {
  const res = await fetch(UPLOAD_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await adminToken()}`,
    },
    body: JSON.stringify({ bucket, productId, fileName, contentType }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Impossible de préparer l'upload.");
  return { signedUrl: data.signedUrl, path: data.path };
}

export async function uploadToSignedUrl(signedUrl: string, file: File): Promise<void> {
  const res = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      "cache-control": "max-age=3600",
      "x-upsert": "false",
    },
    body: file,
  });
  if (!res.ok) throw new Error(`Upload échoué (HTTP ${res.status}).`);
}

export async function deleteAdminMedia(bucket: string, path: string): Promise<void> {
  const res = await fetch(UPLOAD_API, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await adminToken()}`,
    },
    body: JSON.stringify({ bucket, path }),
  });
  if (!res.ok) throw new Error("Suppression du média échouée.");
}