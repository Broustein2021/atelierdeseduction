import { createFileRoute, Outlet, Link, Navigate, useRouterState } from "@tanstack/react-router";
import { useAdminSession, signOutAdmin } from "@/lib/admin-auth";
import { LayoutDashboard, LogOut, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/_layout")({
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { loading, session } = useAdminSession();

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-cream">
        <Loader2 className="size-6 animate-spin text-burgundy" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  const nav = [
    {
      to: "/admin",
      label: "Tableau de bord",
      icon: LayoutDashboard,
      active: pathname === "/admin" || pathname.startsWith("/admin/produits"),
    },
  ] as const;

  return (
    <div className="flex min-h-svh bg-cream">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-paper md:flex">
        <div className="flex h-16 items-center border-b border-line px-5">
          <Link to="/" className="font-display text-xl text-burgundy">
            L'Atelier
          </Link>
          <span className="ml-2 text-[10px] tracking-[0.18em] uppercase text-muted">
            Admin
          </span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm",
                item.active
                  ? "bg-burgundy text-paper"
                  : "text-ink-soft hover:bg-sand",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
          <Link
            to="/admin/produits/new"
            className="mt-2 flex items-center gap-3 rounded-md border border-dashed border-rose-deep/50 px-3 py-2.5 text-sm text-rose-deep hover:bg-sand"
          >
            <Plus className="size-4" />
            Nouvel article
          </Link>
        </nav>
        <div className="border-t border-line p-3">
          <button
            onClick={() => void signOutAdmin().then(() => (window.location.href = "/"))}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink-soft hover:bg-sand"
          >
            <LogOut className="size-4" />
            Se déconnecter
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-line bg-paper px-4 md:hidden">
          <Link to="/" className="font-display text-lg text-burgundy">
            L'Atelier
          </Link>
          <div className="flex items-center gap-1">
            <Link
              to="/admin/produits/new"
              className="inline-flex size-10 items-center justify-center rounded-md text-ink-soft hover:bg-sand"
              aria-label="Nouvel article"
            >
              <Plus className="size-5" />
            </Link>
            <button
              onClick={() => void signOutAdmin().then(() => (window.location.href = "/"))}
              className="inline-flex size-10 items-center justify-center rounded-md text-ink-soft hover:bg-sand"
              aria-label="Se déconnecter"
            >
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto border-b border-line bg-paper px-2 py-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs",
                item.active
                  ? "bg-burgundy text-paper"
                  : "border border-line text-ink-soft",
              )}
            >
              <item.icon className="size-3.5" />
              {item.label}
            </Link>
          ))}
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}