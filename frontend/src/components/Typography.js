import { cn } from "../lib/utils"

export const H1 = ({ children, variant = "default", className, ...props }) => {
  const base = "font-semibold text-neutral-900"

  const variants = {
    'default': 'text-2xl',
    'hero': 'text-4xl'
  }

  return (
    <h1 className={cn(base, variants[variant], className)} {...props}>{children}</h1>
  )
}

export const H2 = ({ children }) => (
  <h2 className="text-xl font-semibold text-neutral-900">{children}</h2>
)

export const P = ({ children }) => (
  <p className="text-sm text-neutral-600">{children}</p>
)
