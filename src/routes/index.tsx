import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Logo, Monogram } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { generalInquiryText, site, waUrl } from "@/data/site";
import { getProducts } from "@/lib/products-server";

export const Route = createFileRoute("/")({
  loader: async () => {
    const products = await getProducts();
    return { products };
  },
  head: () => ({
    meta: [
      { title: "L'Atelier de la Séduction — Lingerie féminine à Abidjan" },
      {
        name: "description",
        content:
          "Boutique de lingerie et nuisettes à Abidjan, Riviera-Bonoumin. Pièces sans retouches, sélectionnées à la main. Commandez sur WhatsApp, livraison à Abidjan.",
      },
    ],
  }),
  component: Home,
});

const marquee = [
  "Photos sans retouches",
  "Riviera-Bonoumin",
  "Commande sur WhatsApp",
  "Livraison Abidjan",
  "Paiement hors site",
  "Pièces en quantités limitées",
];

function Home() {
  const { products } = Route.useLoaderData();
  const featured = products.filter((p) => p.featured);
  return (
    <main>
      <section className="relative min-h-[88svh] overflow-hidden bg-ink">
        <img
          src="/images/brand/boutique.jpg"
          alt="L'Atelier de la Séduction, boutique Riviera-Bonoumin"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16">
          <div className="animate-rise max-w-xl text-paper">
            <Monogram className="h-14 w-24 text-paper" />
            <p className="mt-5 text-[11px] tracking-[0.28em] uppercase text-rose">
              Abidjan · Riviera-Bonoumin
            </p>
            <h1 className="mt-3 font-display text-[2.7rem] leading-[0.95] sm:text-6xl">
              L'Atelier de
              <span className="italic"> la Séduction</span>
            </h1>
            <p className="mt-5 max-w-md font-display text-xl italic text-paper/85 sm:text-2xl">
              {site.tagline}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/boutique">
                  Découvrir la collection
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="inverse">
                <a
                  href={waUrl(generalInquiryText)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-4" />
                  Écrire sur WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-line bg-paper py-3">
        <div className="animate-marquee flex w-max gap-10 text-[11px] tracking-[0.22em] uppercase text-muted">
          {[...marquee, ...marquee, ...marquee].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              {item}
              <span className="size-1 rounded-full bg-rose" />
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose-deep">
              Sélection
            </p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">
              Pièces du moment
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/boutique">
              Toute la boutique
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} eager={i < 2} />
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden">
            <img
              src="/images/products/nuisette-ivoire.jpg"
              alt="Nuisette soie ivoire à l'atelier"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose-deep">
              La maison
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Un atelier, pas un catalogue.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              À Riviera-Bonoumin, Résidence RYAN, on choisit les pièces à la
              main. Rien n'est retouché : la lumière, le tissu, la couleur que
              vous voyez est celle que vous recevrez. La conversation, le
              conseil de taille et le paiement se font sur WhatsApp — simplement.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to="/a-propos">L'histoire de l'atelier</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">
                  <MapPin className="size-4" />
                  Venir en boutique
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Sans retouches",
              body: "Chaque photo et chaque vidéo est brute. Vous voyez la pièce, pas un filtre.",
            },
            {
              title: "WhatsApp unique",
              body: "Pas de panier, pas de caisse en ligne. Une conversation, une pièce, un paiement.",
            },
            {
              title: "Abidjan d'abord",
              body: "Boutique à Riviera-Bonoumin. Livraison dans la ville, expédition possible.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-line bg-paper px-6 py-8"
            >
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-burgundy px-4 py-16 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Logo stacked className="text-paper [&_span]:text-paper" />
          <h2 className="mt-8 font-display text-4xl sm:text-5xl">
            Une question, une taille, une pièce.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/75">
            Dites-nous ce que vous cherchez. Nous confirmons le stock, la
            taille, et le mode de paiement — le tout dans une seule
            conversation.
          </p>
          <Button asChild size="lg" variant="inverse" className="mt-8 w-full sm:w-auto">
            <a
              href={waUrl(generalInquiryText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-4" />
              Ouvrir WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
