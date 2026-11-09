import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Option = {
  value: string
  label: string
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[]
}

export function Select({ className, options, ...props }: Props) {
  return (
    <select
      className={cn(
        'w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100',
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
