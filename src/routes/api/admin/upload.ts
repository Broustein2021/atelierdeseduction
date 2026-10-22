import { createFileRoute } from "@tanstack/react-router";

/**
 * Media upload API (admin only).
 *
 * POST    -> mints a short-lived Vercel Blob client token bound to one
 *            destination path (the session must belong to the shop owner).
 * DELETE  -> removes a blob from the store.
 *
 * The file itself never goes through this route: the browser PUTs it straight
 * to Blob with the token, so the serverless body limit does not apply.
 */

function json(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isUploadKind(value: string): value is "images" | "videos" {
  return value === "images" || value === "videos";
}

/** The session must belong to the shop owner. */
async function requireAdmin(): Promise<Response | null> {
  const { assertSameSiteRequest } = await import("@/lib/auth/isolation.server");
  const { getSessionUser } = await import("@/lib/auth/verify.server");
  const { adminEmail } = await import("@/lib/admin-config");

  // Reject scripted cross-site/sibling requests before touching admin data.
  try {
    assertSameSiteRequest();
  } catch {
    return json({ error: "Accès refusé." }, 403);
  }

  const user = await getSessionUser();
  if (!user) return json({ error: "Non authentifié." }, 401);
  if ((user.email ?? "").toLowerCase() !== adminEmail()) {
    return json({ error: "Accès refusé." }, 403);
  }
  return null;
}

export const Route = createFileRoute("/api/admin/upload")({
  server: {
    handlers: {
      GET: async () => {
        const { blobConfigured, probeStoreAccess } = await import("@/lib/blob.server");
        if (!blobConfigured()) return json({ ok: true, blob: false, access: "unknown" });
        const access = await probeStoreAccess();
        return json({ ok: true, blob: true, access });
      },

      POST: async ({ request }) => {
        const denied = await requireAdmin();
        if (denied) return denied;

        let body: { kind?: unknown; fileName?: unknown };
        try {
          body = await request.json();
        } catch {
          return json({ error: "Corps de requête invalide." }, 400);
        }

        const kind = String(body.kind ?? "");
        if (!isUploadKind(kind)) {
          return json({ error: "Type de média inconnu." }, 400);
        }

        const { blobConfigured, createUploadToken, uploadPathname, probeStoreAccess } =
          await import("@/lib/blob.server");
        if (!blobConfigured()) {
          return json(
            { error: "Stockage Vercel Blob non configuré sur ce projet." },
            503,
          );
        }

        const access = await probeStoreAccess();
        if (access === "private") {
          return json(
            {
              error:
                "Le store Vercel Blob est en accès privé : les images du catalogue doivent être publiques. Créez un store public (projet > Storage > Create Storage > Blob > Public), puis reconnectez-le au projet.",
            },
            503,
          );
        }

        const pathname = uploadPathname(kind, String(body.fileName ?? ""));
        const token = await createUploadToken(kind, pathname);
        return json({ token, pathname });
      },

      DELETE: async ({ request }) => {
        const denied = await requireAdmin();
        if (denied) return denied;

        let body: { url?: unknown };
        try {
          body = await request.json();
        } catch {
          return json({ error: "Corps de requête invalide." }, 400);
        }

        const url = String(body.url ?? "");
        if (!url.startsWith("https://")) {
          return json({ error: "URL invalide." }, 400);
        }

        const { deleteBlob } = await import("@/lib/blob.server");
        await deleteBlob(url);
        return json({ ok: true });
      },
    },
  },
});
