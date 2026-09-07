import { n as formatCfa, t as cn } from "./utils-mKqPXrKx.mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as productMessage, c as waUrl, l as WhatsAppIcon, m as categoryLabel } from "./router-nc0T7Vaq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-YmXmawj1.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product, eager }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex min-w-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/produit/$slug",
			params: { slug: product.slug },
			className: "relative block overflow-hidden rounded-lg bg-sand",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-portrait overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.images[0],
					alt: product.name,
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
					loading: eager ? "eager" : "lazy"
				})
			}), product.isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full bg-paper/95 px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase text-burgundy",
				children: "Nouveau"
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.16em] uppercase text-muted",
					children: categoryLabel[product.category]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/produit/$slug",
					params: { slug: product.slug },
					className: "mt-1 font-display text-xl leading-snug text-ink sm:text-[1.35rem]",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-sm text-muted",
					children: product.short
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-col gap-2.5 pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tabular-nums text-ink",
						children: formatCfa(product.price)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: waUrl(productMessage(product)),
						target: "_blank",
						rel: "noopener noreferrer",
						className: cn("inline-flex h-11 items-center justify-center gap-1.5 rounded-md bg-burgundy px-3 text-[11px] tracking-[0.08em] uppercase text-paper", "hover:bg-burgundy-deep"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-3.5" }), "Commander"]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
