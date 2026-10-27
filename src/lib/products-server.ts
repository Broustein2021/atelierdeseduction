import { createServerFn } from "@tanstack/react-start";
import type { CategoryId, ColorId, Product } from "@/data/products";
import { resolveMediaPath } from "@/lib/media";
import { adminMiddleware } from "@/lib/auth/admin-middleware";

/**
 * Catalogue data layer (server functions).
 *
 * Backed by the app's Postgres (Neon in production, embedded PGLite in the
 * local preview) through `@/lib/db` — the Supabase client that used to serve
 * this data is gone (the project was deleted), so every read and write now
 * goes through SQL.
 *
 * The schema lives in `migrations/0002_products.sql`.
 *
 * `@/lib/db` is imported DYNAMICALLY inside the handlers: this module is
 * reachable from client components (the admin UI calls the server functions
 * below), and `db.ts` pulls in `pg` + the migration SQL — neither belongs in
 * the browser bundle.
 */

export type ProductWithMedia = Product & {
  videos: string[];
  /** Storage path of the cover image, when one is flagged. */
  cover?: string | null;
};

/** A catalogue row, as returned by {@link SELECT_PRODUCTS}. */
type ProductRow = {
  id: string;
  name: string;
  slug: string;
  ref: string | null;
  category: string | null;
  price: string | number | null;
  short: string | null;
  description: string | null;
  material: string | null;
  care: string | null;
  sizes: string[] | null;
  colors: string[] | null;
  is_new: boolean;
  featured: boolean;
  images: string[];
  videos: string[];
  cover: string | null;
};

/** Payload accepted by {@link saveProduct}. */
export type ProductInput = {
  id?: string | null;
  name: string;
  slug: string;
  ref: string;
  category: string;
  price: number;
  short: string;
  description: string;
  material: string;
  care: string;
  colors: string[];
  sizes: string[];
  is_new: boolean;
  featured: boolean;
  is_published: boolean;
  images: { storagePath: string; isPrimary: boolean }[];
  videos: string[];
};

/** Products with their media, resolved in two lateral joins (no N+1). */
const SELECT_PRODUCTS = `
  select p.id, p.name, p.slug, p.ref, p.category, p.price, p.short,
         p.description, p.material, p.care, p.sizes, p.colors,
         p.is_new, p.featured,
         coalesce(i.paths, '[]'::json) as images,
         coalesce(v.paths, '[]'::json) as videos,
         i.cover as cover
  from catalogue_products p
  left join lateral (
    select json_agg(t.storage_path order by t.position, t.created_at) as paths,
           (select t2.storage_path from catalogue_product_images t2
             where t2.product_id = p.id and t2.is_cover
             order by t2.position limit 1) as cover
    from catalogue_product_images t where t.product_id = p.id
  ) i on true
  left join lateral (
    select json_agg(t.storage_path order by t.position, t.created_at) as paths
    from catalogue_product_videos t where t.product_id = p.id
  ) v on true
`;

/** The shared SQL client — server-only, imported lazily. */
async function db() {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

function toProduct(row: ProductRow): ProductWithMedia {
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
    images: (row.images ?? []).map(resolveMediaPath),
    videos: (row.videos ?? []).map(resolveMediaPath),
    isNew: row.is_new ?? false,
    featured: row.featured ?? false,
    cover: row.cover ?? null,
  };
}

/* ------------------------------------------------------------------ */
/* Public catalogue                                                    */
/* ------------------------------------------------------------------ */

/** Published products, newest first. */
export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await db();
    const rows = await sql.query<ProductRow>(
      `${SELECT_PRODUCTS} where p.is_published = true order by p.created_at desc`,
    );
    if (rows.length === 0) {
      const { products } = await import("@/data/products");
      return products.map((p) => ({
        ...p,
        videos: [],
        cover: null,
      }));
    }
    return rows.map(toProduct);
  } catch (err) {
    console.error("[getProducts] falling back to static data:", (err as any)?.message || err);
    const { products } = await import("@/data/products");
    return products.map((p) => ({
      ...p,
      videos: [],
      cover: null,
    }));
  }
});

/** Published products, newest first (server loader fallback). */
export async function getProductsSafe() {
  try {
    const { getProducts } = await import("@/lib/products-server");
    const res = await (getProducts as any)();
    if (Array.isArray(res) && res.length > 0) return res;
  } catch (err) {
    console.error("[getProductsSafe] error:", (err as any)?.message || err);
  }
  const { products } = await import("@/data/products");
  return products.map((p: any) => ({
    ...p,
    videos: [],
    cover: null,
  }));
}

/**
 * Published product slugs + last update, for `/sitemap.xml`.
 *
 * A plain function (not a server function) so the sitemap route can call it
 * directly, without a round trip through the server-function protocol.
 */
export async function listSitemapEntries(): Promise<
  { slug: string; lastmod: string }[]
> {
  const sql = await db();
  const rows = await sql.query<{ slug: string; updated_at: string | Date }>(
    "select slug, updated_at from catalogue_products where is_published = true",
  );
  return rows.map((row) => {
    const date =
      row.updated_at instanceof Date ? row.updated_at : new Date(row.updated_at);
    return {
      slug: row.slug,
      lastmod: Number.isNaN(date.getTime())
        ? ""
        : date.toISOString().slice(0, 10),
    };
  });
}

/** One published product by slug, or `null`. */
export const getProductBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const sql = await db();
      const rows = await sql.query<ProductRow>(
        `${SELECT_PRODUCTS} where p.slug = $1 and p.is_published = true limit 1`,
        [slug],
      );
      if (rows[0]) return toProduct(rows[0]);
    } catch (err) {
      console.error("[getProductBySlug] falling back to static data:", (err as any)?.message || err);
    }
    const { products } = await import("@/data/products");
    const p = products.find((x) => x.slug === slug);
    return p ? { ...p, videos: [], cover: null } : null;
  });

/* ------------------------------------------------------------------ */
/* Back office                                                         */
/* ------------------------------------------------------------------ */

/** Every product, published or not. Admin only. */
export const getAdminProducts = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const sql = await db();
    const rows = await sql.query<ProductRow>(
      `${SELECT_PRODUCTS} order by p.created_at desc`,
    );
    return rows.map(toProduct);
  });

/** One product by slug, published or not. Admin only. */
export const getAdminProductBySlug = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await db();
    const rows = await sql.query<ProductRow>(
      `${SELECT_PRODUCTS} where p.slug = $1 limit 1`,
      [slug],
    );
    return rows[0] ? toProduct(rows[0]) : null;
  });

/**
 * Create or update a product and its media. Admin only.
 *
 * Media are reconciled row by row: rows the form dropped are deleted, new ones
 * inserted, and every kept row gets its position and cover flag refreshed.
 */
export const saveProduct = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: ProductInput) => input)
  .handler(async ({ data: input }) => {
    const sql = await db();

    const name = (input.name ?? "").trim();
    const slug = (input.slug ?? "").trim();
    if (!name) throw new Error("Le nom de l'article est requis.");
    if (!slug) throw new Error("Le slug de l'article est requis.");
    const price = Number(input.price);
    if (!Number.isFinite(price) || price <= 0) {
      throw new Error("Le prix est requis et doit être supérieur à 0.");
    }

    const columns = [
      name,
      slug,
      (input.ref ?? "").trim() || slug.toUpperCase(),
      input.category ?? "ensembles",
      price,
      input.short ?? "",
      input.description ?? "",
      input.material ?? "",
      input.care ?? "",
      input.colors ?? [],
      input.sizes ?? [],
      Boolean(input.is_new),
      Boolean(input.featured),
      Boolean(input.is_published),
    ];

    const saved = input.id
      ? await sql.query<{ id: string; slug: string }>(
          `update catalogue_products
              set name = $1, slug = $2, ref = $3, category = $4, price = $5,
                  short = $6, description = $7, material = $8, care = $9,
                  colors = $10, sizes = $11, is_new = $12, featured = $13,
                  is_published = $14, updated_at = now()
            where id = $15
            returning id, slug`,
          [...columns, input.id],
        )
      : await sql.query<{ id: string; slug: string }>(
          `insert into catalogue_products
             (name, slug, ref, category, price, short, description, material,
              care, colors, sizes, is_new, featured, is_published)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
           returning id, slug`,
          columns,
        );

    const row = saved[0];
    if (!row) throw new Error("Enregistrement impossible.");

    const images = input.images ?? [];
    const videos = input.videos ?? [];

    // Media removed from the form.
    await sql.query(
      "delete from catalogue_product_images where product_id = $1 and not (storage_path = any($2::text[]))",
      [row.id, images.map((image) => image.storagePath)],
    );
    await sql.query(
      "delete from catalogue_product_videos where product_id = $1 and not (storage_path = any($2::text[]))",
      [row.id, videos],
    );

    // Media kept or added: insert the unknown ones, refresh order + cover.
    for (const [index, image] of images.entries()) {
      await sql.query(
        `insert into catalogue_product_images (product_id, storage_path, position, is_cover)
         select $1, $2, $3, $4
          where not exists (
            select 1 from catalogue_product_images
             where product_id = $1 and storage_path = $2
          )`,
        [row.id, image.storagePath, index, Boolean(image.isPrimary)],
      );
      await sql.query(
        "update catalogue_product_images set position = $1, is_cover = $2 where product_id = $3 and storage_path = $4",
        [index, Boolean(image.isPrimary), row.id, image.storagePath],
      );
    }

    for (const [index, video] of videos.entries()) {
      await sql.query(
        `insert into catalogue_product_videos (product_id, storage_path, position)
         select $1, $2, $3
          where not exists (
            select 1 from catalogue_product_videos
             where product_id = $1 and storage_path = $2
          )`,
        [row.id, video, index],
      );
      await sql.query(
        "update catalogue_product_videos set position = $1 where product_id = $2 and storage_path = $3",
        [index, row.id, video],
      );
    }

    return { id: row.id, slug: row.slug };
  });

/**
 * Delete a product, its media rows (cascaded) and its uploaded files.
 * Admin only.
 */
export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await db();
    // Read the media before the cascade drops the rows: uploaded files live in
    // Blob and would otherwise be orphaned (billed, never reachable).
    const media = await sql.query<{ storage_path: string }>(
      `select storage_path from catalogue_product_images where product_id = $1
       union all
       select storage_path from catalogue_product_videos where product_id = $1`,
      [id],
    );
    await sql.query("delete from catalogue_products where id = $1", [id]);

    const urls = media
      .map((row) => row.storage_path)
      .filter((path) => path.startsWith("https://"));
    if (urls.length > 0) {
      const { deleteBlob } = await import("@/lib/blob.server");
      await Promise.allSettled(urls.map((url) => deleteBlob(url)));
    }
    return { ok: true };
  });
