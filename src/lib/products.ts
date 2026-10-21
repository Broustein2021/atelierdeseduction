import {
  deleteProduct as deleteProductServer,
  getAdminProductBySlug,
  getAdminProducts,
  saveProduct as saveProductServer,
  type ProductInput,
  type ProductWithMedia,
} from "@/lib/products-server";

export type { ProductInput, ProductWithMedia };
export { resolveMediaPath } from "@/lib/media";

/**
 * Catalogue access for the back office (browser side).
 *
 * The Supabase browser client is gone: the catalogue now lives in the app's
 * Postgres and is reached through the server functions in
 * `@/lib/products-server`, which enforce the admin check server-side.
 */

/** Every product, published or not. */
export async function fetchAllProducts(): Promise<ProductWithMedia[]> {
  return getAdminProducts();
}

/** One product by slug, published or not. */
export async function fetchProductBySlugAdmin(
  slug: string,
): Promise<ProductWithMedia | null> {
  return getAdminProductBySlug({ data: slug });
}

/** Create or update a product and its media. */
export async function saveProductAction(
  input: ProductInput,
): Promise<{ id: string; slug: string }> {
  return saveProductServer({ data: input });
}

/** Delete a product and its media. */
export async function deleteProductAction(id: string): Promise<void> {
  await deleteProductServer({ data: id });
}
