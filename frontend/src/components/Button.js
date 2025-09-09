import { cn } from "../lib/utils"

export function Button({ variant = "default", className, ...props }) {
  const base =
    "px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variants = {
    default: "text-white bg-midnight hover:bg-midnight-600 focus:ring-accent",
    outline:
      "border-3 border-neutral-200 text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-400",
    subtle:
      "text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-300",
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  )
}

