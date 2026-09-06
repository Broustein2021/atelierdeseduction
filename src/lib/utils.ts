import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCfa(amount: number): string {
  return `${amount.toLocaleString("fr-FR")}\u00a0F CFA`;
}
