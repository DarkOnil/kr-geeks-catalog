import { useEffect, useMemo, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { getCategories, getProducts } from '../../entities/product/api/productApi'
import type { Product } from '../../entities/product/model/types'
import type { SortOption } from '../../shared/types/common'
import { SearchProducts } from '../../features/search-products/ui/SearchProducts'
import { FilterProducts } from '../../features/filter-products/ui/FilterProducts'
import { SortProducts } from '../../features/sort-products/ui/SortProducts'
import { ProductList } from '../../widgets/product-list/ProductList'

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<SortOption>('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError('')
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch {
        setError(
          'Не удалось загрузить товары. Проверьте подключение к интернету и обновите страницу.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Фильтрация и сортировка
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesCategory =
        category === 'all' || product.category === category
      return matchesSearch && matchesCategory
    })

    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, search, category, sort])

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Каталог товаров
        </h1>
        <p className="mt-2 text-slate-500">
          Найдите нужный товар с помощью поиска и фильтров
        </p>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SearchProducts value={search} onChange={setSearch} />
        <FilterProducts
          categories={categories}
          value={category}
          onChange={setCategory}
        />
        <SortProducts value={sort} onChange={setSort} />
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-3 py-20 text-slate-500">
          <LoaderCircle className="animate-spin" size={24} />
          <span>Загрузка товаров...</span>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center text-rose-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="mb-4 text-sm text-slate-500">
            Найдено: {filteredProducts.length}
          </p>
          <ProductList products={filteredProducts} />
        </>
      )}
    </section>
  )
}
