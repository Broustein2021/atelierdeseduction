import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchAllProducts, resolveMediaPath, type ProductWithMedia } from "@/lib/products";
import { formatCfa } from "@/lib/utils";
import { Plus, Package } from "lucide-react";
import { signOutAdmin } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/_layout/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [products, setProducts] = useState<ProductWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted">
        Chargement…
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <p className="text-lg text-red-700">{error}</p>
      </div>
    );
  }

  const totalProducts = products.length;
  const featuredCount = products.filter((p) => p.featured).length;
  const newCount = products.filter((p) => p.isNew).length;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose-deep">
            Tableau de bord
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">Vos articles</h1>
        </div>
        <Link
          to="/admin/produits/new"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-burgundy px-4 text-sm text-paper hover:bg-burgundy-deep"
        >
          <Plus className="size-4" />
          Nouvel article
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Articles" value={totalProducts} />
        <StatCard label="Mis en avant" value={featuredCount} />
        <StatCard label="Nouveautés" value={newCount} />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-line bg-paper">
        <div className="border-b border-line px-4 py-3 sm:px-6">
          <h2 className="flex items-center gap-2 font-display text-xl">
            <Package className="size-4 text-rose-deep" />
            Tous les articles
          </h2>
        </div>

        {products.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-display text-2xl">Aucun article encore</p>
            <p className="mt-2 text-sm text-muted">
              Commencez par ajouter votre premier article.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {products.map((p) => (
              <li key={p.id}>
                <Link
                  to="/admin/produits/$slug"
                  params={{ slug: p.slug }}
                  className="flex items-center gap-4 px-4 py-3.5 hover:bg-sand/60 sm:px-6"
                >
                  <div className="h-14 w-11 shrink-0 overflow-hidden rounded-md bg-sand">
                    {p.images[0] ? (
                      <img
                        src={resolveMediaPath(p.images[0])}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink">{p.name}</p>
                    <p className="text-xs text-muted">
                      Réf. {p.ref} · {p.category}
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 sm:flex">
                    {p.isNew ? (
                      <span className="rounded-full bg-rose/20 px-2 py-0.5 text-[10px] tracking-wide uppercase text-rose-deep">
                        Nouveau
                      </span>
                    ) : null}
                    {p.featured ? (
                      <span className="rounded-full bg-burgundy/10 px-2 py-0.5 text-[10px] tracking-wide uppercase text-burgundy">
                        En avant
                      </span>
                    ) : null}
                  </div>
                  <div className="w-24 shrink-0 text-right text-sm font-medium tabular-nums text-ink">
                    {formatCfa(p.price)}
                  </div>
                  <span className="text-muted">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-4 sm:p-5">
      <p className="text-3xl font-medium tabular-nums text-burgundy">{value}</p>
      <p className="mt-1 text-[11px] tracking-[0.14em] uppercase text-muted">
        {label}
      </p>
    </div>
  );
}
