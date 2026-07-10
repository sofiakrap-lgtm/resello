import { useState } from 'react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Mitä ReSello maksaa?',
    a: 'Hinta porrastuu myyntipaikkojen määrän mukaan, alkaen 99 €/kk. Tilitykset sisältyvät hintaan ja käyttöönotto on maksuton.',
  },
  {
    q: 'Entä jos minulla on jo toinen kassajärjestelmä?',
    a: 'Hoidamme datan siirron puolestasi, niin että tiedot asiakkaista, tuotteista ja myyjistä pysyvät tallessa.',
  },
  {
    q: 'Tarvitsenko erityistä laitteistoa?',
    a: 'Et. ReSello toimii tabletilla tai tietokoneella — ei kilojen rautaa. Käteinen, kortti ja lähimaksu onnistuvat kaikki.',
  },
  {
    q: 'Miten myyjien tilitykset hoituvat?',
    a: 'Automaattisesti järjestelmän kautta, ilman käsityötä ja Excel-taulukoita.',
  },
  {
    q: 'Saako käyttöönottoon tukea?',
    a: 'Kyllä. Saat koulutusmateriaalin, videot ja ohjekirjat sekä henkilökunnan opastuksen koko matkan ajan.',
  },
  {
    q: 'Miten pääsen alkuun?',
    a: 'Varaa maksuton esittely, niin näytämme miten ReSello toimii juuri sinun kirpputorillasi.',
  },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-[1.05rem] font-bold tracking-tight text-brown sm:text-[1.25rem] md:text-[1.7rem]">
          Usein kysyttyä
        </h2>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-brown/15 bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-inset md:px-6"
                >
                  <span className="text-base font-medium text-brown md:text-lg">
                    {item.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-brown transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-brown/75 md:px-6">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Faq
