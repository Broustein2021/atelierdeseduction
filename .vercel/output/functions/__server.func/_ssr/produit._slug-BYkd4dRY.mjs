import { i as __toESM } from "../_runtime.mjs";
import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as categoryLabel, g as formatCfa, h as cn, l as colorLabel, n as Route, u as colors } from "./router-C26Rf44o.mjs";
import { t as ProductCard } from "./ProductCard-BPP5bEF0.mjs";
import { t as WhatsAppCta } from "./WhatsAppCta-DmJDrsJK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produit._slug-BYkd4dRY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { product, related } = Route.useLoaderData();
	const [active, setActive] = (0, import_react.useState)(0);
	const [size, setSize] = (0, import_react.useState)(product.sizes[1] ?? product.sizes[0]);
	const [color, setColor] = (0, import_react.useState)(product.colors[0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "text-[12px] text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-ink",
						children: "Accueil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-1.5",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/boutique",
						className: "hover:text-ink",
						children: "Boutique"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-1.5",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink",
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-sand",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.images[active] ?? product.images[0],
						alt: product.name,
						className: "aspect-portrait w-full object-cover"
					})
				}), product.images.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-4 gap-2",
					children: product.images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActive(i),
						className: cn("overflow-hidden rounded-md border-2", i === active ? "border-burgundy" : "border-transparent"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: "",
							className: "aspect-square w-full object-cover"
						})
					}, src))
				}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] tracking-[0.2em] uppercase text-rose-deep",
							children: [
								categoryLabel[product.category],
								" · Réf. ",
								product.ref
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-4xl leading-tight sm:text-5xl",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-2xl font-medium tabular-nums",
							children: formatCfa(product.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[15px] leading-relaxed text-ink-soft",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.16em] uppercase text-muted",
								children: "Couleur"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: product.colors.map((c) => {
									const meta = colors.find((x) => x.id === c);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setColor(c),
										className: cn("inline-flex h-10 items-center gap-2 rounded-full border px-3 text-xs tracking-[0.1em] uppercase", color === c ? "border-burgundy bg-burgundy text-paper" : "border-line bg-paper"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-2.5 rounded-full border border-black/10",
											style: { background: meta?.swatch }
										}), colorLabel[c]]
									}, c);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-[0.16em] uppercase text-muted",
									children: "Taille"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/guide-tailles",
									className: "text-xs text-burgundy underline-offset-4 hover:underline",
									children: "Guide des tailles"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSize(s),
									className: cn("flex size-11 items-center justify-center rounded-md border text-sm", size === s ? "border-burgundy bg-burgundy text-paper" : "border-line bg-paper hover:border-ink/30"),
									children: s
								}, s))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppCta, {
								product,
								size,
								color: colorLabel[color],
								label: "Commander sur WhatsApp"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-muted",
								children: "Le message est prérempli avec la référence, la couleur et la taille. Stock et paiement confirmés dans la conversation."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-10 space-y-4 border-t border-line pt-8 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] tracking-[0.16em] uppercase text-muted",
								children: "Matière"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-ink-soft",
								children: product.material
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] tracking-[0.16em] uppercase text-muted",
								children: "Entretien"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-ink-soft",
								children: product.care
							})] })]
						})
					]
				})]
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl sm:text-4xl",
					children: "Dans le même esprit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			}) : null
		]
	});
}
//#endregion
export { ProductPage as component };
