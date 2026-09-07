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
        d="M38 7 L23 45 M38 7 L50 45 M27.5 33 H43 M20 45 H26 M47 45 H53"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 2.2 L40.4 6.6 L38 11 L35.6 6.6 Z"
        fill="currentColor"
      />
      <path
        d="M65 11 C67 7.5 73 7 75.5 9.5 C78 12 77.5 15.5 74.5 17.5 C68.5 22 59.5 25 58.5 30 C57.5 35.5 62.5 40 69 40 C73.5 40 77.5 37 78 33.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 47.5 H74"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
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
