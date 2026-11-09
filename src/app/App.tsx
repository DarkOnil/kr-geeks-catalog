import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './providers/AppProvider'
import { CatalogPage } from '../pages/catalog/CatalogPage'
import { ProductPage } from '../pages/product/ProductPage'
import { FavoritesPage } from '../pages/favorites/FavoritesPage'
import { Header } from '../widgets/header/Header'

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Header />
          <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="mt-12 border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
              <p>&copy; 2026 Geeks. Все права защищены.</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
