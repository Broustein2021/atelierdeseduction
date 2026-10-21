import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { products } from "../src/data/products.ts";

/**
 * Seed the catalogue into Neon (or any Postgres reached through DATABASE_URL).
 *
 * Applies the pending `migrations/*.sql` files first (same bookkeeping as
 * `scripts/migrate.mjs`), then inserts every product from
 * `src/data/products.ts` — the source of truth for the 11 reference pieces —
 * along with its image rows.
 *
 * INSERT-ONLY: a slug that already exists is left untouched, so the back
 * office always wins over the reference file (an owner who renamed a product
 * or swapped a photo keeps their version across deploys). Set
 * `SEED_OVERWRITE=true` to force the reference catalogue back over the top.
 *
 * Usage:
 *   DATABASE_URL=postgresql://... node --experimental-strip-types scripts/seed-neon.ts
 */

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  console.error("[seed] DATABASE_URL is required.");
  process.exit(1);
}

const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "migrations",
);

async function applyMigrations(client: pg.PoolClient) {
  let entries: string[];
  try {
    entries = await readdir(migrationsDir);
  } catch {
    return;
  }

  await client.query(
    "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
  );
  const applied = new Set(
    (await client.query("SELECT name FROM _migrations")).rows.map((r) => r.name),
  );

  const pending = entries
    .filter((name) => name.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b))
    .filter((name) => !applied.has(name));

  for (const name of pending) {
    const text = await readFile(join(migrationsDir, name), "utf8");
    try {
      await client.query("BEGIN");
      await client.query(text);
      await client.query("INSERT INTO _migrations (name) VALUES ($1)", [name]);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK").catch(() => undefined);
      throw err;
    }
    console.log(`[seed] applied ${name}`);
  }
}

async function main() {
  const pool = new pg.Pool({ connectionString: databaseUrl, max: 1 });
  const client = await pool.connect();
  try {
    await applyMigrations(client);

    const overwrite = process.env.SEED_OVERWRITE === "true";
    let inserted = 0;
    let skipped = 0;

    for (const product of products) {
      const existing = await client.query<{ id: string }>(
        "select id from catalogue_products where slug = $1 limit 1",
        [product.slug],
      );
      if (existing.rows.length > 0 && !overwrite) {
        skipped += 1;
        continue;
      }

      const { rows } = await client.query<{ id: string }>(
        `insert into catalogue_products
           (name, slug, ref, category, price, short, description, material,
            care, sizes, colors, images, is_new, featured, is_published)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, $13, $14, true)
         on conflict (slug) do update set
           name = excluded.name,
           ref = excluded.ref,
           category = excluded.category,
           price = excluded.price,
           short = excluded.short,
           description = excluded.description,
           material = excluded.material,
           care = excluded.care,
           sizes = excluded.sizes,
           colors = excluded.colors,
           images = excluded.images,
           is_new = excluded.is_new,
           featured = excluded.featured,
           is_published = true,
           updated_at = now()
         returning id`,
        [
          product.name,
          product.slug,
          product.ref,
          product.category,
          product.price,
          product.short,
          product.description,
          product.material,
          product.care,
          product.sizes,
          product.colors,
          JSON.stringify(product.images),
          product.isNew ?? false,
          product.featured ?? false,
        ],
      );
      const id = rows[0].id;

      // Images: the first one is the cover.
      await client.query("delete from catalogue_product_images where product_id = $1", [id]);
      for (const [position, storagePath] of product.images.entries()) {
        await client.query(
          `insert into catalogue_product_images (product_id, storage_path, position, is_cover)
           values ($1, $2, $3, $4)`,
          [id, storagePath, position, position === 0],
        );
      }

      inserted += 1;
      console.log(`[seed] ${product.name}`);
    }
    console.log(
      `[seed] done — ${inserted} inserted, ${skipped} left untouched (${products.length} in the reference catalogue).`,
    );
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("[seed] failed:", err?.message || err);
  process.exit(1);
});
