"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import type { Session, User } from "@supabase/supabase-js";

export function useAdminSession() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { loading, session, user };
}

export async function signInWithEmail(email: string, password: string) {
  return getSupabaseBrowser().auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email: string, password: string) {
  return getSupabaseBrowser().auth.signUp({ email, password });
}

export async function signOutAdmin() {
  return getSupabaseBrowser().auth.signOut();
}
