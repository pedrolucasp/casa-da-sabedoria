import { cn } from "../lib/utils"
import { Button } from './Button'

export function ButtonLink({ to, children, variant = "default", size = "default", disabled = false, className, ...props }) {
  const base = "inline-flex transition cursor-pointer items-center rounded-lg font-medium text-white shadow"

  // TODO: Unify all this crap
  const variants = {
    default: "text-white bg-midnight hover:bg-midnight/90 focus:ring-accent hover:bg-midnight/90",
    outline:
      "border text-neutral-900 shadow hover:shadow-md focus:ring-black-400",
    subtle:
      "text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-300",
  }

  const sizes = {
    default: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2",
    xl: "p-4"
  }

  const states = {
    default: '',
    disabled: 'text-gray-300 border-gray-300'
  }

  return (
    // XXX: Jesus Christ, is this some new form of insanity?
    disabled ? (
      <Button variant={variant} size={size} disabled {...props} className="text-left">
        {children}
      </Button>
    ) : (
      <a
        href={to}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          states[disabled ? 'disabled' : 'default'],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </a>
    )
  )
}
