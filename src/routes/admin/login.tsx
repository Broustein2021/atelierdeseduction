import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminSession, signInWithEmail } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const { loading, session } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <main className="flex min-h-svh items-center justify-center px-4">
        <Loader2 className="size-6 animate-spin text-burgundy" />
      </main>
    );
  }

  if (session) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: err } = await signInWithEmail(email, password);
    setSubmitting(false);
    if (err) {
      setError(
        err.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect."
          : err.message,
      );
    }
  };

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Logo className="text-burgundy" />
          <h1 className="mt-6 font-display text-3xl">Espace propriétaire</h1>
          <p className="mt-2 text-sm text-muted">
            Connectez-vous pour gérer vos articles.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[11px] tracking-[0.16em] uppercase text-muted"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none focus:border-burgundy"
              placeholder="vous@exemple.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-[11px] tracking-[0.16em] uppercase text-muted"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-md border border-line bg-paper px-3 pr-10 text-sm outline-none focus:border-burgundy"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-ink"
                aria-label={showPw ? "Cacher le mot de passe" : "Afficher le mot de passe"}
              >
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogIn className="size-4" />
            )}
            Se connecter
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          <Link to="/" className="hover:text-ink">
            ← Retour au site
          </Link>
        </p>
      </div>
    </main>
  );
}