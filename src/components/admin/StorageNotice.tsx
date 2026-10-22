"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Warns the owner when the media storage cannot be used as-is.
 *
 * `/api/admin/upload` answers `{"ok":true,"blob":false}` when the project has
 * no `BLOB_READ_WRITE_TOKEN`, and `{"ok":true,"blob":true,"access":"private"}`
 * when the connected store rejects public writes. Both cases turn a bare 503
 * (or a CORS error in the console) into an actionable message.
 */
type StorageStatus = "missing" | "private" | "ok" | null;

export function StorageNotice() {
  const [status, setStatus] = useState<StorageStatus>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/upload")
      .then((r) => r.json())
      .then((data: { blob?: boolean; access?: string }) => {
        if (!active) return;
        if (data?.blob === false) setStatus("missing");
        else if (data?.access === "private") setStatus("private");
        else setStatus("ok");
      })
      .catch(() => {
        if (active) setStatus(null);
      });
    return () => {
      active = false;
    };
  }, []);

  if (status === "missing") {
    return (
      <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <p className="flex items-center gap-2 font-medium">
          <AlertTriangle className="size-4 shrink-0" />
          Stockage des médias non activé
        </p>
        <p className="mt-1">
          Le store Vercel Blob n’est pas encore relié à ce projet : l’envoi
          d’images et de vidéos échoue. Dans le tableau de bord Vercel, ouvrez le
          projet, puis l’onglet <strong>Storage</strong> → votre store →
          <strong> Projects</strong> → <strong>Connect to Project</strong>{" "}
          (Production + Preview). Ajoutez si besoin la variable
          d’environnement <code>BLOB_READ_WRITE_TOKEN</code>, puis redéployez le
          site.
        </p>
      </div>
    );
  }

  if (status === "private") {
    return (
      <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <p className="flex items-center gap-2 font-medium">
          <AlertTriangle className="size-4 shrink-0" />
          Stockage des médias en accès privé
        </p>
        <p className="mt-1">
          Le store Vercel Blob relié à ce projet est en accès <strong>privé</strong>{" "}
          : les photos et vidéos du catalogue doivent être lisibles par les
          visiteurs, donc le store doit être <strong>public</strong>. Le mode
          d’accès est figé à la création — créez un nouveau store public :
          projet → <strong>Storage</strong> → <strong>Create Storage</strong> →
          <strong> Blob</strong> → <strong>Public</strong> → choisissez les
          environnements <strong>Production</strong> et <strong>Preview</strong>.
          Le nouveau store remplace automatiquement le token du projet.
        </p>
      </div>
    );
  }

  return null;
}
