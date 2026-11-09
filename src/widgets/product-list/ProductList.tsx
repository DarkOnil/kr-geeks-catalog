import type { Product } from '../../entities/product/model/types'
import { ProductCard } from '../../entities/product/ui/ProductCard'

type Props = {
  products: Product[]
}

export function ProductList({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <p className="text-lg font-semibold text-slate-700">Ничего не найдено</p>
        <p className="mt-2 text-sm text-slate-500">
          Попробуйте изменить поиск или фильтр
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
