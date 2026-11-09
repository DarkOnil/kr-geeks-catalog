import { useState } from 'react'
import { Heart, Menu, ShoppingBag, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../../features/toggle-favorite/model/FavoritesContext'
import { cn } from '../../shared/lib/cn'

const links = [
  { to: '/', label: 'Каталог' },
  { to: '/favorites', label: 'Избранное' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { favorites } = useFavorites()

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm font-semibold transition hover:text-emerald-600',
      isActive ? 'text-emerald-600' : 'text-slate-600',
    )

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900"
        >
          <span className="rounded-xl bg-emerald-600 p-2 text-white">
            <ShoppingBag size={19} />
          </span>
          Geeks<span className="text-emerald-600">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
              {link.to === '/favorites' && favorites.length > 0
                ? ` (${favorites.length})`
                : ''}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/favorites"
          className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 md:flex"
        >
          <Heart size={17} />
          Избранное
          <span className="text-indigo-600">{favorites.length}</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Открыть меню"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={navClass}
            >
              {link.label}
              {link.to === '/favorites' && favorites.length > 0
                ? ` (${favorites.length})`
                : ''}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
