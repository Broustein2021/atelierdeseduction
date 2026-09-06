import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import {
  categories,
  colors,
  products,
  type CategoryId,
  type ColorId,
} from "@/data/products";
import { cn } from "@/lib/utils";

type Search = {
  cat?: CategoryId;
  couleur?: ColorId;
  nouveau?: boolean;
};

function truthyParam(v: unknown): boolean | undefined {
  if (v === true || v === "true" || v === "1" || v === 1) return true;
  return undefined;
}

export const Route = createFileRoute("/boutique")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: categories.some((c) => c.id === s.cat)
      ? (s.cat as CategoryId)
      : undefined,
    couleur: colors.some((c) => c.id === s.couleur)
      ? (s.couleur as ColorId)
      : undefined,
    nouveau: truthyParam(s.nouveau),
  }),
  component: BoutiquePage,
});

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 shrink-0 rounded-full border px-4 text-xs tracking-[0.12em] uppercase transition-colors",
        active
          ? "border-burgundy bg-burgundy text-paper"
          : "border-line bg-paper text-ink-soft hover:border-ink/30",
      )}
    >
      {children}
    </button>
  );
}

function BoutiquePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [size, setSize] = useState<string>("all");

  const setSearch = (patch: Partial<Search>) => {
    void navigate({
      search: {
        ...search,
        ...patch,
      },
    });
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search.cat && p.category !== search.cat) return false;
      if (search.couleur && !p.colors.includes(search.couleur)) return false;
      if (search.nouveau && !p.isNew) return false;
      if (size !== "all" && !p.sizes.includes(size)) return false;
      return true;
    });
  }, [search, size]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-[11px] tracking-[0.22em] uppercase text-rose-deep">
        Collection
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-4xl sm:text-5xl">La boutique</h1>
        <p className="text-sm text-muted">
          {filtered.length} pièce{filtered.length > 1 ? "s" : ""} · paiement
          sur WhatsApp
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <Chip active={!search.cat} onClick={() => setSearch({ cat: undefined })}>
            Tout
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={search.cat === c.id}
              onClick={() =>
                setSearch({ cat: search.cat === c.id ? undefined : c.id })
              }
            >
              {c.label}
            </Chip>
          ))}
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <Chip
            active={!search.couleur}
            onClick={() => setSearch({ couleur: undefined })}
          >
            Toutes couleurs
          </Chip>
          {colors.map((c) => (
            <Chip
              key={c.id}
              active={search.couleur === c.id}
              onClick={() =>
                setSearch({
                  couleur: search.couleur === c.id ? undefined : c.id,
                })
              }
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full border border-ink/15"
                  style={{ background: c.swatch }}
                />
                {c.label}
              </span>
            </Chip>
          ))}
          <Chip
            active={Boolean(search.nouveau)}
            onClick={() =>
              setSearch({ nouveau: search.nouveau ? undefined : true })
            }
          >
            Nouveautés
          </Chip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">
            Taille
          </span>
          {["all", "S", "M", "L", "XL", "XXL"].map((s) => (
            <Chip key={s} active={size === s} onClick={() => setSize(s)}>
              {s === "all" ? "Toutes" : s}
            </Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-xl border border-line bg-paper px-6 py-16 text-center">
          <p className="font-display text-3xl">Aucune pièce pour ce filtre</p>
          <p className="mt-2 text-sm text-muted">
            Élargissez la recherche, ou demandez-nous une pièce sur WhatsApp.
          </p>
          <Link
            to="/boutique"
            className="mt-6 inline-flex h-12 items-center rounded-md border border-line px-5 text-sm"
          >
            Réinitialiser
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} eager={i < 4} />
          ))}
        </div>
      )}
    </main>
  );
}
