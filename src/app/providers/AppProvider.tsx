import type { ReactNode } from 'react'
import { FavoritesProvider } from '../../features/toggle-favorite/model/FavoritesContext'

export function AppProvider({ children }: { children: ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>
}
