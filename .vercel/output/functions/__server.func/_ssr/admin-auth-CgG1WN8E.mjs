import { i as __toESM } from "../_runtime.mjs";
import { t as getSupabaseBrowser } from "./supabase-browser-CscVNh-D.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth-CgG1WN8E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAdminSession() {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
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
	return {
		loading,
		session,
		user
	};
}
async function signInWithEmail(email, password) {
	return getSupabaseBrowser().auth.signInWithPassword({
		email,
		password
	});
}
async function signOutAdmin() {
	return getSupabaseBrowser().auth.signOut();
}
//#endregion
export { signOutAdmin as n, useAdminSession as r, signInWithEmail as t };
