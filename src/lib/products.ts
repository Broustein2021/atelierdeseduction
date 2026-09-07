import type { Database } from "@/lib/supabase-types";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import type {
  CategoryId,
  ColorId,
  Product,
} from "@/data/products";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ImageRow = Database["public"]["Tables"]["product_images"]["Row"];
type VideoRow = Database["public"]["Tables"]["product_videos"]["Row"];

export type ProductWithMedia = Product & {
  images: string[];
  videos: string[];
};

export const STORAGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public`;

/** Resolve a storage_path (either /images/... local, or a bucket path) to a usable URL or path. */
export function resolveMediaPath(storagePath: string): string {
  if (storagePath.startsWith("http")) return storagePath;
  if (storagePath.startsWith("/images/")) return storagePath; // local static asset
  // otherwise it's a storage bucket path like product-images/file.jpg or videos/...
  return `${STORAGE_URL}/${storagePath}`;
}

export async function fetchProducts(): Promise<ProductWithMedia[]> {
  const supabase = getSupabaseBrowser();
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(id, storage_path, position, is_cover), product_videos(id, storage_path, type, position)")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map(toProduct);
}

export async function fetchAllProducts(): Promise<ProductWithMedia[]> {
  const supabase = getSupabaseBrowser();
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(id, storage_path, position, is_cover), product_videos(id, storage_path, type, position)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map(toProduct);
}

export async function fetchProductBySlug(slug: string): Promise<ProductWithMedia | null> {
  const supabase = getSupabaseBrowser();
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(id, storage_path, position, is_cover), product_videos(id, storage_path, type, position)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? toProduct(data) : null;
}

export async function fetchProductBySlugAdmin(slug: string): Promise<ProductWithMedia | null> {
  const supabase = getSupabaseBrowser();
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(id, storage_path, position, is_cover), product_videos(id, storage_path, type, position)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? toProduct(data) : null;
}

function toProduct(row: ProductRow & {
  product_images?: ImageRow[];
  product_videos?: VideoRow[];
}): ProductWithMedia {
  // Return RAW storage paths so admin forms can round-trip them unmodified.
  // Display code calls resolveMediaPath() explicitly.
  const images = [...(row.product_images ?? [])]
    .sort((a, b) => a.position - b.position)
    .map((img) => img.storage_path);

  const videos = (row.product_videos ?? [])
    .sort((a, b) => a.position - b.position)
    .map((v) => v.storage_path);

  return {
    id: row.id,
    slug: row.slug,
    ref: row.ref ?? "",
    name: row.name,
    category: (row.category ?? "ensembles") as CategoryId,
    colors: (row.colors ?? []) as ColorId[],
    price: Number(row.price ?? 0),
    short: row.short ?? row.description ?? "",
    description: row.description ?? "",
    material: row.material ?? "",
    care: row.care ?? "",
    sizes: (row.sizes ?? []) as string[],
    images: images.length > 0 ? images : ["/images/products/fallback.jpg"],
    videos,
    isNew: row.is_new ?? false,
    featured: row.featured ?? false,
  };
}

