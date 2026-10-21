-- Catalogue L'Atelier de la Séduction (tables produits).
--
-- Remplace le schéma Supabase (`products`, `product_images`, `product_videos`).
-- Le projet Supabase du site a été supprimé : son DNS ne résout plus
-- (`hdjouqmlnginsxgijhcy.supabase.co` -> NXDOMAIN), ce qui faisait renvoyer une
-- erreur 500 au rendu serveur de `/`, `/boutique` et `/produit/*`.
--
-- Les tables sont préfixées `catalogue_` : la branche Neon du projet
-- (`round-pond-93773346` / `br-flat-union-ay6d1ulj`) héberge encore le schéma
-- d'une version antérieure du back-office (caisse) — `products` y existe déjà
-- avec des colonnes incompatibles (`sku`, `stock`, `initials`...). Préfixer nos
-- tables évite de renommer (donc casser) l'existant et garde les deux schémas
-- côte à côte.
--
-- Les noms de colonnes reprennent exactement ceux de l'ancien schéma
-- (`src/lib/supabase-types.ts`) pour que le mapping des lignes reste identique.
-- `storage_path` contient une valeur directement exploitable par le navigateur :
-- soit un chemin statique local (`/images/products/xxx.jpg`), soit une URL
-- Vercel Blob complète.
--
-- Appliqué automatiquement :
--   - sur Neon pendant le build Vercel (`npm run build` -> `npm run db:migrate`)
--   - sur le PGLite local au démarrage du dev server
--
-- Fichier appliqué une seule fois : il est suivi par nom dans `_migrations`.
-- Toute évolution du schéma doit aller dans un NOUVEAU fichier `0003_*.sql`.

create table if not exists catalogue_products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text not null unique,
  ref          text,
  category     text,
  price        numeric not null default 0,
  short        text,
  description  text,
  material     text,
  care         text,
  sizes        text[] not null default '{}',
  colors       text[] not null default '{}',
  images       jsonb not null default '[]'::jsonb,
  is_new       boolean not null default false,
  featured     boolean not null default false,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists catalogue_products_published_created_at_idx
  on catalogue_products (is_published, created_at desc);

create table if not exists catalogue_product_images (
  id           uuid primary key default gen_random_uuid(),
  product_id   uuid not null references catalogue_products (id) on delete cascade,
  storage_path text not null,
  position     integer not null default 0,
  is_cover     boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists catalogue_product_images_product_id_idx
  on catalogue_product_images (product_id, position);

create table if not exists catalogue_product_videos (
  id           uuid primary key default gen_random_uuid(),
  product_id   uuid not null references catalogue_products (id) on delete cascade,
  storage_path text not null,
  type         text not null default 'video/mp4',
  position     integer not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists catalogue_product_videos_product_id_idx
  on catalogue_product_videos (product_id, position);
