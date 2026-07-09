import { Link, NavLink, Outlet } from 'react-router-dom'
import { Store } from 'lucide-react'

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Store className="h-5 w-5 text-indigo-600" />
            <span>Resello</span>
          </Link>
          <nav className="flex items-center gap-1">
            <a
              href="/#ominaisuudet"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              Ominaisuudet
            </a>
            <NavLink
              to="/demo"
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Demo
            </NavLink>
            <a
              href="#"
              className="ml-1 rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Aloita
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Store className="h-4 w-4 text-indigo-600" />
            Resello
          </span>
          <span>© {new Date().getFullYear()} Resello</span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
