import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../../../entities/product/model/types'

type FavoritesContextValue = {
  favorites: Product[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (product: Product) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

const STORAGE_KEY = 'geeks-favorites'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as Product[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  function isFavorite(id: number) {
    return favorites.some((item) => item.id === id)
  }

  function toggleFavorite(product: Product) {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === product.id)
      if (exists) {
        return current.filter((item) => item.id !== product.id)
      }
      return [...current, product]
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
