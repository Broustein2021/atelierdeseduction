import { Link } from "@tanstack/react-router";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import {
  categoryLabel,
  productMessage,
  type Product,
} from "@/data/products";
import { waUrl } from "@/data/site";
import { cn, formatCfa } from "@/lib/utils";

export function ProductCard({
  product,
  eager,
}: {
  product: Product;
  eager?: boolean;
}) {
  return (
    <article className="group flex min-w-0 flex-col">
      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden rounded-lg bg-sand"
      >
        <div className="aspect-portrait overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading={eager ? "eager" : "lazy"}
          />
        </div>
        {product.isNew ? (
          <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase text-burgundy">
            Nouveau
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col pt-3">
        <p className="text-[11px] tracking-[0.16em] uppercase text-muted">
          {categoryLabel[product.category]}
        </p>
        <Link
          to="/produit/$slug"
          params={{ slug: product.slug }}
          className="mt-1 font-display text-xl leading-snug text-ink sm:text-[1.35rem]"
        >
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.short}</p>
        <div className="mt-auto flex flex-col gap-2.5 pt-3">
          <p className="text-sm font-medium tabular-nums text-ink">
            {formatCfa(product.price)}
          </p>
          <a
            href={waUrl(productMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-11 items-center justify-center gap-1.5 rounded-md bg-burgundy px-3 text-[11px] tracking-[0.08em] uppercase text-paper",
              "hover:bg-burgundy-deep",
            )}
          >
            <WhatsAppIcon className="size-3.5" />
            Commander
          </a>
        </div>
      </div>
    </article>
  );
}
