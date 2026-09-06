import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { generalInquiryText, site, waUrl } from "@/data/site";

export const Route = createFileRoute("/a-propos")({ component: AboutPage });

function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose-deep">
            L'Atelier
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">
            Une pépite pour la beauté que tu es.
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
            L'Atelier de la Séduction est une boutique féminine à Abidjan,
            Riviera-Bonoumin, Résidence RYAN. On y choisit des lingeries et des
            pièces de nuit comme on choisit un bijou : à la main, à la lumière,
            sans promesse retouchée.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            Toutes nos photos et vidéos sont sans retouches. Ce que vous voyez
            est ce qui arrive — la dentelle, le satin, le rose poussière du sac,
            le bordeaux de la robe maille.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl">
          <img
            src="/images/brand/boutique.jpg"
            alt="L'intérieur de L'Atelier de la Séduction, Riviera-Bonoumin"
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Authenticité",
              d: "Photos brutes, pièces réelles, conversation directe. Pas de filtre, pas de stock fantôme.",
            },
            {
              n: "02",
              t: "Élégance",
              d: "Une palette ivoire, rose poussière, bordeaux. Rien de criard, rien de clinquant.",
            },
            {
              n: "03",
              t: "Discrétion",
              d: "Le paiement se fait hors site, sur WhatsApp. Votre commande reste une conversation privée.",
            },
          ].map((v) => (
            <div key={v.n}>
              <p className="font-display text-3xl text-rose">{v.n}</p>
              <h2 className="mt-2 font-display text-2xl">{v.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-4xl">Comment commander</h2>
        <ol className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          {[
            {
              n: "1",
              t: "Choisissez",
              d: "Parcourez la boutique, ouvrez une fiche, sélectionnez taille et couleur.",
            },
            {
              n: "2",
              t: "Écrivez",
              d: "Le bouton WhatsApp ouvre une conversation déjà préremplie avec la référence.",
            },
            {
              n: "3",
              t: "Confirmez",
              d: "Nous validons le stock et le paiement. Livraison à Abidjan, retrait possible.",
            },
          ].map((s) => (
            <li key={s.n} className="rounded-xl border border-line bg-paper p-5">
              <p className="font-display text-3xl text-burgundy">{s.n}</p>
              <p className="mt-2 font-medium">{s.t}</p>
              <p className="mt-2 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/boutique">Entrer dans la boutique</Link>
          </Button>
          <Button asChild size="lg" variant="whatsapp">
            <a
              href={waUrl(generalInquiryText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted">
          {site.addressFull}
          <br />
          {site.phoneDisplay}
        </p>
      </section>
    </main>
  );
}
