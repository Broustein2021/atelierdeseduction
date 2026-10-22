"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Warns the owner when the media storage is not wired up yet.
 *
 * `/api/admin/upload` answers `{"ok":true,"blob":false}` when the project has
 * no `BLOB_READ_WRITE_TOKEN` — uploads then fail with a bare 503. This banner
 * turns that into an actionable message instead of a console error.
 */
export function StorageNotice() {
  const [missing, setMissing] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/upload")
      .then((r) => r.json())
      .then((data: { blob?: boolean }) => {
        if (active) setMissing(data?.blob === false);
      })
      .catch(() => {
        if (active) setMissing(null);
      });
    return () => {
      active = false;
    };
  }, []);

  if (missing !== true) return null;

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
