import { createFileRoute, Link } from "@tanstack/react-router";
import { WhatsAppCta } from "@/components/product/WhatsAppCta";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/guide-tailles")({
  component: SizeGuidePage,
});

const rows = [
  { t: "S", tou: "36 — 38", poit: "82 — 86", tai: "64 — 68", han: "90 — 94" },
  { t: "M", tou: "38 — 40", poit: "86 — 90", tai: "68 — 72", han: "94 — 98" },
  { t: "L", tou: "42 — 44", poit: "90 — 96", tai: "72 — 80", han: "98 — 106" },
  { t: "XL", tou: "46", poit: "96 — 102", tai: "80 — 88", han: "106 — 114" },
  { t: "XXL", tou: "48 — 50", poit: "102 — 110", tai: "88 — 96", han: "114 — 122" },
];

function SizeGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[11px] tracking-[0.22em] uppercase text-rose-deep">
        Guide
      </p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">
        Trouver sa taille
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
        Les pièces de l'atelier suivent une grille européenne, adaptée aux
        silhouettes que nous habillons à Abidjan. En doute, envoyez-nous trois
        mesures sur WhatsApp : poitrine, taille, hanches.
      </p>

      <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-paper">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-line text-[11px] tracking-[0.14em] uppercase text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Taille</th>
              <th className="px-4 py-3 font-medium">Tour FR</th>
              <th className="px-4 py-3 font-medium">Poitrine</th>
              <th className="px-4 py-3 font-medium">Taille</th>
              <th className="px-4 py-3 font-medium">Hanches</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.t} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{r.t}</td>
                <td className="px-4 py-3 text-ink-soft">{r.tou}</td>
                <td className="px-4 py-3 tabular-nums text-ink-soft">
                  {r.poit} cm
                </td>
                <td className="px-4 py-3 tabular-nums text-ink-soft">
                  {r.tai} cm
                </td>
                <td className="px-4 py-3 tabular-nums text-ink-soft">
                  {r.han} cm
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-muted">
        Pour les soutiens-gorge, indiquez aussi le tour de dos et le bonnet
        (ex. 90C). Les nuisettes et peignoirs sont pensés un peu amples : si
        vous hésitez entre deux tailles, prenez la plus petite pour un tombé
        près du corps, la plus grande pour le confort.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <WhatsAppCta
          label="Demander conseil taille"
          className="sm:w-auto"
        />
        <Button asChild variant="outline" size="lg" className="sm:w-auto">
          <Link to="/boutique">Retour à la boutique</Link>
        </Button>
      </div>
    </main>
  );
}
