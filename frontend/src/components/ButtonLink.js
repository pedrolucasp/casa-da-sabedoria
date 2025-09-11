import { cn } from "../lib/utils"

export function ButtonLink({ to, children, className }) {
  return (
    <a
      href={to}
      className={cn(
        "inline-flex items-center rounded-lg bg-midnight px-3 py-1.5 text-sm font-medium text-white hover:opacity-90",
        className
      )}
    >
      {children}
    </a>
  )
}
