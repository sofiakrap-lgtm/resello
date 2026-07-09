import Eyebrow from '../components/Eyebrow.tsx'

interface Item {
  title: string
  description: string
}

const items: Item[] = [
  {
    title: 'Varaukset ja kassa samassa',
    description:
      'Myyntipaikkojen varaus, myymäläkartta, viivakoodit ja tilitykset ilman käsityötä.',
  },
  {
    title: 'Näet myynnin reaaliajassa',
    description: 'Käyttöaste, myynnin kehitys ja tuotot yhdellä silmäyksellä.',
  },
  {
    title: 'Ostajat löytävät sinut',
    description:
      'Haku ohjaa ostajat kirpputorillesi ja näyttää, mitä sinulta löytyy juuri nyt.',
  },
  {
    title: 'Kaikki yhdessä',
    description: 'Myynti, kirjanpito, asiakashallinta ja some samasta näkymästä.',
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

        <div className="mt-12 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Vasen: sovellusnäkymän paikka */}
          <div className="flex items-center justify-center rounded-3xl bg-peach/35 p-8 md:p-12">
            <div className="relative flex aspect-[9/19] w-52 items-center justify-center rounded-[2rem] border-8 border-brown bg-beige">
              <span className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full bg-brown/30" />
              <span className="text-xs font-medium uppercase tracking-widest text-brown/40">
                Sovellusnäkymä
              </span>
            </div>
          </div>

          {/* Oikea: jaoteltu lista */}
          <ul className="border-t border-brown/15">
            {items.map((item) => (
              <li key={item.title} className="border-b border-brown/15 py-6">
                <h3 className="text-xl font-bold text-brown">{item.title}</h3>
                <p className="mt-1.5 text-brown/75">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Solution
