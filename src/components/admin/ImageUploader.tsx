"use client";

import { useCallback, useRef, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ImagePlus, Loader2, Trash2, X } from "lucide-react";
import { resolveMediaPath } from "@/lib/products";
import { cn } from "@/lib/utils";

const MAX_IMAGES = 10;
const BUCKET = "product-images";
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 Mo

export function ImageUploader({
  supabase,
  productId,
  images,
  onChange,
}: {
  supabase: SupabaseClient;
  productId: string;
  images: { storagePath: string; isPrimary: boolean }[];
  onChange: (images: { storagePath: string; isPrimary: boolean }[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      setError("");
      const fileList = Array.from(files);
      const total = fileList.length;
      let done = 0;

      // First, validate all files
      for (const file of fileList) {
        if (!ACCEPT.includes(file.type)) {
          setError(
            `Format non supporté : ${file.name || file.type}. Utilisez JPG, PNG ou WebP.`,
          );
          return;
        }
        if (file.size > MAX_SIZE) {
          setError(`Le fichier ${file.name} dépasse 10 Mo.`);
          return;
        }
      }

      setUploading(true);
      const uploaded: { storagePath: string; isPrimary: boolean }[] = [];

      for (const file of fileList) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${productId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${ext}`;

        const { error: uploadErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, {
            contentType: file.type,
            cacheControl: "3600",
          });

        if (uploadErr) {
          setError(`Erreur d'upload : ${uploadErr.message}`);
          setUploading(false);
          return;
        }

        uploaded.push({
          storagePath: `${BUCKET}/${path}`,
          isPrimary: images.length === 0,
        });
        done += 1;
        setProgress(Math.round((done / total) * 100));
      }

      const combined = [...images, ...uploaded];
      onChange(combined.slice(0, MAX_IMAGES));
      setUploading(false);
      setProgress(0);
    },
    [images, onChange, productId],
  );

  const removeImage = useCallback(
    async (storagePath: string) => {
      const next = images.filter((i) => i.storagePath !== storagePath);
      // If we removed the primary, promote the first remaining
      if (next.length > 0 && !next.some((i) => i.isPrimary)) {
        next[0] = { ...next[0], isPrimary: true };
      }
      onChange(next);

      // Delete from storage (best-effort, non-blocking)
      const path = storagePath.replace(`${BUCKET}/`, "");
      void supabase.storage.from(BUCKET).remove([path]);
    },
    [images, onChange, supabase],
  );

  const setPrimary = useCallback(
    (storagePath: string) => {
      onChange(
        images.map((i) => ({ ...i, isPrimary: i.storagePath === storagePath })),
      );
    },
    [images, onChange],
  );

  const visibleCount = images.length;

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((img) => (
          <div
            key={img.storagePath}
            className="group relative h-28 w-24 overflow-hidden rounded-lg border border-line bg-sand"
          >
            <img
              src={resolveMediaPath(img.storagePath)}
              alt=""
              className="h-full w-full object-cover"
            />
            {img.isPrimary ? (
              <span className="absolute left-1 top-1 rounded bg-burgundy px-1.5 py-0.5 text-[9px] tracking-wide text-paper">
                Principal
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setPrimary(img.storagePath)}
                className={cn(
                  "absolute left-1 top-1 rounded bg-paper/95 px-1.5 py-0.5 text-[9px] tracking-wide text-ink-soft",
                  "opacity-0 transition-opacity group-hover:opacity-100",
                )}
              >
                Définir principal
              </button>
            )}
            <button
              type="button"
              onClick={() => void removeImage(img.storagePath)}
              className="absolute right-1 top-1 rounded bg-red-600/90 p-1 text-paper opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Supprimer l'image"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>

      {uploading ? (
        <div className="mt-4 flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3">
          <Loader2 className="size-4 animate-spin text-burgundy" />
          <div className="flex-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand">
              <div
                className="h-full rounded-full bg-burgundy transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-muted">{progress}%</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={visibleCount >= MAX_IMAGES}
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-md border border-dashed border-rose-deep/50 px-4 text-sm text-rose-deep hover:bg-sand disabled:opacity-40"
        >
          <ImagePlus className="size-4" />
          {visibleCount >= MAX_IMAGES
            ? `${MAX_IMAGES} images maximum`
            : "Ajouter des images"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) void uploadFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error ? (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      ) : null}
      <p className="mt-2 text-xs text-muted">
        JPG, PNG ou WebP — 10 Mo max par image. Cliquez pour sélectionner plusieurs fichiers.
      </p>
    </div>
  );
}
