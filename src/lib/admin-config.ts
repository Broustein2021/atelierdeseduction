/**
 * Catalogue administration — single owner.
 *
 * The back office is not multi-tenant: exactly one email may sign in and edit
 * the catalogue. The check lives server-side (`@/lib/auth/admin-middleware`),
 * the constant is shared with the UI so the admin area can redirect as soon as
 * a session belongs to somebody else.
 *
 * Override with the `ADMIN_EMAIL` env var (server-side) if the shop changes
 * owner; the value is compared case-insensitively.
 */
export const ADMIN_EMAIL = "atelierdeseduction@gmail.com";

/** The admin email actually enforced on the server (env override wins). */
export function adminEmail(): string {
  const configured =
    typeof process !== "undefined" ? process.env.ADMIN_EMAIL?.trim() : undefined;
  return (configured || ADMIN_EMAIL).toLowerCase();
}
