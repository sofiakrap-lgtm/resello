import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Resello</h1>
      <p className="max-w-prose text-slate-600">
        Frontend-runko pystyssä: React 19, React Router 7, TypeScript, Tailwind
        CSS v4 ja Vite 7. Ikonit tulevat lucide-reactista ja viivakoodit
        jsbarcodesta.
      </p>
      <Link
        to="/barcode"
        className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Kokeile viivakoodia
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export default HomePage
