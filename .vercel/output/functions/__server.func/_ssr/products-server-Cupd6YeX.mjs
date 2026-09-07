import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-server-Cupd6YeX.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var url = process.env.VITE_SUPABASE_URL;
var serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
function getSupabaseAdmin() {
	if (!url || !serviceRoleKey) throw new Error("Supabase server config missing — set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
	return createClient(url, serviceRoleKey, { auth: {
		autoRefreshToken: false,
		persistSession: false
	} });
}
var STORAGE_URL = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public`;
function resolveMediaPath(storagePath) {
	if (storagePath.startsWith("http")) return storagePath;
	if (storagePath.startsWith("/images/")) return storagePath;
	return `${STORAGE_URL}/${storagePath}`;
}
function toProduct(row) {
	const images = [...row.product_images ?? []].sort((a, b) => a.position - b.position).map((img) => resolveMediaPath(img.storage_path));
	const videos = (row.product_videos ?? []).sort((a, b) => a.position - b.position).map((v) => resolveMediaPath(v.storage_path));
	return {
		id: row.id,
		slug: row.slug,
		ref: row.ref ?? "",
		name: row.name,
		category: row.category ?? "ensembles",
		colors: row.colors ?? [],
		price: Number(row.price ?? 0),
		short: row.short ?? row.description ?? "",
		description: row.description ?? "",
		material: row.material ?? "",
		care: row.care ?? "",
		sizes: row.sizes ?? [],
		images,
		videos,
		isNew: row.is_new ?? false,
		featured: row.featured ?? false
	};
}
var SELECT_RELATIONS = "*, product_images(id, storage_path, position, is_cover), product_videos(id, storage_path, type, position)";
var getProducts_createServerFn_handler = createServerRpc({
	id: "7a1d53344a389af93085ddff6b42a66c92115fd2e84fca70296e8361cbfdbf7e",
	name: "getProducts",
	filename: "src/lib/products-server.ts"
}, (opts) => getProducts.__executeServer(opts));
var getProducts = createServerFn({ method: "GET" }).handler(getProducts_createServerFn_handler, async () => {
	const { data, error } = await getSupabaseAdmin().from("products").select(SELECT_RELATIONS).eq("is_published", true).order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return (data ?? []).map(toProduct);
});
var getProductBySlug_createServerFn_handler = createServerRpc({
	id: "7c68d60e1faa96a6f30f9bae02c86b57422fefba9842d59443a7e38930cc4994",
	name: "getProductBySlug",
	filename: "src/lib/products-server.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
var getProductBySlug = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getProductBySlug_createServerFn_handler, async ({ data: slug }) => {
	const { data, error } = await getSupabaseAdmin().from("products").select(SELECT_RELATIONS).eq("slug", slug).eq("is_published", true).maybeSingle();
	if (error) throw new Error(error.message);
	return data ? toProduct(data) : null;
});
//#endregion
export { getProductBySlug_createServerFn_handler, getProducts_createServerFn_handler };
