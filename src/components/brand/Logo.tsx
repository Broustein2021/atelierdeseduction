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
        d="M22 8 L26 16 L22 16.8 L30 44 H24.2 L22.4 36.6 H11.6 L9.8 44 H4 L16.2 8 H22 Z M12.9 31.6 H21.1 L17 16.2 H16.9 L12.9 31.6 Z"
        fill="currentColor"
      />
      <path
        d="M36 14 C36 14 29.5 24.5 29.5 31.2 C29.5 35.8 32.4 38.8 36 38.8 C39.6 38.8 42.5 35.8 42.5 31.2 C42.5 24.5 36 14 36 14 Z"
        fill="currentColor"
      />
      <path
        d="M22 4.2 L24.4 8.6 L22 13 L19.6 8.6 Z"
        fill="currentColor"
      />
      <path
        d="M58 16.2 C64.6 16.2 69 19.8 69 25.2 C69 29.2 66.4 31.6 61.8 32.8 L69.6 44 H63.2 L56.2 33.4 H52.4 V44 H47 V8.4 H58 Z M52.4 16.2 V28.4 H57.4 C61.1 28.4 63.4 27 63.4 24.2 C63.4 21.4 61.1 16.2 57.2 16.2 H52.4 Z"
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
