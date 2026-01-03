import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-full hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)] hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        destructive:
          "bg-destructive text-destructive-foreground rounded-full hover:shadow-[0_10px_40px_-10px_hsl(var(--destructive)/0.5)] hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-border bg-transparent text-foreground rounded-full hover:bg-primary/5 hover:border-primary/50 hover:text-primary hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "text-foreground rounded-xl hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
        glass:
          "bg-card/40 backdrop-blur-xl border border-border/50 text-foreground rounded-full hover:bg-card/60 hover:border-primary/40 hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.3)] hover:scale-[1.02] active:scale-[0.98]",
        premium:
          "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-primary-foreground rounded-full hover:bg-[position:100%_0] hover:shadow-[0_10px_50px_-10px_hsl(var(--primary)/0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-500",
        magnetic:
          "bg-foreground text-background rounded-full hover:shadow-[0_20px_60px_-15px_hsl(var(--foreground)/0.4)] hover:scale-[1.05] active:scale-[0.95] before:absolute before:inset-0 before:rounded-full before:bg-primary before:scale-0 hover:before:scale-100 before:transition-transform before:duration-300 before:-z-10",
        glow:
          "bg-primary text-primary-foreground rounded-full shadow-[0_0_0_0_hsl(var(--primary)/0.4)] hover:shadow-[0_0_30px_5px_hsl(var(--primary)/0.4)] hover:scale-[1.02] active:scale-[0.98] animate-[pulse-glow_2s_ease-in-out_infinite]",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-cursor="button"
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
