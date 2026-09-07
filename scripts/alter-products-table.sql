-- Add the missing columns to the products table so it matches the app's data model.
-- Run this in the Supabase Dashboard > SQL Editor.
alter table public.products
  add column if not exists ref text,
  add column if not exists short text,
  add column if not exists material text,
  add column if not exists care text,
  add column if not exists is_new boolean not null default false,
  add column if not exists featured boolean not null default false,
  add column if not exists images jsonb not null default '[]'::jsonb;
