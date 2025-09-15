import { cn } from "../lib/utils"

export function Button({
  variant = "default",
  size = "default",
  className,
  disabled,
  ...props
}) {
  const base =
    "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    default:
      "cursor-pointer text-white bg-midnight hover:bg-midnight/90 focus:ring-accent",
    outline:
      "cursor-pointer border text-neutral-900 shadow hover:shadow-md focus:ring-black-400",
    subtle:
      "cursor-pointer text-slate-900 bg-alice hover:bg-alice/90 focus:ring-slate-900",
    danger:
      "cursor-pointer bg-red-600 text-white hover:bg-red-600/90 focus:ring-red-900"
  }

  const sizes = {
    default: "px-3 py-2 text-sm",
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-2 py-1",
    lg: "px-4 py-2 text-base",
    xl: "p-4"
  }

  // Variant-aware disabled styles
  const disabledVariants = {
    default: "bg-midnight/40 text-white/70 cursor-not-allowed",
    outline: "border-gray-300 text-gray-400 cursor-not-allowed",
    subtle: "bg-alice/50 text-slate-400 cursor-not-allowed",
    danger: "bg-red-400 text-white/70 cursor-not-allowed"
  }

  return (
    <button
      className={cn(
        base,
        disabled ? disabledVariants[variant] : variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
}

