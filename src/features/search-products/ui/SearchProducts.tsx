import { Input } from '../../../shared/ui/Input'

type Props = {
  value: string
  onChange: (value: string) => void
}

export function SearchProducts({ value, onChange }: Props) {
  return (
    <Input
      type="search"
      placeholder="Поиск по названию..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Поиск товаров"
    />
  )
}
