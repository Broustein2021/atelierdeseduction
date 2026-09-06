import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as MapPin, s as ArrowRight } from "../_libs/lucide-react.mjs";
import { _ as generalInquiryText, a as Logo, d as featuredProducts, i as Button, m as WhatsAppIcon, o as Monogram, v as site, y as waUrl } from "./router-C26Rf44o.mjs";
import { t as ProductCard } from "./ProductCard-BPP5bEF0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D3vcH6Ir.js
var import_jsx_runtime = require_jsx_runtime();
var marquee = [
	"Photos sans retouches",
	"Riviera-Bonoumin",
	"Commande sur WhatsApp",
	"Livraison Abidjan",
	"Paiement hors site",
	"Pièces en quantités limitées"
];
function Home() {
	const featured = featuredProducts();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-[88svh] overflow-hidden bg-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/brand/boutique.jpg",
					alt: "L'Atelier de la Séduction, boutique Riviera-Bonoumin",
					className: "absolute inset-0 h-full w-full object-cover object-[center_20%]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-rise max-w-xl text-paper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, { className: "h-14 w-24 text-paper" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-[11px] tracking-[0.28em] uppercase text-rose",
								children: "Abidjan · Riviera-Bonoumin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-3 font-display text-[2.7rem] leading-[0.95] sm:text-6xl",
								children: ["L'Atelier de", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic",
									children: " la Séduction"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 max-w-md font-display text-xl italic text-paper/85 sm:text-2xl",
								children: [site.tagline, "."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/boutique",
										children: ["Découvrir la collection", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "inverse",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: waUrl(generalInquiryText),
										target: "_blank",
										rel: "noopener noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4" }), "Écrire sur WhatsApp"]
									})
								})]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden border-y border-line bg-paper py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-marquee flex w-max gap-10 text-[11px] tracking-[0.22em] uppercase text-muted",
				children: [
					...marquee,
					...marquee,
					...marquee
				].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-10",
					children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-rose" })]
				}, `${item}-${i}`))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.22em] uppercase text-rose-deep",
					children: "Sélection"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl sm:text-5xl",
					children: "Pièces du moment"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/boutique",
						children: ["Toute la boutique", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6",
				children: featured.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product: p,
					eager: i < 2
				}, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-stretch gap-0 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-[420px] overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/products/nuisette-ivoire.jpg",
						alt: "Nuisette soie ivoire à l'atelier",
						className: "absolute inset-0 h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center px-6 py-14 sm:px-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.22em] uppercase text-rose-deep",
							children: "La maison"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
							children: "Un atelier, pas un catalogue."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-[15px] leading-relaxed text-ink-soft",
							children: "À Riviera-Bonoumin, Résidence RYAN, on choisit les pièces à la main. Rien n'est retouché : la lumière, le tissu, la couleur que vous voyez est celle que vous recevrez. La conversation, le conseil de taille et le paiement se font sur WhatsApp — simplement."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/a-propos",
									children: "L'histoire de l'atelier"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), "Venir en boutique"]
								})
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [
					{
						title: "Sans retouches",
						body: "Chaque photo et chaque vidéo est brute. Vous voyez la pièce, pas un filtre."
					},
					{
						title: "WhatsApp unique",
						body: "Pas de panier, pas de caisse en ligne. Une conversation, une pièce, un paiement."
					},
					{
						title: "Abidjan d'abord",
						body: "Boutique à Riviera-Bonoumin. Livraison dans la ville, expédition possible."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-paper px-6 py-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: item.body
					})]
				}, item.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-line bg-burgundy px-4 py-16 text-paper sm:px-6 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						stacked: true,
						className: "text-paper [&_span]:text-paper"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 font-display text-4xl sm:text-5xl",
						children: "Une question, une taille, une pièce."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-relaxed text-paper/75",
						children: "Dites-nous ce que vous cherchez. Nous confirmons le stock, la taille, et le mode de paiement — le tout dans une seule conversation."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						variant: "inverse",
						className: "mt-8 w-full sm:w-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waUrl(generalInquiryText),
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4" }), "Ouvrir WhatsApp"]
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };
