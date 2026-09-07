import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export function getSupabaseAdmin() {
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase server config missing — set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
