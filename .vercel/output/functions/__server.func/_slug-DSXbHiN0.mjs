import { i as __toESM } from "./_runtime.mjs";
import { n as fetchProductBySlugAdmin } from "./_ssr/products-C02qIZJU.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { H as notFound, S as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route$1 } from "./_ssr/router-nc0T7Vaq.mjs";
import { t as ProductForm } from "./_ssr/ProductForm-B5xVzQ9y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DSXbHiN0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditProductPage() {
	const { slug } = Route$1.useParams();
	const [product, setProduct] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		fetchProductBySlugAdmin(slug).then((p) => {
			if (!active) return;
			if (!p) {
				setError("notfound");
				return;
			}
			setProduct(p);
		}).catch((e) => {
			if (active) setError(e.message);
		}).finally(() => {
			if (active) setLoading(false);
		});
		return () => {
			active = false;
		};
	}, [slug]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-10 text-center text-muted",
		children: "Chargement…"
	});
	if (error === "notfound" || !product) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductForm, { product });
}
//#endregion
export { EditProductPage as component };
