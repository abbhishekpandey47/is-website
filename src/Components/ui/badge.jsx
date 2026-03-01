import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-[rgba(255,255,255,0.1)]",
        // Status pill variants with accent colors
        "status-live":
          "border-[rgba(52,211,153,0.2)] bg-[rgba(52,211,153,0.1)] text-[#34d399]",
        "status-pending":
          "border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.1)] text-[#fbbf24]",
        "status-review":
          "border-[rgba(147,130,255,0.2)] bg-[rgba(147,130,255,0.1)] text-[#9382ff]",
        "status-error":
          "border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.1)] text-[#f87171]",
        "status-info":
          "border-[rgba(96,165,250,0.2)] bg-[rgba(96,165,250,0.1)] text-[#60a5fa]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
