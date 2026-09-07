import { t as cn } from "./_ssr/utils-mKqPXrKx.mjs";
import { S as require_jsx_runtime, d as useRouterState, m as Outlet, v as Link, y as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Plus, f as LoaderCircle, p as LayoutDashboard, u as LogOut } from "./_libs/lucide-react.mjs";
import { n as signOutAdmin, r as useAdminSession } from "./_ssr/admin-auth-CgG1WN8E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_layout-DRERkeCl.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { loading, session } = useAdminSession();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-svh items-center justify-center bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-burgundy" })
	});
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin/login",
		replace: true
	});
	const nav = [{
		to: "/admin",
		label: "Tableau de bord",
		icon: LayoutDashboard,
		active: pathname === "/admin" || pathname.startsWith("/admin/produits")
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh bg-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-64 shrink-0 flex-col border-r border-line bg-paper md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-16 items-center border-b border-line px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-xl text-burgundy",
						children: "L'Atelier"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-[10px] tracking-[0.18em] uppercase text-muted",
						children: "Admin"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex-1 space-y-1 p-3",
					children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm", item.active ? "bg-burgundy text-paper" : "text-ink-soft hover:bg-sand"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/produits/new",
						className: "mt-2 flex items-center gap-3 rounded-md border border-dashed border-rose-deep/50 px-3 py-2.5 text-sm text-rose-deep hover:bg-sand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Nouvel article"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-line p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => void signOutAdmin().then(() => window.location.href = "/"),
						className: "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink-soft hover:bg-sand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Se déconnecter"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line bg-paper px-4 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-lg text-burgundy",
						children: "L'Atelier"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/produits/new",
							className: "inline-flex size-10 items-center justify-center rounded-md text-ink-soft hover:bg-sand",
							"aria-label": "Nouvel article",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void signOutAdmin().then(() => window.location.href = "/"),
							className: "inline-flex size-10 items-center justify-center rounded-md text-ink-soft hover:bg-sand",
							"aria-label": "Se déconnecter",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-5" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto border-b border-line bg-paper px-2 py-2 md:hidden",
					children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs", item.active ? "bg-burgundy text-paper" : "border border-line text-ink-soft"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-3.5" }), item.label]
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-4 sm:p-6 lg:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			]
		})]
	});
}
//#endregion
export { AdminLayout as component };
