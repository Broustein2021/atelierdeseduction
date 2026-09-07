import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabaseUrl = url;
export const supabaseAnonKey = anonKey;

let client: SupabaseClient | null = null;

function createBrowserClient(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error(
      "Supabase browser config missing — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY",
    );
  }
  if (typeof window === "undefined") {
    // SSR-safe stub: never used server-side (admin pages call it from effects only)
    return createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

/** Lazy singleton — safe to import during SSR, surfaces a real client in the browser. */
export function getSupabaseBrowser(): SupabaseClient {
  client ??= createBrowserClient();
  return client;
}