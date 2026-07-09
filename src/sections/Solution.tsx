import { CalendarCheck, TrendingUp, Search, LayoutGrid } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Eyebrow from '../components/Eyebrow.tsx'

interface Card {
  icon: LucideIcon
  title: string
  description: string
}

const cards: Card[] = [
  {
    icon: CalendarCheck,
    title: 'Varaukset ja kassa samassa',
    description:
      'Myyntipaikkojen varaus, myymäläkartta, viivakoodit ja tilitykset ilman käsityötä.',
  },
  {
    icon: TrendingUp,
    title: 'Näet myynnin reaaliajassa',
    description:
      'Käyttöaste, myynnin kehitys ja tuotot yhdellä silmäyksellä.',
  },
  {
    icon: Search,
    title: 'Ostajat löytävät sinut',
    description:
      'Haku ohjaa ostajat kirpputorillesi ja näyttää, mitä sinulta löytyy juuri nyt.',
  },
  {
    icon: LayoutGrid,
    title: 'Kaikki yhdessä',
    description:
      'Myynti, kirjanpito, asiakashallinta ja some samasta näkymästä.',
  },
]

function Solution() {
  return (
    <section id="ominaisuudet" className="scroll-mt-24 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow>Ratkaisu</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brown sm:text-4xl">
            Yksi järjestelmä koko kirpputorille.
          </h2>
          <p className="mt-5 text-lg text-brown/75">
            ReSello yhdistää myyntipaikkojen varaukset, kassan, myyjien
            tilitykset ja reaaliaikaisen seurannan. Ei asennuksia, toimii millä
            tahansa laitteella selaimessa.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-brown/10 bg-card p-7"
            >
              <div className="inline-flex rounded-xl bg-peach/40 p-3 text-brown">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-brown">{title}</h3>
              <p className="mt-2 text-brown/75">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solution
