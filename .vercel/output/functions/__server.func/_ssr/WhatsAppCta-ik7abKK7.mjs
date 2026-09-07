import { t as cn } from "./utils-mKqPXrKx.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as productMessage, c as waUrl, l as WhatsAppIcon, o as generalInquiryText, u as Button } from "./router-nc0T7Vaq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/WhatsAppCta-ik7abKK7.js
var import_jsx_runtime = require_jsx_runtime();
function WhatsAppCta({ product, size, color, label = "Commander sur WhatsApp", className, variant = "whatsapp", ctaSize = "lg" }) {
	const href = waUrl(product ? productMessage(product, {
		size,
		color
	}) : generalInquiryText);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant,
		size: ctaSize,
		className: cn("w-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href,
			target: "_blank",
			rel: "noopener noreferrer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4" }), label]
		})
	});
}
//#endregion
export { WhatsAppCta as t };
