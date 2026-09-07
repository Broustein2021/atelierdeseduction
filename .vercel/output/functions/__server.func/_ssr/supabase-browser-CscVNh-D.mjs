import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-browser-CscVNh-D.js
var url = "https://hdjouqmlnginsxgijhcy.supabase.co";
var anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkam91cW1sbmdpbnN4Z2lqaGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3ODE0NDIsImV4cCI6MjEwNDM1NzQ0Mn0.4zPRsErAzm_Z7YFRJWlzRI8Lt2y15qGDi1OgYD-LM6s";
var client = null;
function createBrowserClient() {
	if (typeof window === "undefined") return createClient(url, anonKey, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
	return createClient(url, anonKey, { auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true
	} });
}
/** Lazy singleton — safe to import during SSR, surfaces a real client in the browser. */
function getSupabaseBrowser() {
	client ??= createBrowserClient();
	return client;
}
//#endregion
export { getSupabaseBrowser as t };
