import { cn } from '../lib/utils'

export function Card({ children, className }) {
  return (
    <div className={cn("rounded-xl border border-neutral-200 bg-white p-4", className)}>
      {children}
    </div>
  )
}

