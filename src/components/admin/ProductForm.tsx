"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { categories, colors, categoryLabel, colorLabel } from "@/data/products";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { VideoUploader } from "@/components/admin/VideoUploader";
import { resolveMediaPath, type ProductWithMedia } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"];

type FormState = {
  name: string;
  slug: string;
  ref: string;
  category: string;
  price: string;
  short: string;
  description: string;
  material: string;
  care: string;
  colors: string[];
  sizes: string[];
  isNew: boolean;
  featured: boolean;
  isPublished: boolean;
};

const emptyForm: FormState = {
  name: "",
  slug: "",
  ref: "",
  category: "ensembles",
  price: "",
  short: "",
  description: "",
  material: "",
  care: "",
  colors: [],
  sizes: ["S", "M", "L"],
  isNew: false,
  featured: false,
  isPublished: false,
};

const inputCls =
  "h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none focus:border-burgundy";

export function ProductForm({ product }: { product?: ProductWithMedia }) {
  const navigate = useNavigate();
  const supabase = getSupabaseBrowser();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [images, setImages] = useState<{ storagePath: string; isPrimary: boolean }[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(product);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        slug: product.slug,
        ref: product.ref,
        category: product.category,
        price: String(product.price),
        short: product.short,
        description: product.description,
        material: product.material,
        care: product.care,
        colors: product.colors,
        sizes: product.sizes,
        isNew: product.isNew ?? false,
        featured: product.featured ?? false,
        isPublished: true,
      });
      setImages(
        product.images.map((src) => ({ storagePath: src, isPrimary: false })),
      );
      setVideos(product.videos ?? []);
    }
  }, [product]);

  const set = (patch: Partial<FormState>) =>
    setForm((f) => ({ ...f, ...patch }));

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const onNameChange = (name: string) => {
    set({ name, slug: isEdit ? form.slug : slugify(name) });
  };

  const validate = (): string => {
    if (!form.name.trim()) return "Le nom est requis.";
    if (!form.slug.trim()) return "Le slug est requis.";
    const price = Number(form.price);
    if (!price || price <= 0) return "Le prix est requis et doit Ãªtre > 0.";
    if (form.colors.length === 0) return "SÃ©lectionnez au moins une couleur.";
    return "";
  };

  const saveDraft = async (publish: boolean) => {
    const verr = validate();
    if (verr) {
      setError(verr);
      return;
    }
    setError("");
    setSaving(true);

    const price = Number(form.price);
    const payload = {
      name: form.name,
      slug: form.slug,
      ref: form.ref || form.slug.toUpperCase(),
      category: form.category,
      price,
      short: form.short,
      description: form.description,
      material: form.material,
      care: form.care,
      colors: form.colors,
      sizes: form.sizes,
      is_new: form.isNew,
      featured: form.featured,
      is_published: publish,
    };

    try {
      const { data: saved, error: err } = isEdit
        ? await supabase
            .from("products")
            .update(payload)
            .eq("id", product!.id)
            .select()
            .single()
        : await supabase.from("products").insert(payload).select().single();

      if (err) throw new Error(err.message);
      const savedSlug = saved!.slug;

      // Reconcile images table if needed (for newly uploaded images)
      if (isEdit) {
        // Delete existing image rows that are no longer in the list and not local
        const existingLocal = product!.images;
        const keepPaths = images.map((i) => i.storagePath);
        for (const oldSrc of existingLocal) {
          if (!keepPaths.includes(oldSrc) && !oldSrc.startsWith("/images/")) {
            await supabase
              .from("product_images")
              .delete()
              .eq("product_id", product!.id)
              .eq("storage_path", oldSrc);
          }
        }
      }

      // Insert/update image records for storage-backed images
      const storageImages = images.filter((i) => !i.storagePath.startsWith("/images/"));
      if (isEdit && storageImages.length > 0) {
        for (const img of storageImages) {
          const existing = await supabase
            .from("product_images")
            .select("id")
            .eq("product_id", product!.id)
            .eq("storage_path", img.storagePath)
            .maybeSingle();
          if (!existing.data) {
            await supabase.from("product_images").insert({
              product_id: product!.id,
              storage_path: img.storagePath,
              is_cover: img.isPrimary,
            });
          } else {
            await supabase
              .from("product_images")
              .update({ is_cover: img.isPrimary })
              .eq("id", existing.data.id);
          }
        }
      }

      // For new products, insert image rows
      if (!isEdit && storageImages.length > 0) {
        for (let i = 0; i < storageImages.length; i++) {
          await supabase.from("product_images").insert({
            product_id: saved!.id,
            storage_path: storageImages[i].storagePath,
            position: i,
            is_cover: storageImages[i].isPrimary,
          });
        }
      }

      // Videos
      const videoPaths = videos;
      if (isEdit) {
        const existingVids = (product!.videos ?? []);
        for (const oldV of existingVids) {
          if (!videoPaths.includes(oldV) && !oldV.startsWith("/images/")) {
            await supabase
              .from("product_videos")
              .delete()
              .eq("product_id", product!.id)
              .eq("storage_path", oldV);
          }
        }
        for (let i = 0; i < videoPaths.length; i++) {
          if (videoPaths[i].startsWith("/images/")) continue;
          const existing = await supabase
            .from("product_videos")
            .select("id")
            .eq("product_id", product!.id)
            .eq("storage_path", videoPaths[i])
            .maybeSingle();
          if (!existing.data) {
            await supabase.from("product_videos").insert({
              product_id: product!.id,
              storage_path: videoPaths[i],
              position: i,
            });
          }
        }
      } else if (videoPaths.length > 0) {
        for (let i = 0; i < videoPaths.length; i++) {
          await supabase.from("product_videos").insert({
            product_id: saved!.id,
            storage_path: videoPaths[i],
            position: i,
          });
        }
      }

      setSaving(false);
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'enregistrement.");
      setSaving(false);
    }
  };

  const deleteProduct = async () => {
    if (!product) return;
    if (
      !window.confirm(
        `Supprimer dÃ©finitivement Â« ${product.name} Â» ? Cette action est irrÃ©versible.`,
      )
    )
      return;
    setLoading(true);
    try {
      await supabase.from("product_images").delete().eq("product_id", product.id);
      await supabase.from("product_videos").delete().eq("product_id", product.id);
      await supabase.from("products").delete().eq("id", product.id);
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de suppression.");
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="py-10 text-center text-muted">Chargementâ€¦</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/admin"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        Retour au tableau de bord
      </Link>

      <h1 className="font-display text-3xl sm:text-4xl">
        {isEdit ? `Modifier : ${product!.name}` : "Nouvel article"}
      </h1>

      <div className="mt-8 space-y-8">
        <Section title="Informations">
          <Field label="Nom de l'article *">
            <input
              type="text"
              value={form.name}
              onChange={(e) => onNameChange(e.target.value)}
              className={inputCls}
              placeholder="Ex : Ensemble Dentelle Ivoire"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug (URL)">
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set({ slug: slugify(e.target.value) })}
                className={inputCls}
                placeholder="ensemble-dentelle-ivoire"
              />
            </Field>
            <Field label="RÃ©fÃ©rence">
              <input
                type="text"
                value={form.ref}
                onChange={(e) => set({ ref: e.target.value })}
                className={inputCls}
                placeholder="AS-DEN-IV"
              />
            </Field>
          </div>
          <Field label="Prix (F CFA) *">
            <input
              type="number"
              min="0"
              step="500"
              value={form.price}
              onChange={(e) => set({ price: e.target.value })}
              className={inputCls}
              placeholder="18000"
            />
          </Field>
          <Field label="CatÃ©gorie">
            <select
              value={form.category}
              onChange={(e) => set({ category: e.target.value })}
              className={inputCls}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Description courte (affichÃ©e sur la carte)">
            <textarea
              value={form.short}
              onChange={(e) => set({ short: e.target.value })}
              className="min-h-20 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-burgundy"
              placeholder="Courte phrase accrocheuse"
            />
          </Field>
          <Field label="Description complÃ¨te">
            <textarea
              value={form.description}
              onChange={(e) => set({ description: e.target.value })}
              className="min-h-28 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-burgundy"
              placeholder="Description dÃ©taillÃ©e de la piÃ¨ce"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="MatiÃ¨re">
              <input
                type="text"
                value={form.material}
                onChange={(e) => set({ material: e.target.value })}
                className={inputCls}
                placeholder="Dentelle, tulle, satinâ€¦"
              />
            </Field>
            <Field label="Entretien">
              <input
                type="text"
                value={form.care}
                onChange={(e) => set({ care: e.target.value })}
                className={inputCls}
                placeholder="Lavage Ã  la mainâ€¦"
              />
            </Field>
          </div>
        </Section>

        <Section title="Couleurs *">
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() =>
                  set({
                    colors: form.colors.includes(c.id)
                      ? form.colors.filter((x) => x !== c.id)
                      : [...form.colors, c.id],
                  })
                }
                className={`inline-flex h-10 items-center gap-2 rounded-full border px-3 text-xs tracking-[0.08em] uppercase ${
                  form.colors.includes(c.id)
                    ? "border-burgundy bg-burgundy text-paper"
                    : "border-line bg-paper text-ink-soft"
                }`}
              >
                <span
                  className="size-2.5 rounded-full border border-black/10"
                  style={{ background: c.swatch }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Tailles">
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() =>
                  set({
                    sizes: form.sizes.includes(s)
                      ? form.sizes.filter((x) => x !== s)
                      : [...form.sizes, s],
                  })
                }
                className={`flex size-11 items-center justify-center rounded-md border text-sm ${
                  form.sizes.includes(s)
                    ? "border-burgundy bg-burgundy text-paper"
                    : "border-line bg-paper hover:border-ink/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Section>

        <Section
          title="Images"
          hint="Photos de l'article â€” couvrez la piÃ¨ce sous tous les angles."
        >
          <ImageUploader
            supabase={supabase}
            productId={isEdit ? product!.id : `new-${Date.now()}`}
            images={images}
            onChange={setImages}
          />
        </Section>

        <Section
          title="VidÃ©os"
          hint="Montrez l'article en mouvement. VidÃ©o 50 Mo max, MP4 conseillÃ©."
        >
          <VideoUploader
            supabase={supabase}
            productId={isEdit ? product!.id : `new-${Date.now()}`}
            videos={videos}
            onChange={setVideos}
          />
        </Section>

        <Section title="Options">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3">
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(e) => set({ isNew: e.target.checked })}
                className="size-4 accent-burgundy"
              />
              <span className="text-sm">Marquer comme nouveau</span>
            </label>
            <label className="flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set({ featured: e.target.checked })}
                className="size-4 accent-burgundy"
              />
              <span className="text-sm">Mettre en avant sur l'accueil</span>
            </label>
          </div>
        </Section>

        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            size="lg"
            onClick={() => void saveDraft(true)}
            disabled={saving}
            className="sm:w-auto"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {isEdit ? "Enregistrer les modifications" : "Publier l'article"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => void saveDraft(false)}
            disabled={saving}
            className="sm:w-auto"
          >
            Enregistrer comme brouillon
          </Button>
          {isEdit ? (
            <button
              type="button"
              onClick={() => void deleteProduct()}
              className="ml-auto inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm text-red-600 hover:bg-red-50 disabled:opacity-40"
              disabled={saving}
            >
              <Trash2 className="size-4" />
              Supprimer
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line bg-paper p-5 sm:p-6">
      <h2 className="font-display text-xl">{title}</h2>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] tracking-[0.14em] uppercase text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

