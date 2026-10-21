/**
 * Media URL resolution.
 *
 * `storage_path` (table `product_images` / `product_videos`) holds a value the
 * browser can load as-is:
 *   - a local static path -> `/images/products/ensemble-ivoire.jpg`
 *   - a Vercel Blob URL   -> `https://<store>.public.blob.vercel-storage.com/...`
 *
 * The Supabase bucket that used to back this app is gone (the project was
 * deleted), so there is no bucket left to rebuild a URL from. Keeping the
 * indirection in one place means a future CDN mapping only touches this file.
 */
export function resolveMediaPath(storagePath: string): string {
  return storagePath ?? "";
}
