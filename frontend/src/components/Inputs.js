import { cn } from '../lib/utils'

const baseClasses = "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-400 focus:border-midnight focus:ring-2 focus:ring-midnight focus:ring-offset-0";

export const TextArea = ({className, ...props}) => ( 
  <textarea
    className={cn(baseClasses, className)}
    {...props}
  />
);

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        baseClasses,
        className
      )}
      {...props}
    />
  )
}
