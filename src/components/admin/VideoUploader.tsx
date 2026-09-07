"use client";

import { useCallback, useRef, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Film, Loader2, Trash2, UploadCloud } from "lucide-react";
import { resolveMediaPath } from "@/lib/products";
import { createAdminUploadUrl, deleteAdminMedia, uploadToSignedUrl } from "@/lib/admin-upload";

const MAX_VIDEOS = 3;
const BUCKET = "product-videos";
const ACCEPT = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_SIZE = 50 * 1024 * 1024; // 50 Mo

export function VideoUploader({
  supabase,
  productId,
  videos,
  onChange,
}: {
  supabase: SupabaseClient;
  productId: string;
  videos: string[];
  onChange: (videos: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      setError("");
      const fileList = Array.from(files);

      for (const file of fileList) {
        if (!ACCEPT.includes(file.type)) {
          setError(
            `Format non supporté : ${file.name || file.type}. Utilisez MP4, WebM ou MOV.`,
          );
          return;
        }
        if (file.size > MAX_SIZE) {
          setError(`La vidéo ${file.name} dépasse 50 Mo.`);
          return;
        }
        if (videos.length + 1 > MAX_VIDEOS) {
          setError(`Maximum ${MAX_VIDEOS} vidéos par article.`);
          return;
        }
      }

      setUploading(true);
      const uploaded: string[] = [];

      for (const file of fileList) {
        setCurrentFile(file.name);
        try {
          const { signedUrl, path: storagePath } = await createAdminUploadUrl(
            BUCKET,
            productId,
            file.name,
            file.type,
          );
          await uploadToSignedUrl(signedUrl, file);
          uploaded.push(storagePath);
          setProgress((prev) => prev + Math.round(100 / fileList.length));
        } catch (e) {
          setError(e instanceof Error ? e.message : `Erreur d'upload : ${e}`);
          setUploading(false);
          return;
        }
      }

      onChange([...videos, ...uploaded].slice(0, MAX_VIDEOS));
      setUploading(false);
      setProgress(0);
      setCurrentFile("");
    },
    [videos, onChange],
  );

  const removeVideo = useCallback(
    async (storagePath: string) => {
      onChange(videos.filter((v) => v !== storagePath));
      const path = storagePath.replace(`${BUCKET}/`, "");
      void deleteAdminMedia(BUCKET, path).catch(() => {});
    },
    [videos, onChange],
  );

  return (
    <div>
      {videos.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {videos.map((v, i) => (
            <div
              key={v}
              className="group relative overflow-hidden rounded-lg border border-line bg-ink"
            >
              <video
                src={resolveMediaPath(v)}
                controls
                preload="metadata"
                className="aspect-video w-full"
              />
              <button
                type="button"
                onClick={() => void removeVideo(v)}
                className="absolute right-2 top-2 rounded bg-red-600/90 p-1.5 text-paper opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Supprimer la vidéo"
              >
                <Trash2 className="size-4" />
              </button>
              <span className="absolute left-2 top-2 rounded bg-ink/70 px-1.5 py-0.5 text-[10px] text-paper">
                Vidéo {i + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">Aucune vidéo ajoutée.</p>
      )}

      {uploading ? (
        <div className="mt-4 flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3">
          <Loader2 className="size-4 animate-spin text-burgundy" />
          <div className="flex-1">
            <p className="text-xs text-muted">
              {currentFile ? `Upload de ${currentFile}…` : "Upload en cours…"}
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand">
              <div
                className="h-full rounded-full bg-burgundy transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-muted">{Math.min(progress, 100)}%</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={videos.length >= MAX_VIDEOS}
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-md border border-dashed border-rose-deep/50 px-4 text-sm text-rose-deep hover:bg-sand disabled:opacity-40"
        >
          <UploadCloud className="size-4" />
          {videos.length >= MAX_VIDEOS
            ? `${MAX_VIDEOS} vidéos maximum`
            : "Ajouter des vidéos"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
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
        MP4, WebM ou MOV — 50 Mo max par vidéo, 3 maximum par article.
      </p>
    </div>
  );
}
