import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../model/types'
import { useFavorites } from '../../../features/toggle-favorite/model/FavoritesContext'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(product.id)

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg">
      <div className="relative flex h-52 items-center justify-center bg-slate-100 p-5">
        <Link to={`/product/${product.id}`} className="flex h-full w-full items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </Link>

        <button
          type="button"
          aria-label={favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          onClick={() => toggleFavorite(product)}
          className="absolute right-3 top-3 rounded-full bg-white p-2 text-slate-500 shadow-sm transition hover:text-rose-500"
        >
          <Heart
            size={19}
            fill={favorite ? 'currentColor' : 'none'}
            className={favorite ? 'text-rose-500' : ''}
          />
        </button>

        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-lg bg-rose-500 px-2 py-1 text-xs font-bold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 min-h-[3rem] text-base font-semibold text-slate-900 hover:text-indigo-600">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-slate-900">${product.price}</p>
          <p className="text-sm text-amber-500">★ {product.rating}</p>
        </div>
      </div>
    </article>
  )
}
