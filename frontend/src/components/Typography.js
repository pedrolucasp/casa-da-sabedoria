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

export const H2 = ({ children, className }) => (
  <h2 className={cn("text-xl font-semibold text-neutral-900", className)}>{children}</h2>
)

export const H3 = ({ children, className }) => (
  <h3 className={cn("text-md font-semibold text-neutral-900", className)}>{children}</h3>
)

export const P = ({ children, className }) => (
  <p className={cn("text-sm text-neutral-600", className)}>{children}</p>
)
