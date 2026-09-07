import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as MapPin, o as Phone, v as Clock } from "../_libs/lucide-react.mjs";
import { c as waUrl, l as WhatsAppIcon, o as generalInquiryText, s as site, u as Button } from "./router-nc0T7Vaq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BXHxQ_3r.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] uppercase text-rose-deep",
				children: "Contact"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl sm:text-5xl",
				children: "Venir, écrire, commander."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft",
				children: "La conversation se passe sur WhatsApp. La boutique est à Riviera-Bonoumin, Résidence RYAN. Confirmez votre visite avant de vous déplacer."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-line bg-paper p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), "WhatsApp & téléphone"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${site.phoneTel}`,
									className: "mt-3 block font-display text-3xl text-ink",
									children: site.phoneDisplay
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "whatsapp",
									size: "lg",
									className: "mt-5 w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: waUrl(generalInquiryText),
										target: "_blank",
										rel: "noopener noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4" }), "Ouvrir WhatsApp"]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-line bg-paper p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), "Boutique"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-[15px] leading-relaxed",
									children: [
										site.addressLine,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Abidjan, Côte d'Ivoire"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: site.mapLink,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "mt-3 inline-block text-sm text-burgundy underline-offset-4 hover:underline",
									children: "Itinéraire"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-line bg-paper p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), "Horaires"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-1.5 text-sm",
									children: site.hours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.day }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: h.hours
										})]
									}, h.day))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-muted",
									children: "Merci de confirmer votre passage sur WhatsApp."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: site.facebook,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "block rounded-xl border border-line bg-paper p-6 text-sm hover:border-ink/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-[0.16em] uppercase text-muted",
									children: "Facebook"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-2xl",
									children: "L'atelier de la séduction"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted",
									children: "Arrivages, pièces du jour, stories."
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl border border-line bg-sand lg:col-span-3 min-h-[420px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Carte — L'Atelier de la Séduction, Riviera-Bonoumin",
						src: site.mapEmbed,
						className: "h-full min-h-[420px] w-full border-0",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				})]
			})
		]
	});
}
//#endregion
export { ContactPage as component };
