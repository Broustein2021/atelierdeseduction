import { createClient } from "@supabase/supabase-js";
import { products } from "../src/data/products.ts";

const url = process.env.VITE_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seed() {
  const { data: existing } = await supabase.from("products").select("id").limit(1);
  if (existing && existing.length > 0) {
    console.log("Products already exist — skipping seed.");
    return;
  }

  for (const p of products) {
    const row = {
      name: p.name,
      slug: p.slug,
      ref: p.ref,
      category: p.category,
      colors: p.colors,
      price: p.price,
      short: p.short,
      description: p.description,
      material: p.material,
      care: p.care,
      sizes: p.sizes,
      is_new: p.isNew ?? false,
      featured: p.featured ?? false,
      is_published: true,
    };

    const { data: product, error } = await supabase
      .from("products")
      .insert(row)
      .select()
      .single();

    if (error) {
      console.error(`Failed to insert ${p.name}:`, error.message);
      continue;
    }

    for (let i = 0; i < p.images.length; i++) {
      const { error: imgErr } = await supabase.from("product_images").insert({
        product_id: product.id,
        storage_path: p.images[i],
        position: i,
        is_cover: i === 0,
      });
      if (imgErr) console.error(`Image insert failed for ${p.name}:`, imgErr.message);
    }
    console.log(`Seeded: ${p.name}`);
  }
  console.log("Seed complete.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});