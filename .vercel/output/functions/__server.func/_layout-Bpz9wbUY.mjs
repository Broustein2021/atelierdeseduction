import { i as __toESM } from "./_runtime.mjs";
import { n as formatCfa } from "./_ssr/utils-mKqPXrKx.mjs";
import { r as resolveMediaPath, t as fetchAllProducts } from "./_ssr/products-C02qIZJU.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Plus, s as Package } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_layout-Bpz9wbUY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		fetchAllProducts().then(setProducts).catch((e) => setError(e.message)).finally(() => setLoading(false));
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20 text-muted",
		children: "Chargement…"
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg text-red-700",
			children: error
		})
	});
	const totalProducts = products.length;
	const featuredCount = products.filter((p) => p.featured).length;
	const newCount = products.filter((p) => p.isNew).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.22em] uppercase text-rose-deep",
					children: "Tableau de bord"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl sm:text-4xl",
					children: "Vos articles"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/produits/new",
					className: "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-burgundy px-4 text-sm text-paper hover:bg-burgundy-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Nouvel article"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid grid-cols-3 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Articles",
						value: totalProducts
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Mis en avant",
						value: featuredCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Nouveautés",
						value: newCount
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 overflow-hidden rounded-xl border border-line bg-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-line px-4 py-3 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 font-display text-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4 text-rose-deep" }), "Tous les articles"]
					})
				}), products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: "Aucun article encore"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Commencez par ajouter votre premier article."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/produits/$slug",
						params: { slug: p.slug },
						className: "flex items-center gap-4 px-4 py-3.5 hover:bg-sand/60 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-14 w-11 shrink-0 overflow-hidden rounded-md bg-sand",
								children: p.images[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: resolveMediaPath(p.images[0]),
									alt: p.name,
									className: "h-full w-full object-cover"
								}) : null
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium text-ink",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										"Réf. ",
										p.ref,
										" · ",
										p.category
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-center gap-2 sm:flex",
								children: [p.isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-rose/20 px-2 py-0.5 text-[10px] tracking-wide uppercase text-rose-deep",
									children: "Nouveau"
								}) : null, p.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-burgundy/10 px-2 py-0.5 text-[10px] tracking-wide uppercase text-burgundy",
									children: "En avant"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-24 shrink-0 text-right text-sm font-medium tabular-nums text-ink",
								children: formatCfa(p.price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "→"
							})
						]
					}) }, p.id))
				})]
			})
		]
	});
}
function StatCard({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-paper p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-3xl font-medium tabular-nums text-burgundy",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] tracking-[0.14em] uppercase text-muted",
			children: label
		})]
	});
}
//#endregion
export { AdminDashboard as component };
