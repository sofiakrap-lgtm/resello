import { ArrowLeftRight, GraduationCap, LifeBuoy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Card {
  icon: LucideIcon
  title: string
  body: string
  bg: string
}

const cards: Card[] = [
  {
    icon: ArrowLeftRight,
    title: 'Siirrämme datan',
    body: 'Siirrämme vanhan järjestelmäsi tiedot asiakkaista, tuotteista ja myyjistä puolestasi. Sinun ei tarvitse aloittaa tyhjästä, eikä mitään katoa matkalla.',
    bg: 'bg-bluegrey',
  },
  {
    icon: GraduationCap,
    title: 'Koulutamme',
    body: 'Saat kattavan koulutusmateriaalin sekä videot ja ohjekirjat. Niiden avulla sinä ja henkilökuntasi opitte käyttämään ReSelloa nopeasti ja varmasti.',
    bg: 'bg-peach',
  },
  {
    icon: LifeBuoy,
    title: 'Autamme',
    body: 'Olemme tukenasi koko matkan ajan. Autamme käyttöönotossa ja vastaamme kysymyksiin aina kun tarvitset, jotta arki sujuu ilman katkoja.',
    bg: 'bg-sage',
  },
]

/** "Jännittääkö siirto tai käyttöönotto?" — kolme väritettyä laatikkoa. */
function Onboarding() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[1.1rem] font-bold leading-[1.2] text-brown sm:text-[1.35rem] md:text-[1.9rem]">
            Jännittääkö siirto tai käyttöönotto?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-brown/75">
            Ei hätää. Autamme sinut alkuun joka askeleella, jotta vaihto sujuu
            kevyesti ja ilman huolta.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={c.title}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`reveal-item flex flex-col items-center rounded-3xl p-8 text-center text-card ${c.bg}`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card/20">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-card/90">{c.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Onboarding
