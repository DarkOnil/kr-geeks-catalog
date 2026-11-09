import { Select } from '../../../shared/ui/Select'

type Props = {
  categories: string[]
  value: string
  onChange: (value: string) => void
}

// Перевод категорий на русский
const categoryNames: Record<string, string> = {
  smartphones: 'Смартфоны',
  laptops: 'Ноутбуки',
  fragrances: 'Парфюмерия',
  skincare: 'Уход за кожей',
  groceries: 'Продукты',
  'home-decoration': 'Декор для дома',
  furniture: 'Мебель',
  tops: 'Платья',
  'womens-dresses': 'Женские платья',
  'womens-shoes': 'Женская обувь',
  'mens-shirts': 'Мужские рубашки',
  'mens-shoes': 'Мужская обувь',
  'mens-watches': 'Мужские часы',
  'womens-watches': 'Женские часы',
  'womens-bags': 'Женские сумки',
  'womens-jewellery': 'Женские украшения',
  sunglasses: 'Очки',
  automotive: 'Автотовары',
  motorcycle: 'Мотоциклы',
  lighting: 'Освещение',
  'mobile-accessories': 'Мобильные аксессуары',
  'kitchen-accessories': 'Кухонные принадлежности',
  tablets: 'Планшеты',
  beauty: 'Косметика',
  vehicle: 'Транспортные средства',
  'skin-care': 'Уход за кожей',
  'sports-accessories': 'Спортивные аксессуары',
}

export function FilterProducts({ categories, value, onChange }: Props) {
  const options = [
    { value: 'all', label: 'Все категории' },
    ...categories.map((cat) => ({
      value: cat,
      label: categoryNames[cat] || cat,
    })),
  ]

  return (
    <Select
      options={options}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Фильтр по категории"
    />
  )
}