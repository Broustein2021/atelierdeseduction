import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 92 52"
      className={cn("text-current", className)}
      aria-hidden="true"
    >
      <path
        d="M36 6 L18 45 M36 6 L47 45 M30.5 11.5 H41.5 M23.5 31.5 L42.5 33 M12 45 H24 M43 45 H50"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 1.8 L36.5 6.4 L34 11 L31.5 6.4 Z"
        fill="currentColor"
      />
      <path
        d="M66 11 C68 7.6 73.6 7.2 76 9.6 C78.4 12 78 15.4 75 17.4 C69 22 60 24.6 59 29.6 C58 34.6 62.8 39.6 69.2 39.6 C73.8 39.6 77.8 36.6 78.2 33"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 46.6 H74"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M22 45.2 V48 M74 45.2 V48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M53 44.6 L55.3 46.6 L53 48.6 L50.7 46.6 Z"
        fill="currentColor"
      />
    </svg>
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
      <Monogram className={cn(stacked ? "h-12 w-20" : "h-9 w-16")} />
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
