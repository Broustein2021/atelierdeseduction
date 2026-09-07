import { Client } from "pg";

const password = process.env.SUPABASE_DB_PASSWORD!;

const client = new Client({
  host: "aws-0-eu-central-1.pooler.supabase.com",
  port: 5432,
  user: "postgres.hdjouqmlnginsxgijhcy",
  password,
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

const sql = `
-- RLS policies: public read, authenticated write
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_videos enable row level security;

drop policy if exists "public_read_products" on public.products;
create policy "public_read_products" on public.products
  for select using (true);

drop policy if exists "admin_write_products" on public.products;
create policy "admin_write_products" on public.products
  for all to authenticated using (true) with check (true);

drop policy if exists "public_read_product_images" on public.product_images;
create policy "public_read_product_images" on public.product_images
  for select using (true);

drop policy if exists "admin_write_product_images" on public.product_images;
create policy "admin_write_product_images" on public.product_images
  for all to authenticated using (true) with check (true);

drop policy if exists "public_read_product_videos" on public.product_videos;
create policy "public_read_product_videos" on public.product_videos
  for select using (true);

drop policy if exists "admin_write_product_videos" on public.product_videos;
create policy "admin_write_product_videos" on public.product_videos
  for all to authenticated using (true) with check (true);

grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
`;

async function main() {
  await client.connect();
  await client.query(sql);
  console.log("Policies applied successfully.");
  await client.end();
  process.exit(0);
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});