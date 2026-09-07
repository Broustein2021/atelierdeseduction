import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-mKqPXrKx.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatCfa(amount) {
	return `${amount.toLocaleString("fr-FR")}\u00a0F CFA`;
}
//#endregion
export { formatCfa as n, cn as t };
