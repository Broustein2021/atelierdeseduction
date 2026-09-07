import { createClient } from "@supabase/supabase-js";
import { products } from "../src/data/products.ts";

const url = process.env.VITE_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function backfillImages() {
  for (const p of products) {
    const { data: product } = await supabase
      .from("products")
      .select("id, slug")
      .eq("slug", p.slug)
      .single();
    if (!product) {
      console.error(`Product not found: ${p.slug}`);
      continue;
    }

    const { data: existing } = await supabase
      .from("product_images")
      .select("id")
      .eq("product_id", product.id);
    if (existing && existing.length > 0) {
      console.log(`Images already exist for ${p.slug} — skipping.`);
      continue;
    }

    for (let i = 0; i < p.images.length; i++) {
      const { error } = await supabase.from("product_images").insert({
        product_id: product.id,
        storage_path: p.images[i],
        position: i,
        is_cover: i === 0,
      });
      if (error) console.error(`Image insert failed for ${p.slug}:`, error.message);
    }
    console.log(`Images backfilled: ${p.slug} (${p.images.length})`);
  }
  console.log("Backfill complete.");
}

backfillImages().catch((e) => {
  console.error(e);
  process.exit(1);
});