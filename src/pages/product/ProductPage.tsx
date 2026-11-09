import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, LoaderCircle, ArrowLeft } from 'lucide-react'
import { getProductById } from '../../entities/product/api/productApi'
import type { Product } from '../../entities/product/model/types'
import { useFavorites } from '../../features/toggle-favorite/model/FavoritesContext'
import { Button } from '../../shared/ui/Button'

export function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    async function loadProduct() {
      if (!id) return

      try {
        setLoading(true)
        setError('')
        const data = await getProductById(Number(id))
        setProduct(data)
      } catch {
        setError('Товар не найден')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-20 text-slate-500">
        <LoaderCircle className="animate-spin" size={24} />
        <span>Загрузка товара...</span>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
        <p className="mb-4 text-rose-700">{error || 'Товар не найден'}</p>
        <Link to="/">
          <Button variant="secondary">Вернуться в каталог</Button>
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(product.id)

  return (
    <section>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={16} />
        Назад в каталог
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-8">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-400">
            {product.category}
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-slate-900">
            {product.title}
          </h1>

          <div className="mb-4 flex items-center gap-4">
            <p className="text-3xl font-bold text-slate-900">${product.price}</p>
            {product.discountPercentage > 0 && (
              <span className="rounded-lg bg-rose-100 px-2 py-1 text-sm font-semibold text-rose-600">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <p className="mb-2 text-sm text-amber-500">★ {product.rating} / 5</p>
          <p className="mb-6 text-sm text-slate-500">В наличии: {product.stock} шт.</p>

          <p className="mb-8 leading-relaxed text-slate-600">
            {product.description}
          </p>

          <Button
            onClick={() => toggleFavorite(product)}
            variant={favorite ? 'secondary' : 'primary'}
            size="lg"
          >
            <Heart
              size={18}
              fill={favorite ? 'currentColor' : 'none'}
              className={favorite ? 'text-rose-500' : ''}
            />
            {favorite ? 'В избранном' : 'Добавить в избранное'}
          </Button>
        </div>
      </div>
    </section>
  )
}
