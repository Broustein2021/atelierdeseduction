import { createFileRoute } from "@tanstack/react-router";

/**
 * TEMPORARY: reads the Blob read-write token from the runtime env so it can be
 * moved to a properly named `BLOB_READ_WRITE_TOKEN` variable. Deleted right
 * after the migration.
 */
export const Route = createFileRoute("/api/admin/blob-token")({
  server: {
    handlers: {
      GET: async () => {
        const { assertSameSiteRequest } = await import("@/lib/auth/isolation.server");
        const { getSessionUser } = await import("@/lib/auth/verify.server");
        const { adminEmail } = await import("@/lib/admin-config");

        try {
          assertSameSiteRequest();
        } catch {
          return new Response("{}", { status: 403 });
        }
        const user = await getSessionUser();
        if (!user) return new Response("{}", { status: 401 });
        if ((user.email ?? "").toLowerCase() !== adminEmail()) {
          return new Response("{}", { status: 403 });
        }

        const entries = Object.entries(process.env)
          .filter(([key]) => key.endsWith("_READ_WRITE_TOKEN"))
          .map(([key, value]) => ({ key, value: value ?? "" }));
        return new Response(JSON.stringify(entries), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
