import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-burgundy text-paper hover:bg-burgundy-deep",
        inverse:
          "bg-paper text-ink hover:bg-sand",
        outline:
          "border border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-paper",
        ghost: "text-ink hover:bg-sand",
        whatsapp: "bg-wa text-paper hover:bg-wa/90",
      },
      size: {
        sm: "h-10 rounded-md px-4 text-xs tracking-wide",
        md: "h-12 rounded-md px-5 text-sm tracking-wide",
        lg: "h-14 rounded-lg px-7 text-sm tracking-[0.12em] uppercase",
        icon: "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
