"use client";

import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { authClient } from "@/lib/auth/client";
import { ADMIN_EMAIL } from "@/lib/admin-config";

/**
 * Back-office session (browser side).
 *
 * The app runs its own Better Auth at same-origin `/api/auth/*`, so the
 * session is a plain HttpOnly cookie — no token to store, nothing to attach
 * by hand. The Supabase client this used to rely on is gone.
 *
 * A session alone is not enough: the catalogue has a single owner, so the
 * signed-in account must be {@link ADMIN_EMAIL}. The same check runs
 * server-side (`@/lib/auth/admin-middleware`) — this one only decides what
 * the UI shows.
 */

export type AdminUser = { id: string; email: string | null };

export type AdminSession = {
  user: AdminUser | null;
};

/**
 * Session state for the back office.
 *
 * `user` is whoever is signed in (owner or not) so the login screen can tell
 * "wrong password" apart from "signed in, but this account does not own the
 * catalogue" instead of silently showing the form again. `session` is only
 * set for the owner account.
 */
export function useAdminSession(): {
  loading: boolean;
  session: AdminSession | null;
  user: AdminUser | null;
  isOwner: boolean;
} {
  const { user, isPending } = useCurrentUserState();
  const email = (user?.primaryEmail ?? "").toLowerCase();
  const isOwner = Boolean(user) && email === ADMIN_EMAIL.toLowerCase();
  const signedIn: AdminUser | null = user
    ? { id: user.id, email: user.primaryEmail }
    : null;

  return {
    loading: isPending,
    session: isOwner ? { user: signedIn } : null,
    user: signedIn,
    isOwner,
  };
}

/** Sign in with email + password. Returns `{ error }` instead of throwing. */
export async function signInWithEmail(
  email: string,
  password: string,
): Promise<{ error: { message: string } | null }> {
  const { error } = await authClient.signIn.email({ email, password });
  return {
    error: error
      ? { message: error.message ?? "Identifiants invalides." }
      : null,
  };
}

/** Sign out of the back office. */
export async function signOutAdmin(): Promise<void> {
  const { error } = await authClient.signOut();
  if (error) throw new Error(error.message ?? "Déconnexion impossible.");
}
