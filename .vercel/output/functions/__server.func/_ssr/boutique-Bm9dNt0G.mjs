import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-mKqPXrKx.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as colors, i as Route$8, p as categories } from "./router-nc0T7Vaq.mjs";
import { t as ProductCard } from "./ProductCard-YmXmawj1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/boutique-Bm9dNt0G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Chip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-10 shrink-0 rounded-full border px-4 text-xs tracking-[0.12em] uppercase transition-colors", active ? "border-burgundy bg-burgundy text-paper" : "border-line bg-paper text-ink-soft hover:border-ink/30"),
		children
	});
}
function BoutiquePage() {
	const search = Route$8.useSearch();
	const navigate = Route$8.useNavigate();
	const { products } = Route$8.useLoaderData();
	const [size, setSize] = (0, import_react.useState)("all");
	const setSearch = (patch) => {
		navigate({ search: {
			...search,
			...patch
		} });
	};
	const filtered = (0, import_react.useMemo)(() => {
		return products.filter((p) => {
			if (search.cat && p.category !== search.cat) return false;
			if (search.couleur && !p.colors.includes(search.couleur)) return false;
			if (search.nouveau && !p.isNew) return false;
			if (size !== "all" && !p.sizes.includes(size)) return false;
			return true;
		});
	}, [search, size]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] uppercase text-rose-deep",
				children: "Collection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl sm:text-5xl",
					children: "La boutique"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						filtered.length,
						" pièce",
						filtered.length > 1 ? "s" : "",
						" · paiement sur WhatsApp"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: !search.cat,
							onClick: () => setSearch({ cat: void 0 }),
							children: "Tout"
						}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: search.cat === c.id,
							onClick: () => setSearch({ cat: search.cat === c.id ? void 0 : c.id }),
							children: c.label
						}, c.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: !search.couleur,
								onClick: () => setSearch({ couleur: void 0 }),
								children: "Toutes couleurs"
							}),
							colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: search.couleur === c.id,
								onClick: () => setSearch({ couleur: search.couleur === c.id ? void 0 : c.id }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2.5 rounded-full border border-ink/15",
										style: { background: c.swatch }
									}), c.label]
								})
							}, c.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: Boolean(search.nouveau),
								onClick: () => setSearch({ nouveau: search.nouveau ? void 0 : true }),
								children: "Nouveautés"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] tracking-[0.16em] uppercase text-muted",
							children: "Taille"
						}), [
							"all",
							"S",
							"M",
							"L",
							"XL",
							"XXL"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: size === s,
							onClick: () => setSize(s),
							children: s === "all" ? "Toutes" : s
						}, s))]
					})
				]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 rounded-xl border border-line bg-paper px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: "Aucune pièce pour ce filtre"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Élargissez la recherche, ou demandez-nous une pièce sur WhatsApp."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/boutique",
						className: "mt-6 inline-flex h-12 items-center rounded-md border border-line px-5 text-sm",
						children: "Réinitialiser"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6",
				children: filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product: p,
					eager: i < 4
				}, p.id))
			})
		]
	});
}
//#endregion
export { BoutiquePage as component };
