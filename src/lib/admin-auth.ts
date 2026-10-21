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

export type AdminSession = {
  user: { id: string; email: string | null } | null;
};

/** Session state for the back office. */
export function useAdminSession(): {
  loading: boolean;
  session: AdminSession | null;
  user: AdminSession["user"];
} {
  const { user, isPending } = useCurrentUserState();
  const email = (user?.primaryEmail ?? "").toLowerCase();
  const isOwner = Boolean(user) && email === ADMIN_EMAIL.toLowerCase();

  return {
    loading: isPending,
    session: isOwner ? { user: { id: user!.id, email: user!.primaryEmail } } : null,
    user: isOwner ? { id: user!.id, email: user!.primaryEmail } : null,
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
