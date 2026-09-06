import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { generalInquiryText, waUrl } from "@/data/site";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/boutique", label: "Boutique" },
  { to: "/a-propos", label: "L'Atelier" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-200",
        scrolled || open
          ? "border-b border-line bg-cream/95 backdrop-blur-md"
          : "border-b border-transparent bg-cream",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-[13px] tracking-[0.16em] uppercase transition-colors",
                pathname === item.to ||
                  (item.to === "/boutique" && pathname.startsWith("/produit")) ||
                  (item.to !== "/boutique" && pathname.startsWith(item.to))
                  ? "text-burgundy"
                  : "text-ink-soft hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="whatsapp" className="hidden sm:inline-flex">
            <a
              href={waUrl(generalInquiryText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-3.5" />
              WhatsApp
            </a>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-ink md:hidden"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-cream md:hidden">
          <nav className="flex flex-col px-4 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex h-12 items-center border-b border-line/70 text-sm tracking-[0.14em] uppercase text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={waUrl(generalInquiryText)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-wa text-sm text-paper"
            >
              <WhatsAppIcon className="size-4" />
              Écrire sur WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
