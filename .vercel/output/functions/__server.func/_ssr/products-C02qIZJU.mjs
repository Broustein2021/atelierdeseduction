import { t as getSupabaseBrowser } from "./supabase-browser-CscVNh-D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-C02qIZJU.js
var STORAGE_URL = `https://hdjouqmlnginsxgijhcy.supabase.co/storage/v1/object/public`;
/** Resolve a storage_path (either /images/... local, or a bucket path) to a usable URL or path. */
function resolveMediaPath(storagePath) {
	if (storagePath.startsWith("http")) return storagePath;
	if (storagePath.startsWith("/images/")) return storagePath;
	return `${STORAGE_URL}/${storagePath}`;
}
async function fetchAllProducts() {
	const { data, error } = await getSupabaseBrowser().from("products").select("*, product_images(id, storage_path, position, is_cover), product_videos(id, storage_path, type, position)").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return (data ?? []).map(toProduct);
}
async function fetchProductBySlugAdmin(slug) {
	const { data, error } = await getSupabaseBrowser().from("products").select("*, product_images(id, storage_path, position, is_cover), product_videos(id, storage_path, type, position)").eq("slug", slug).maybeSingle();
	if (error) throw new Error(error.message);
	return data ? toProduct(data) : null;
}
function toProduct(row) {
	const images = [...row.product_images ?? []].sort((a, b) => a.position - b.position).map((img) => img.storage_path);
	const videos = (row.product_videos ?? []).sort((a, b) => a.position - b.position).map((v) => v.storage_path);
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
		images: images.length > 0 ? images : ["/images/products/fallback.jpg"],
		videos,
		isNew: row.is_new ?? false,
		featured: row.featured ?? false
	};
}
//#endregion
export { fetchProductBySlugAdmin as n, resolveMediaPath as r, fetchAllProducts as t };
