import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { WhatsAppCta } from "@/components/product/WhatsAppCta";
import { ProductCard } from "@/components/product/ProductCard";
import {
  categoryLabel,
  colorLabel,
  colors,
} from "@/data/products";
import { getProductBySlug, getProducts, type ProductWithMedia } from "@/lib/products-server";
import { formatCfa, cn } from "@/lib/utils";

export const Route = createFileRoute("/produit/$slug")({
  loader: async ({ params }) => {
    const [product, all] = await Promise.all([
      getProductBySlug({ data: params.slug }),
      getProducts(),
    ]);
    if (!product) throw notFound();
    const related = [...all]
      .filter((p) => p.id !== product.id)
      .sort((a, b) => {
        const aSame = a.category === product.category ? 0 : 1;
        const bSame = b.category === product.category ? 0 : 1;
        return aSame - bSame;
      })
      .slice(0, 4);
    return { product, related };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="text-[12px] text-muted">
        <Link to="/" className="hover:text-ink">
          Accueil
        </Link>
        <span className="px-1.5">/</span>
        <Link to="/boutique" className="hover:text-ink">
          Boutique
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="overflow-hidden rounded-xl bg-sand">
            <img
              src={product.images[active] ?? product.images[0]}
              alt={product.name}
              className="aspect-portrait w-full object-cover"
            />
          </div>
          {product.images.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "overflow-hidden rounded-md border-2",
                    i === active ? "border-burgundy" : "border-transparent",
                  )}
                >
                  <img
                    src={src}
                    alt=""
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}

          {product.videos.length > 0 ? (
            <div className="mt-4 space-y-3">
              <p className="text-[11px] tracking-[0.16em] uppercase text-muted">
                En vidéo
              </p>
              {product.videos.map((src, i) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-xl bg-ink"
                >
                  <video
                    src={src}
                    controls
                    preload="metadata"
                    className="aspect-video w-full"
                  >
                    <source src={src} />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="lg:pt-4">
          <p className="text-[11px] tracking-[0.2em] uppercase text-rose-deep">
            {categoryLabel[product.category]} · Réf. {product.ref}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-medium tabular-nums">
            {formatCfa(product.price)}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="text-[11px] tracking-[0.16em] uppercase text-muted">
              Couleur
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => {
                const meta = colors.find((x) => x.id === c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={cn(
                      "inline-flex h-10 items-center gap-2 rounded-full border px-3 text-xs tracking-[0.1em] uppercase",
                      color === c
                        ? "border-burgundy bg-burgundy text-paper"
                        : "border-line bg-paper",
                    )}
                  >
                    <span
                      className="size-2.5 rounded-full border border-black/10"
                      style={{ background: meta?.swatch }}
                    />
                    {colorLabel[c]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <p className="text-[11px] tracking-[0.16em] uppercase text-muted">
                Taille
              </p>
              <Link
                to="/guide-tailles"
                className="text-xs text-burgundy underline-offset-4 hover:underline"
              >
                Guide des tailles
              </Link>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-md border text-sm",
                    size === s
                      ? "border-burgundy bg-burgundy text-paper"
                      : "border-line bg-paper hover:border-ink/30",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <WhatsAppCta
              product={product}
              size={size}
              color={colorLabel[color]}
              label="Commander sur WhatsApp"
            />
            <p className="text-center text-xs text-muted">
              Le message est prérempli avec la référence, la couleur et la
              taille. Stock et paiement confirmés dans la conversation.
            </p>
          </div>

          <dl className="mt-10 space-y-4 border-t border-line pt-8 text-sm">
            <div>
              <dt className="text-[11px] tracking-[0.16em] uppercase text-muted">
                Matière
              </dt>
              <dd className="mt-1 text-ink-soft">{product.material}</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.16em] uppercase text-muted">
                Entretien
              </dt>
              <dd className="mt-1 text-ink-soft">{product.care}</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-display text-3xl sm:text-4xl">Dans le même esprit</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
