"use client";

import { useCallback, useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { resolveMediaPath } from "@/lib/media";
import { cn } from "@/lib/utils";
import { deleteAdminMedia, uploadMedia } from "@/lib/admin-upload";
import { compressImage } from "@/lib/image-compress";

const MAX_IMAGES = 10;
/** Types the browser can upload (after conversion). */
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
/** Accepted by the file picker so phone photos (HEIC) can be converted. */
const INPUT_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif";
const MAX_SIZE = 10 * 1024 * 1024; // 10 Mo

/**
 * Image uploader for the back office.
 *
 * Files go straight to Vercel Blob with a token minted by
 * `/api/admin/upload` (which checks the session server-side). `storagePath`
 * holds the resulting public URL.
 */
export function ImageUploader({
  images,
  onChange,
}: {
  images: { storagePath: string; isPrimary: boolean }[];
  onChange: (images: { storagePath: string; isPrimary: boolean }[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  /** URLs uploaded during this session: they were never saved anywhere. */
  const sessionUploads = useRef<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      setError("");
      const fileList = Array.from(files);
      const total = fileList.length;
      let done = 0;

      for (const file of fileList) {
        if (!file.type.startsWith("image/")) {
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
        try {
          const ready = await compressImage(file);
          if (!ACCEPT.includes(ready.type)) {
            setError(
              `Format non supporté : ${file.name || file.type}. Utilisez JPG, PNG ou WebP.`,
            );
            setUploading(false);
            return;
          }
          const { url } = await uploadMedia("images", ready, (percentage) => {
            setProgress(Math.round(((done + percentage / 100) / total) * 100));
          });
          sessionUploads.current.add(url);
          uploaded.push({
            storagePath: url,
            isPrimary: images.length === 0 && uploaded.length === 0,
          });
        } catch (e) {
          setError(e instanceof Error ? e.message : `Erreur d'upload : ${e}`);
          setUploading(false);
          return;
        }
        done += 1;
        setProgress(Math.round((done / total) * 100));
      }

      const combined = [...images, ...uploaded];
      onChange(combined.slice(0, MAX_IMAGES));
      setUploading(false);
      setProgress(0);
    },
    [images, onChange],
  );

  const removeImage = useCallback(
    async (storagePath: string) => {
      const next = images.filter((i) => i.storagePath !== storagePath);
      // If we removed the primary, promote the first remaining
      if (next.length > 0 && !next.some((i) => i.isPrimary)) {
        next[0] = { ...next[0], isPrimary: true };
      }
      onChange(next);

      // Only files uploaded in this session are safe to delete right away:
      // they were never saved, so nothing else references them. Images already
      // in the catalogue are removed from the store after a successful save
      // (the form may still be abandoned, and the product still points at
      // them until then).
      if (sessionUploads.current.delete(storagePath)) {
        void deleteAdminMedia(storagePath).catch(() => {});
      }
    },
    [images, onChange],
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
        accept={INPUT_ACCEPT}
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
        JPG, PNG ou WebP — 10 Mo max par image. Les photos sont redimensionnées
        (1600 px, WebP) automatiquement pour garder le site rapide.
      </p>
    </div>
  );
}
