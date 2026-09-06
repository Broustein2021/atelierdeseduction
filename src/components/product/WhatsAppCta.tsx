import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { productMessage, type Product } from "@/data/products";
import { generalInquiryText, waUrl } from "@/data/site";
import { cn } from "@/lib/utils";

export function WhatsAppCta({
  product,
  size,
  color,
  label = "Commander sur WhatsApp",
  className,
  variant = "whatsapp",
  ctaSize = "lg",
}: {
  product?: Product;
  size?: string;
  color?: string;
  label?: string;
  className?: string;
  variant?: "whatsapp" | "primary" | "inverse" | "outline";
  ctaSize?: "sm" | "md" | "lg";
}) {
  const href = waUrl(
    product ? productMessage(product, { size, color }) : generalInquiryText,
  );
  return (
    <Button asChild variant={variant} size={ctaSize} className={cn("w-full", className)}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="size-4" />
        {label}
      </a>
    </Button>
  );
}
