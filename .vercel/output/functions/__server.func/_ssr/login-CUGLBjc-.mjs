import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as LogIn, f as LoaderCircle, g as EyeOff, h as Eye } from "../_libs/lucide-react.mjs";
import { r as useAdminSession, t as signInWithEmail } from "./admin-auth-CgG1WN8E.mjs";
import { d as Logo, u as Button } from "./router-nc0T7Vaq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CUGLBjc-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const { loading, session } = useAdminSession();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-svh items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-burgundy" })
	});
	if (session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin",
		replace: true
	});
	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);
		const { error: err } = await signInWithEmail(email, password);
		setSubmitting(false);
		if (err) setError(err.message === "Invalid login credentials" ? "Email ou mot de passe incorrect." : err.message);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-svh items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "text-burgundy" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 font-display text-3xl",
							children: "Espace propriétaire"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Connectez-vous pour gérer vos articles."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-8 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "email",
							className: "mb-1.5 block text-[11px] tracking-[0.16em] uppercase text-muted",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "email",
							type: "email",
							required: true,
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none focus:border-burgundy",
							placeholder: "vous@exemple.com"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "password",
							className: "mb-1.5 block text-[11px] tracking-[0.16em] uppercase text-muted",
							children: "Mot de passe"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "password",
								type: showPw ? "text" : "password",
								required: true,
								autoComplete: "current-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "h-11 w-full rounded-md border border-line bg-paper px-3 pr-10 text-sm outline-none focus:border-burgundy",
								placeholder: "••••••••"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPw((v) => !v),
								className: "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-ink",
								"aria-label": showPw ? "Cacher le mot de passe" : "Afficher le mot de passe",
								children: showPw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})]
						})] }),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "lg",
							className: "w-full",
							disabled: submitting,
							children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), "Se connecter"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-ink",
						children: "← Retour au site"
					})
				})
			]
		})
	});
}
//#endregion
export { AdminLogin as component };
