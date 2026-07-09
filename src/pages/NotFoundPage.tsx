import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="space-y-4 text-center">
      <p className="text-6xl font-bold text-slate-300">404</p>
      <h1 className="text-xl font-semibold">Sivua ei löytynyt</h1>
      <Link to="/" className="text-indigo-600 hover:underline">
        Takaisin etusivulle
      </Link>
    </section>
  )
}

export default NotFoundPage
