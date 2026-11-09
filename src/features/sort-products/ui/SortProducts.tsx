import { Select } from '../../../shared/ui/Select'
import type { SortOption } from '../../../shared/types/common'

type Props = {
  value: SortOption
  onChange: (value: SortOption) => void
}

const options = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Сначала дешёвые' },
  { value: 'price-desc', label: 'Сначала дорогие' },
]

export function SortProducts({ value, onChange }: Props) {
  return (
    <Select
      options={options}
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      aria-label="Сортировка"
    />
  )
}
