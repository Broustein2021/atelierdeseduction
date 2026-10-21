import { createMiddleware } from "@tanstack/react-start";

/**
 * Auth middleware for the catalogue back office — ADMIN ONLY (server-only).
 *
 * Same shape as `authMiddleware` (the bearer hook for the live preview, the
 * same-site assertion, the fail-closed session lookup) plus the owner check:
 * a valid session is not enough, the account must be the shop owner's.
 *
 *   import { createServerFn } from "@tanstack/react-start";
 *   import { adminMiddleware } from "@/lib/auth/admin-middleware";
 *
 *   export const listProducts = createServerFn({ method: "GET" })
 *     .middleware([adminMiddleware])
 *     .handler(async ({ context }) => {
 *       // context.userId / context.email are the verified owner.
 *     });
 *
 * Signed out -> `UnauthorizedError` (401). Signed in as somebody else -> 403.
 * Both fail closed: an unauthenticated caller never reaches the handler.
 */
export const adminMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    // Live preview (partitioned iframe): the session rides a bearer token, not
    // a cookie, so forward it to the server. Null when deployed (cookie auth),
    // so this is a no-op there.
    const { getBearerToken } = await import("./client");
    return next({ sendContext: { bearerToken: getBearerToken() ?? undefined } });
  })
  .server(async ({ next, context }) => {
    // ONLY import `*.server` modules here. This file is dual client/server
    // (bearer hook on the client) — see the same note in `./middleware`.
    const { assertSameSiteRequest } = await import("./isolation.server");
    const { getSessionUser, UnauthorizedError } = await import("./verify.server");
    const { adminEmail } = await import("../admin-config");

    // Reject scripted cross-site/sibling requests before touching admin data.
    assertSameSiteRequest();

    const user = await getSessionUser(context.bearerToken);
    if (!user) throw new UnauthorizedError();

    const email = (user.email ?? "").toLowerCase();
    if (email !== adminEmail()) {
      const forbidden = new Error("Forbidden") as Error & { status: number };
      forbidden.status = 403;
      throw forbidden;
    }

    return next({ context: { userId: user.id, email: user.email } });
  });
