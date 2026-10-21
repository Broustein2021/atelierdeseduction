import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminSession } from "@/lib/admin-auth";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { KeyRound, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/compte")({
  component: AdminAccountPage,
});

function AdminAccountPage() {
  const { user } = useAdminSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les deux nouveaux mots de passe ne sont pas identiques.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("Le nouveau mot de passe doit être différent de l'ancien.");
      return;
    }

    setSubmitting(true);
    const { error: err } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });
    setSubmitting(false);

    if (err) {
      setError(
        err.message === "Invalid current password"
          ? "Mot de passe actuel incorrect."
          : (err.message ?? "Modification impossible."),
      );
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess("Mot de passe mis à jour. Il sera demandé à votre prochaine connexion.");
  };

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-[11px] tracking-[0.22em] uppercase text-rose-deep">
        Mon compte
      </p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">Accès propriétaire</h1>
      <p className="mt-2 text-sm text-muted">
        Connecté en tant que{" "}
        <span className="font-medium text-ink">{user?.email}</span>.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-xl border border-line bg-paper p-5 sm:p-6"
      >
        <h2 className="flex items-center gap-2 font-display text-xl">
          <KeyRound className="size-4 text-rose-deep" />
          Changer mon mot de passe
        </h2>

        <div>
          <label
            htmlFor="currentPassword"
            className="mb-1.5 block text-[11px] tracking-[0.16em] uppercase text-muted"
          >
            Mot de passe actuel
          </label>
          <input
            id="currentPassword"
            type="password"
            required
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="h-11 w-full rounded-md border border-line bg-cream px-3 text-sm outline-none focus:border-burgundy"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="mb-1.5 block text-[11px] tracking-[0.16em] uppercase text-muted"
          >
            Nouveau mot de passe
          </label>
          <input
            id="newPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="h-11 w-full rounded-md border border-line bg-cream px-3 text-sm outline-none focus:border-burgundy"
            placeholder="8 caractères minimum"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-[11px] tracking-[0.16em] uppercase text-muted"
          >
            Confirmer le nouveau mot de passe
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-11 w-full rounded-md border border-line bg-cream px-3 text-sm outline-none focus:border-burgundy"
          />
        </div>

        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {success}
          </p>
        ) : null}

        <Button type="submit" disabled={submitting}>
          {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
          Mettre à jour
        </Button>
      </form>
    </div>
  );
}
