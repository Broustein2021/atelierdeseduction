import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <img
      src="/images/brand/logo.jpg"
      alt=""
      width={1000}
      height={993}
      className={cn("w-auto object-contain", className)}
      draggable={false}
    />
  );
}

export function Logo({
  className,
  stacked = false,
  to = "/",
}: {
  className?: string;
  stacked?: boolean;
  to?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center gap-3.5 text-ink no-underline",
        stacked && "flex-col gap-1",
        className,
      )}
      aria-label="L'Atelier de la Séduction — accueil"
    >
      <Monogram className={stacked ? "h-12" : "h-9"} />
      <span
        className={cn(
          "font-display tracking-[0.18em] uppercase text-ink",
          stacked
            ? "text-center text-[10px]"
            : "hidden leading-none sm:flex sm:flex-col sm:gap-0.5",
        )}
      >
        <span className="whitespace-nowrap">L'Atelier</span>
        <span className="block whitespace-nowrap text-[9px] tracking-[0.22em] text-muted">
          de la Séduction
        </span>
      </span>
    </Link>
  );
}
