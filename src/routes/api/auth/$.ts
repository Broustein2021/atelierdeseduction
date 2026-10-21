import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth/server";

/**
 * Mounts Better Auth at `/api/auth/*` (same-origin).
 *
 * The session is a plain HttpOnly cookie on this app's own domain — no token to
 * store, no second cookie namespace. The back office reads it through
 * `@/lib/auth/verify.server` and `@/lib/auth/admin-middleware`.
 */
export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
});
