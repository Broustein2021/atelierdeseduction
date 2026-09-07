import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const ADMIN_EMAIL = "atelierdeseduction@gmail.com";
const BUCKETS: Record<string, true> = {
  "product-images": true,
  "product-videos": true,
};
const SAFE_ID = /^[a-zA-Z0-9_-]+$/;

function json(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function requireAdmin(request: Request): Promise<Response | null> {
  const auth = request.headers.get("Authorization");
  const jwt = auth?.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!jwt) return json({ error: "Non authentifié." }, 401);
  const { data, error } = await getSupabaseAdmin().auth.getUser(jwt);
  if (error || !data.user) return json({ error: "Session invalide." }, 401);
  if (data.user.email !== ADMIN_EMAIL) return json({ error: "Accès refusé." }, 403);
  return null;
}

export const Route = createFileRoute("/api/admin/upload")({
  server: {
    handlers: {
      GET: async () => json({ ok: true }),

      POST: async ({ request }) => {
        const denied = await requireAdmin(request);
        if (denied) return denied;

        let body: {
          bucket?: unknown;
          productId?: unknown;
          fileName?: unknown;
          contentType?: unknown;
        };
        try {
          body = await request.json();
        } catch {
          return json({ error: "Corps de requête invalide." }, 400);
        }

        const bucket = body.bucket as string;
        const productId = body.productId as string;
        const fileName = body.fileName as string;

        if (!BUCKETS[bucket]) return json({ error: "Bucket inconnu." }, 400);
        if (!SAFE_ID.test(productId ?? "")) return json({ error: "productId invalide." }, 400);

        const ext =
          String(fileName ?? "")
            .split(".")
            .pop()
            ?.toLowerCase()
            .replace(/[^a-z0-9]/g, "") || "bin";
        if (!/^[a-z0-9]{1,8}$/.test(ext)) return json({ error: "Extension invalide." }, 400);

        const path = `${productId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 10)}.${ext}`;

        const result = await getSupabaseAdmin()
          .storage.from(bucket)
          .createSignedUploadUrl(path, { upsert: true });

        if (result.error || !result.data?.signedUrl) {
          return json(
            { error: result.error?.message ?? "Impossible de créer l'URL d'upload." },
            500,
          );
        }

        return json({ signedUrl: result.data.signedUrl, path: `${bucket}/${path}` });
      },

      DELETE: async ({ request }) => {
        const denied = await requireAdmin(request);
        if (denied) return denied;

        let body: { bucket?: unknown; path?: unknown };
        try {
          body = await request.json();
        } catch {
          return json({ error: "Corps de requête invalide." }, 400);
        }

        const bucket = body.bucket as string;
        const path = body.path as string;
        if (!BUCKETS[bucket]) return json({ error: "Bucket inconnu." }, 400);
        if (!path || path.includes("..")) return json({ error: "Chemin invalide." }, 400);

        const { error } = await getSupabaseAdmin().storage.from(bucket).remove([path]);
        if (error) return json({ error: error.message }, 500);
        return json({ ok: true });
      },
    },
  },
});