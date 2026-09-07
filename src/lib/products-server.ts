import { createServerFn } from "@tanstack/react-start";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import type { Database } from "@/lib/supabase-types";
import type { CategoryId, ColorId, Product } from "@/data/products";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ImageRow = Database["public"]["Tables"]["product_images"]["Row"];
type VideoRow = Database["public"]["Tables"]["product_videos"]["Row"];

export type ProductWithMedia = Product & {
  videos: string[];
};

const STORAGE_URL = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public`;

function resolveMediaPath(storagePath: string): string {
  if (storagePath.startsWith("http")) return storagePath;
  if (storagePath.startsWith("/images/")) return storagePath;
  return `${STORAGE_URL}/${storagePath}`;
}

function toProduct(
  row: ProductRow & {
    product_images?: ImageRow[];
    product_videos?: VideoRow[];
  },
): ProductWithMedia {
  const images = [...(row.product_images ?? [])]
    .sort((a, b) => a.position - b.position)
    .map((img) => resolveMediaPath(img.storage_path));

  const videos = (row.product_videos ?? [])
    .sort((a, b) => a.position - b.position)
    .map((v) => resolveMediaPath(v.storage_path));

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
    images,
    videos,
    isNew: row.is_new ?? false,
    featured: row.featured ?? false,
  };
}

const SELECT_RELATIONS =
  "*, product_images(id, storage_path, position, is_cover), product_videos(id, storage_path, type, position)";

export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select(SELECT_RELATIONS)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toProduct);
});

export const getProductBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("products")
      .select(SELECT_RELATIONS)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data ? toProduct(data) : null;
  });
