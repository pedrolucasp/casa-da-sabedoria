import { cn } from '../lib/utils'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-400 focus:border-accent focus:ring-2 focus:ring-accent focus:ring-offset-0",
        className
      )}
      {...props}
    />
  )
}

