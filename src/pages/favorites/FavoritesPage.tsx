import { Link } from 'react-router-dom'
import { useFavorites } from '../../features/toggle-favorite/model/FavoritesContext'
import { ProductList } from '../../widgets/product-list/ProductList'
import { Button } from '../../shared/ui/Button'

export function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Избранное
        </h1>
        <p className="mt-2 text-slate-500">
          {favorites.length > 0
            ? `Сохранено товаров: ${favorites.length}`
            : 'Здесь будут товары, которые вы добавите в избранное'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="mb-4 text-lg font-semibold text-slate-700">
            Список избранного пуст
          </p>
          <Link to="/">
            <Button>Перейти в каталог</Button>
          </Link>
        </div>
      ) : (
        <ProductList products={favorites} />
      )}
    </section>
  )
}
