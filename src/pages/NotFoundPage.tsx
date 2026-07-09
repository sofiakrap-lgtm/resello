import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-beige px-6 text-center">
      <p className="text-6xl font-bold text-taupe">404</p>
      <h1 className="text-2xl font-bold text-brown">Sivua ei löytynyt</h1>
      <Link
        to="/"
        className="rounded-full border border-brown px-6 py-3 font-medium text-brown transition-colors hover:bg-brown/5"
      >
        Takaisin etusivulle
      </Link>
    </div>
  )
}

export default NotFoundPage
