import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Button } from "./router-nc0T7Vaq.mjs";
import { t as WhatsAppCta } from "./WhatsAppCta-ik7abKK7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-tailles-CH_4VIOJ.js
var import_jsx_runtime = require_jsx_runtime();
var rows = [
	{
		t: "S",
		tou: "36 — 38",
		poit: "82 — 86",
		tai: "64 — 68",
		han: "90 — 94"
	},
	{
		t: "M",
		tou: "38 — 40",
		poit: "86 — 90",
		tai: "68 — 72",
		han: "94 — 98"
	},
	{
		t: "L",
		tou: "42 — 44",
		poit: "90 — 96",
		tai: "72 — 80",
		han: "98 — 106"
	},
	{
		t: "XL",
		tou: "46",
		poit: "96 — 102",
		tai: "80 — 88",
		han: "106 — 114"
	},
	{
		t: "XXL",
		tou: "48 — 50",
		poit: "102 — 110",
		tai: "88 — 96",
		han: "114 — 122"
	}
];
function SizeGuidePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] uppercase text-rose-deep",
				children: "Guide"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl sm:text-5xl",
				children: "Trouver sa taille"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-[15px] leading-relaxed text-ink-soft",
				children: "Les pièces de l'atelier suivent une grille européenne, adaptée aux silhouettes que nous habillons à Abidjan. En doute, envoyez-nous trois mesures sur WhatsApp : poitrine, taille, hanches."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 overflow-x-auto rounded-xl border border-line bg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[520px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-line text-[11px] tracking-[0.14em] uppercase text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Taille"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Tour FR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Poitrine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Taille"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Hanches"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-medium",
								children: r.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ink-soft",
								children: r.tou
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 tabular-nums text-ink-soft",
								children: [r.poit, " cm"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 tabular-nums text-ink-soft",
								children: [r.tai, " cm"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 tabular-nums text-ink-soft",
								children: [r.han, " cm"]
							})
						]
					}, r.t)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "Pour les soutiens-gorge, indiquez aussi le tour de dos et le bonnet (ex. 90C). Les nuisettes et peignoirs sont pensés un peu amples : si vous hésitez entre deux tailles, prenez la plus petite pour un tombé près du corps, la plus grande pour le confort."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppCta, {
					label: "Demander conseil taille",
					className: "sm:w-auto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "lg",
					className: "sm:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/boutique",
						children: "Retour à la boutique"
					})
				})]
			})
		]
	});
}
//#endregion
export { SizeGuidePage as component };
