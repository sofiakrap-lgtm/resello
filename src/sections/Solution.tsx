import { useState } from 'react'

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
  // Näyttää /images/app-screenshot.webp jos se on lisätty, muuten paikanpitäjän.
  const [showAppImage, setShowAppImage] = useState(true)

  return (
    <section id="ominaisuudet" className="scroll-mt-24 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-brown sm:text-4xl">
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
          <div className="overflow-hidden rounded-3xl bg-peach/35">
            <img
              src="/images/kuva.jpg"
              alt="ReSello-sovellus puhelimessa kirpputorilla"
              onError={() => setShowAppImage(false)}
              className={`aspect-[4/5] w-full object-cover ${
                showAppImage ? '' : 'hidden'
              }`}
            />
            {!showAppImage && (
              <div className="flex aspect-[4/5] items-center justify-center text-brown/40">
                <span className="text-xs font-medium uppercase tracking-widest">
                  Sovellusnäkymä
                </span>
              </div>
            )}
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
