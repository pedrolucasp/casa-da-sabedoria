import { cn } from "../lib/utils"

export function Button({ variant = "default", size = "default", className, disabled, ...props }) {
  const base =
    "rounded-lg transition font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variants = {
    default: "text-white bg-midnight hover:bg-midnight/90 focus:ring-accent",
    outline:
      "border text-neutral-900 shadow hover:shadow-md focus:ring-black-400",
    subtle:
      "text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-300",
  }

  const sizes = {
    default: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: "p-4"
  }

  const states = {
    default: '',
    disabled: 'text-gray-300 border-gray-300 hover:shadow'
  }

  //const sizes = {
  //  default: "px-3 py-1.5 text-sm",
  //  lg: "px-4 py-2",
  //  xl: "p-4"
  //}

  return (
    <button className={cn(
      base,
      variants[variant],
      sizes[size],
      states[disabled ? 'disabled' : 'default'],
      className
    )} disabled={disabled} {...props} />
  )
}

