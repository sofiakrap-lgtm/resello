import { Link } from 'react-router-dom'
import { ArrowRight, Barcode } from 'lucide-react'

function Hero() {
  return (
    <section className="py-12 text-center sm:py-16">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
        <Barcode className="h-3.5 w-3.5" />
        Jälleenmyynnin käyttöjärjestelmä
      </span>
      <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Myy enemmän, hallitse vähemmän
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
        Resello on jälleenmyyjien työkalu, joka hoitaa inventaarion,
        viivakoodit ja myyntikanavat yhdessä paikassa.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <a
          href="#ominaisuudet"
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Tutustu ominaisuuksiin
          <ArrowRight className="h-4 w-4" />
        </a>
        <Link
          to="/demo"
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Kokeile demoa
        </Link>
      </div>
    </section>
  )
}

export default Hero
