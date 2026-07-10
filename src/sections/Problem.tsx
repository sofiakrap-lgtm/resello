import { CircleAlert } from 'lucide-react'

const points = [
  'Varaukset, tilitykset ja kassa hoituvat eri paikoissa tai paperilla.',
  'Ostajat eivät tiedä, mitä sinulta löytyy juuri nyt.',
  'Järjestelmä maksaa saman kaikille, koostasi riippumatta.',
]

function Problem() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
      <h2 className="text-[1.3rem] font-bold uppercase tracking-tight text-brown sm:text-[1.55rem]">
        Pyöritätkö kirpputoria vanhoilla työkaluilla?
      </h2>
      <ul className="mt-8 space-y-4">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-taupe" />
            <span className="text-lg text-brown/80">{point}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Problem
