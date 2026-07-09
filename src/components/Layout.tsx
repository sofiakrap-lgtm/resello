import { NavLink, Outlet } from 'react-router-dom'
import { Barcode, Home, Store } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Etusivu', icon: Home, end: true },
  { to: '/barcode', label: 'Viivakoodi', icon: Barcode, end: false },
]

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-6 px-4 py-4">
          <div className="flex items-center gap-2 font-semibold">
            <Store className="h-5 w-5 text-indigo-600" />
            <span>Resello</span>
          </div>
          <nav className="flex gap-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
