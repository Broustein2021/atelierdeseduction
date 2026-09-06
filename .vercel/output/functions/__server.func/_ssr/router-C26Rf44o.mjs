import { i as __toESM } from "../_runtime.mjs";
import { R as notFound, _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as Menu, n as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-C3a2AeTi.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatCfa(amount) {
	return `${amount.toLocaleString("fr-FR")}\u00a0F CFA`;
}
function WhatsAppIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.55-3.7 8.24-8.25 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29Z"
		})
	});
}
var site = {
	name: "L'Atelier de la Séduction",
	shortName: "AS",
	tagline: "Une pépite pour la beauté que tu es",
	city: "Abidjan",
	neighborhood: "Riviera-Bonoumin",
	addressLine: "Résidence RYAN, Riviera-Bonoumin",
	addressFull: "Résidence RYAN, Riviera-Bonoumin, Abidjan, Côte d'Ivoire",
	phoneDisplay: "01 40 24 22 21",
	phoneTel: "+2250140242221",
	whatsapp: "2250140242221",
	facebook: "https://www.facebook.com/people/Latelier-de-la-s%C3%A9duction/61587586820834/",
	hours: [
		{
			day: "Lundi",
			hours: "Fermé"
		},
		{
			day: "Mardi",
			hours: "10h — 19h"
		},
		{
			day: "Mercredi",
			hours: "10h — 19h"
		},
		{
			day: "Jeudi",
			hours: "10h — 19h"
		},
		{
			day: "Vendredi",
			hours: "10h — 19h"
		},
		{
			day: "Samedi",
			hours: "10h — 19h"
		},
		{
			day: "Dimanche",
			hours: "Sur rendez-vous"
		}
	],
	mapEmbed: "https://maps.google.com/maps?q=Riviera%20Bonoumin%20Residence%20Ryan%20Abidjan&t=&z=15&ie=UTF8&iwloc=&output=embed",
	mapLink: "https://www.google.com/maps/search/?api=1&query=Riviera+Bonoumin+Residence+Ryan+Abidjan"
};
function waUrl(text) {
	return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
var generalInquiryText = "Bonjour, je vous contacte depuis le site L'Atelier de la Séduction. J'aimerais des informations sur vos pièces.";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/products-DfYhp7KZ.js
var categories = [
	{
		id: "ensembles",
		label: "Ensembles"
	},
	{
		id: "nuisettes",
		label: "Nuisettes"
	},
	{
		id: "bodies",
		label: "Bodies"
	},
	{
		id: "dessous",
		label: "Dessous"
	},
	{
		id: "nuit",
		label: "Nuit & lounge"
	}
];
var colors = [
	{
		id: "ivoire",
		label: "Ivoire",
		swatch: "#F3E6D8"
	},
	{
		id: "rose",
		label: "Rose",
		swatch: "#E4B7B0"
	},
	{
		id: "bordeaux",
		label: "Bordeaux",
		swatch: "#7A2E3A"
	},
	{
		id: "noir",
		label: "Noir",
		swatch: "#1F1A19"
	},
	{
		id: "nude",
		label: "Nude",
		swatch: "#C4A484"
	}
];
var products = [
	{
		id: "pepite-rose",
		slug: "ensemble-pepite-rose",
		ref: "AS-PEP-R",
		name: "Ensemble Pépite Rose",
		category: "ensembles",
		colors: ["rose"],
		price: 18e3,
		short: "Trois pièces en dentelle florale, photo sans retouche.",
		description: "La pépite de l'atelier, telle que photographiée en boutique. Un ensemble trois pièces en dentelle florale rose — soutien-gorge, culotte et porte-jarretelles — pensé pour célébrer la silhouette sans artifice. Toutes nos photos sont sans retouches.",
		material: "Dentelle florale stretch, tulle, élastiques recouverts",
		care: "Lavage à la main, séchage à plat, ne pas tordre",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		images: ["/images/products/ensemble-pepite-rose.jpg", "/images/products/ensemble-rose.jpg"],
		isNew: true,
		featured: true
	},
	{
		id: "dentelle-ivoire",
		slug: "ensemble-dentelle-ivoire",
		ref: "AS-DEN-IV",
		name: "Ensemble Dentelle Ivoire",
		category: "ensembles",
		colors: ["ivoire"],
		price: 18e3,
		short: "Dentelle ivoire, ruban soie, la lumière du matin.",
		description: "Un deux-pièces ivoire en dentelle fine, posé comme une pièce de joaillerie. Le soutien-gorge et la culotte assortie épousent la peau sans la contraindre — une base précieuse pour le quotidien comme pour la soirée.",
		material: "Dentelle de Calais-style, tulle stretch, finitions satin",
		care: "Lavage délicat à la main, séchage à l'ombre",
		sizes: [
			"S",
			"M",
			"L",
			"XL",
			"XXL"
		],
		images: ["/images/products/ensemble-ivoire.jpg"],
		isNew: true,
		featured: true
	},
	{
		id: "dentelle-rose",
		slug: "ensemble-dentelle-rose",
		ref: "AS-DEN-RS",
		name: "Ensemble Dentelle Rose",
		category: "ensembles",
		colors: ["rose"],
		price: 18e3,
		short: "Rose poussière, chaîne d'or, dentelle florale.",
		description: "Le rose de l'atelier — ni flashy, ni pâle. Une dentelle florale posée sur soie blush, pour celles qui veulent une couleur douce mais présente. Disponible aussi en ivoire.",
		material: "Dentelle florale, tulle, élastiques satinés",
		care: "Lavage à la main, éviter le sèche-linge",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		images: ["/images/products/ensemble-rose.jpg", "/images/products/ensemble-pepite-rose.jpg"],
		isNew: true
	},
	{
		id: "camisole-bordeaux",
		slug: "camisole-soie-bordeaux",
		ref: "AS-CAM-BX",
		name: "Camisole Soie Bordeaux",
		category: "nuit",
		colors: ["bordeaux"],
		price: 22e3,
		short: "Soie bordeaux, short assorti, chute de lumière.",
		description: "Une camisole en soie bordeaux et son short assorti. Le tombé est liquide, la couleur celle de la robe maille de la boutique. À porter pour soi, le soir, ou sous une veste le dimanche.",
		material: "Satin de soie, bretelles réglables, coutures françaises",
		care: "Lavage à la main à l'eau froide, fer doux sur l'envers",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		images: ["/images/products/camisole-bordeaux.jpg"],
		featured: true
	},
	{
		id: "nuisette-ivoire",
		slug: "nuisette-soie-ivoire",
		ref: "AS-NUI-IV",
		name: "Nuisette Soie Ivoire",
		category: "nuisettes",
		colors: ["ivoire"],
		price: 25e3,
		short: "Longue nuisette ivoire, cintre or, mur d'atelier.",
		description: "Une nuisette longue en soie ivoire, photographiée sur cintre dans l'esprit de l'atelier. Le tissu prend la lumière, la longueur allonge la silhouette. Une pièce de nuit qui se suffit à elle-même.",
		material: "Satin de soie, bretelles spaghetti, fente discrète",
		care: "Lavage à la main, séchage à plat",
		sizes: [
			"S",
			"M",
			"L",
			"XL",
			"XXL"
		],
		images: ["/images/products/nuisette-ivoire.jpg"],
		featured: true
	},
	{
		id: "body-noir",
		slug: "body-dentelle-noir",
		ref: "AS-BDY-NR",
		name: "Body Dentelle Noir",
		category: "bodies",
		colors: ["noir"],
		price: 2e4,
		short: "Dentelle noire, dessin floral, présence nette.",
		description: "Le body noir de l'atelier : dentelle florale, encolure travaillée, bas second peau. Une pièce unique qui remplace l'ensemble quand on veut une ligne continue. À porter sous une chemise, ou pour soi.",
		material: "Dentelle stretch, tulle, pressions à l'entrejambe",
		care: "Lavage à la main, ne pas essorer",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		images: ["/images/products/body-noir.jpg"]
	},
	{
		id: "ensemble-nude",
		slug: "ensemble-nude-cachemire",
		ref: "AS-NUD-CA",
		name: "Ensemble Nude Cachemire",
		category: "ensembles",
		colors: ["nude"],
		price: 16e3,
		short: "Nude chaud, dentelle, le teint plutôt que la mode.",
		description: "Un nude pensé pour les carnations chaudes — pas un beige froid. Dentelle et tulle, culotte taille haute, soutien-gorge qui disparaît sous les vêtements clairs. La pièce de fond de dressing.",
		material: "Dentelle stretch, tulle, microfibre",
		care: "Lavage délicat, séchage à l'ombre",
		sizes: [
			"S",
			"M",
			"L",
			"XL",
			"XXL"
		],
		images: ["/images/products/ensemble-nude.jpg"]
	},
	{
		id: "nuisette-bordeaux",
		slug: "nuisette-satin-bordeaux",
		ref: "AS-NUI-BX",
		name: "Nuisette Satin Bordeaux",
		category: "nuisettes",
		colors: ["bordeaux"],
		price: 24e3,
		short: "Satin bordeaux, vanity de marbre, parfum d'atelier.",
		description: "Une nuisette courte en satin bordeaux, le tombé d'une robe du soir en plus intime. La couleur signature de la boutique — celle de la maille côtelée portée en magasin.",
		material: "Satin, bretelles réglables, ourlet biais",
		care: "Lavage à la main, fer doux",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		images: ["/images/products/nuisette-bordeaux.jpg"],
		isNew: true
	},
	{
		id: "soutien-ivoire",
		slug: "soutien-gorge-dentelle-ivoire",
		ref: "AS-SG-IV",
		name: "Soutien-gorge Dentelle Ivoire",
		category: "dessous",
		colors: ["ivoire"],
		price: 12e3,
		short: "Armatures légères, dentelle ivoire, brin de gypsophile.",
		description: "Un soutien-gorge à armatures en dentelle ivoire, bonnets dessinés pour tenir sans comprimer. Se porte avec la culotte assortie de l'ensemble dentelle, ou seul sous une chemise ouverte.",
		material: "Dentelle, tulle, armatures enrobées, dos double crochet",
		care: "Lavage à la main, crochets fermés",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		images: ["/images/products/soutien-ivoire.jpg"]
	},
	{
		id: "trois-pieces",
		slug: "ensemble-trois-pieces-nuit",
		ref: "AS-3P-NT",
		name: "Ensemble Trois Pièces Nuit",
		category: "ensembles",
		colors: ["ivoire", "bordeaux"],
		price: 28e3,
		short: "Soutien-gorge, culotte, porte-jarretelles — ivoire et bordeaux.",
		description: "L'ensemble complet de l'atelier : trois pièces en dentelle ivoire soulignée de bordeaux. Pour une soirée, une lune de miel, ou simplement le plaisir de s'habiller pour soi. Quantités limitées.",
		material: "Dentelle, tulle, jarretelles amovibles, finitions satin",
		care: "Lavage à la main pièce par pièce",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		images: ["/images/products/ensemble-trois-pieces.jpg"],
		isNew: true,
		featured: true
	},
	{
		id: "peignoir-ivoire",
		slug: "peignoir-soie-ivoire",
		ref: "AS-PEG-IV",
		name: "Peignoir Soie Ivoire",
		category: "nuit",
		colors: ["ivoire"],
		price: 32e3,
		short: "Long peignoir de soie, ceinture, fauteuil d'atelier.",
		description: "Le peignoir long en soie ivoire — la pièce qui ferme une tenue de nuit, ou s'ouvre sur rien. Tombé ample, ceinture à nouer, manches qui bougent avec le geste. Une présence dans la chambre.",
		material: "Satin de soie, ceinture assortie, poches invisibles",
		care: "Lavage à la main, fer doux sur l'envers",
		sizes: [
			"S",
			"M",
			"L",
			"XL",
			"XXL"
		],
		images: ["/images/products/peignoir-ivoire.jpg"],
		featured: true
	}
];
var categoryLabel = {
	ensembles: "Ensembles",
	nuisettes: "Nuisettes",
	bodies: "Bodies",
	dessous: "Dessous",
	nuit: "Nuit & lounge"
};
var colorLabel = {
	ivoire: "Ivoire",
	rose: "Rose",
	bordeaux: "Bordeaux",
	noir: "Noir",
	nude: "Nude"
};
function getProduct(slug) {
	return products.find((p) => p.slug === slug);
}
function relatedProducts(product, limit = 4) {
	const same = products.filter((p) => p.id !== product.id && p.category === product.category);
	const rest = products.filter((p) => p.id !== product.id && p.category !== product.category);
	return [...same, ...rest].slice(0, limit);
}
function featuredProducts() {
	return products.filter((p) => p.featured);
}
function productMessage(product, opts) {
	const parts = [`Bonjour, je suis intéressée par ${product.name} (Réf: ${product.ref})`];
	if (opts?.color) parts.push(`couleur ${opts.color}`);
	if (opts?.size) parts.push(`taille ${opts.size}`);
	const extra = opts?.color || opts?.size ? ` — ${parts.slice(1).join(", ")}` : "";
	return `${parts[0]}${extra}. Pouvez-vous me confirmer la disponibilité et le mode de paiement ?`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-C26Rf44o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
function Monogram({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 92 52",
		className: cn("text-current", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 8 L26 16 L22 16.8 L30 44 H24.2 L22.4 36.6 H11.6 L9.8 44 H4 L16.2 8 H22 Z M12.9 31.6 H21.1 L17 16.2 H16.9 L12.9 31.6 Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M36 14 C36 14 29.5 24.5 29.5 31.2 C29.5 35.8 32.4 38.8 36 38.8 C39.6 38.8 42.5 35.8 42.5 31.2 C42.5 24.5 36 14 36 14 Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 4.2 L24.4 8.6 L22 13 L19.6 8.6 Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M58 16.2 C64.6 16.2 69 19.8 69 25.2 C69 29.2 66.4 31.6 61.8 32.8 L69.6 44 H63.2 L56.2 33.4 H52.4 V44 H47 V8.4 H58 Z M52.4 16.2 V28.4 H57.4 C61.1 28.4 63.4 27 63.4 24.2 C63.4 21.4 61.1 16.2 57.2 16.2 H52.4 Z",
				fill: "currentColor"
			})
		]
	});
}
function Logo({ className, stacked = false, to = "/" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("group flex items-center gap-3.5 text-ink no-underline", stacked && "flex-col gap-1", className),
		"aria-label": "L'Atelier de la Séduction — accueil",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, { className: cn(stacked ? "h-12 w-20" : "h-9 w-16") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("font-display tracking-[0.18em] uppercase text-ink", stacked ? "text-center text-[10px]" : "hidden leading-none sm:flex sm:flex-col sm:gap-0.5"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "whitespace-nowrap",
				children: "L'Atelier"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block whitespace-nowrap text-[9px] tracking-[0.22em] text-muted",
				children: "de la Séduction"
			})]
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-burgundy text-paper hover:bg-burgundy-deep",
			inverse: "bg-paper text-ink hover:bg-sand",
			outline: "border border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-paper",
			ghost: "text-ink hover:bg-sand",
			whatsapp: "bg-wa text-paper hover:bg-wa/90"
		},
		size: {
			sm: "h-10 rounded-md px-4 text-xs tracking-wide",
			md: "h-12 rounded-md px-5 text-sm tracking-wide",
			lg: "h-14 rounded-lg px-7 text-sm tracking-[0.12em] uppercase",
			icon: "size-12 rounded-full"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { stacked: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-ink",
				children: "Page introuvable"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-muted",
				children: "Cette adresse ne correspond à aucune page de l'atelier. Revenez à l'accueil ou parcourez la boutique."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Retour à l'accueil"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/boutique",
						children: "Voir la boutique"
					})
				})]
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line bg-ink text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "text-paper [&_span]:text-paper [&_.text-muted]:text-rose" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 max-w-sm font-display text-2xl leading-snug text-paper/90",
							children: [site.tagline, "."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm text-sm leading-relaxed text-paper/60",
							children: "Lingerie choisie à Abidjan. Photos et vidéos sans retouches. Commande et paiement uniquement sur WhatsApp."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.2em] uppercase text-rose",
					children: "Visiter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-paper/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/boutique",
							className: "hover:text-paper",
							children: "Boutique"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/a-propos",
							className: "hover:text-paper",
							children: "L'Atelier"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hover:text-paper",
							children: "Contact & plan"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guide-tailles",
							className: "hover:text-paper",
							children: "Guide des tailles"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.2em] uppercase text-rose",
					children: "Atelier"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-paper/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: site.addressLine }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Abidjan, Côte d'Ivoire" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${site.phoneTel}`,
							className: "hover:text-paper",
							children: site.phoneDisplay
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waUrl(generalInquiryText),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-1.5 hover:text-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-3.5" }), "WhatsApp"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: site.facebook,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hover:text-paper",
							children: "Facebook"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					site.name
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Paiement et livraison confirmés sur WhatsApp" })]
			})
		})]
	});
}
var nav = [
	{
		to: "/boutique",
		label: "Boutique"
	},
	{
		to: "/a-propos",
		label: "L'Atelier"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("sticky top-0 z-40 transition-colors duration-200", scrolled || open ? "border-b border-line bg-cream/95 backdrop-blur-md" : "border-b border-transparent bg-cream"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 md:flex",
					"aria-label": "Principal",
					children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("text-[13px] tracking-[0.16em] uppercase transition-colors", pathname === item.to || item.to === "/boutique" && pathname.startsWith("/produit") || item.to !== "/boutique" && pathname.startsWith(item.to) ? "text-burgundy" : "text-ink-soft hover:text-ink"),
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: "whatsapp",
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waUrl(generalInquiryText),
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-3.5" }), "WhatsApp"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex size-11 items-center justify-center rounded-md text-ink md:hidden",
						"aria-expanded": open,
						"aria-label": open ? "Fermer le menu" : "Ouvrir le menu",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line bg-cream md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col px-4 py-4",
				"aria-label": "Mobile",
				children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: "flex h-12 items-center border-b border-line/70 text-sm tracking-[0.14em] uppercase text-ink",
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: waUrl(generalInquiryText),
					target: "_blank",
					rel: "noopener noreferrer",
					className: "mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-wa text-sm text-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4" }), "Écrire sur WhatsApp"]
				})]
			})
		}) : null]
	});
}
function WhatsAppFloat() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: waUrl(generalInquiryText),
		target: "_blank",
		rel: "noopener noreferrer",
		className: "fixed bottom-5 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-wa text-paper shadow-soft transition-transform duration-200 hover:scale-105 sm:bottom-7 sm:right-6",
		"aria-label": "Écrire sur WhatsApp",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-7" })
	});
}
function Shell() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col overflow-x-hidden bg-cream text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 pb-20 sm:pb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFloat, {})
		]
	});
}
var styles_default = "/assets/styles-kDJ9Gyoy.css";
var APP_NAME = "L'Atelier de la Séduction";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Lingerie féminine à Abidjan — Riviera-Bonoumin. Photos sans retouches. Commandez sur WhatsApp."
			},
			{
				name: "theme-color",
				content: "#7A2E3A"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Outfit:wght@300;400;500;600&display=swap"
			}
		]
	}),
	notFoundComponent: NotFound,
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-svh bg-cream font-sans text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$5 = () => import("./routes-D3vcH6Ir.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./a-propos-D5L7kp7s.mjs");
var Route$4 = createFileRoute("/a-propos")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./boutique-BEehME8j.mjs");
function truthyParam(v) {
	if (v === true || v === "true" || v === "1" || v === 1) return true;
}
var Route$3 = createFileRoute("/boutique")({
	validateSearch: (s) => ({
		cat: categories.some((c) => c.id === s.cat) ? s.cat : void 0,
		couleur: colors.some((c) => c.id === s.couleur) ? s.couleur : void 0,
		nouveau: truthyParam(s.nouveau)
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./contact-DetE3-Zk.mjs");
var Route$2 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./guide-tailles-CToDtISx.mjs");
var Route$1 = createFileRoute("/guide-tailles")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./produit._slug-BYkd4dRY.mjs");
var Route = createFileRoute("/produit/$slug")({
	loader: ({ params }) => {
		const product = getProduct(params.slug);
		if (!product) throw notFound();
		return {
			product,
			related: relatedProducts(product)
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	AProposRoute: Route$4.update({
		id: "/a-propos",
		path: "/a-propos",
		getParentRoute: () => Route$6
	}),
	BoutiqueRoute: Route$3.update({
		id: "/boutique",
		path: "/boutique",
		getParentRoute: () => Route$6
	}),
	ContactRoute: Route$2.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$6
	}),
	GuideTaillesRoute: Route$1.update({
		id: "/guide-tailles",
		path: "/guide-tailles",
		getParentRoute: () => Route$6
	}),
	ProduitSlugRoute: Route.update({
		id: "/produit/$slug",
		path: "/produit/$slug",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound
	});
}
//#endregion
export { generalInquiryText as _, Logo as a, categoryLabel as c, featuredProducts as d, productMessage as f, formatCfa as g, cn as h, Button as i, colorLabel as l, WhatsAppIcon as m, Route as n, Monogram as o, products as p, Route$3 as r, categories as s, router_exports as t, colors as u, site as v, waUrl as y };
