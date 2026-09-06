import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as generalInquiryText, i as Button, m as WhatsAppIcon, v as site, y as waUrl } from "./router-C26Rf44o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/a-propos-D5L7kp7s.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.22em] uppercase text-rose-deep",
					children: "L'Atelier"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl leading-tight sm:text-6xl",
					children: "Une pépite pour la beauté que tu es."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-[15px] leading-relaxed text-ink-soft",
					children: "L'Atelier de la Séduction est une boutique féminine à Abidjan, Riviera-Bonoumin, Résidence RYAN. On y choisit des lingeries et des pièces de nuit comme on choisit un bijou : à la main, à la lumière, sans promesse retouchée."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[15px] leading-relaxed text-ink-soft",
					children: "Toutes nos photos et vidéos sont sans retouches. Ce que vous voyez est ce qui arrive — la dentelle, le satin, le rose poussière du sac, le bordeaux de la robe maille."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/brand/boutique.jpg",
					alt: "L'intérieur de L'Atelier de la Séduction, Riviera-Bonoumin",
					className: "w-full object-cover"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line bg-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3",
				children: [
					{
						n: "01",
						t: "Authenticité",
						d: "Photos brutes, pièces réelles, conversation directe. Pas de filtre, pas de stock fantôme."
					},
					{
						n: "02",
						t: "Élégance",
						d: "Une palette ivoire, rose poussière, bordeaux. Rien de criard, rien de clinquant."
					},
					{
						n: "03",
						t: "Discrétion",
						d: "Le paiement se fait hors site, sur WhatsApp. Votre commande reste une conversation privée."
					}
				].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl text-rose",
						children: v.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: v.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: v.d
					})
				] }, v.n))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-4 py-16 text-center sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "Comment commander"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-10 grid gap-6 text-left sm:grid-cols-3",
					children: [
						{
							n: "1",
							t: "Choisissez",
							d: "Parcourez la boutique, ouvrez une fiche, sélectionnez taille et couleur."
						},
						{
							n: "2",
							t: "Écrivez",
							d: "Le bouton WhatsApp ouvre une conversation déjà préremplie avec la référence."
						},
						{
							n: "3",
							t: "Confirmez",
							d: "Nous validons le stock et le paiement. Livraison à Abidjan, retrait possible."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line bg-paper p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl text-burgundy",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-medium",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: s.d
							})
						]
					}, s.n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col justify-center gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/boutique",
							children: "Entrer dans la boutique"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						variant: "whatsapp",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waUrl(generalInquiryText),
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4" }), "WhatsApp"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-8 text-sm text-muted",
					children: [
						site.addressFull,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						site.phoneDisplay
					]
				})
			]
		})
	] });
}
//#endregion
export { AboutPage as component };
