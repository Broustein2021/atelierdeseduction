import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo stacked />
      <h1 className="font-display text-4xl text-ink">Page introuvable</h1>
      <p className="max-w-md text-sm text-muted">
        Cette adresse ne correspond à aucune page de l'atelier. Revenez à
        l'accueil ou parcourez la boutique.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/">Retour à l'accueil</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/boutique">Voir la boutique</Link>
        </Button>
      </div>
    </main>
  );
}
