interface Card {
  title: string
  body: string
  bg: string
  text: string
}

const cards: Card[] = [
  {
    title: 'Siirrämme datan',
    body: 'Siirrämme vanhan järjestelmäsi tiedot asiakkaista, tuotteista ja myyjistä puolestasi. Sinun ei tarvitse aloittaa tyhjästä, eikä mitään katoa matkalla.',
    bg: 'bg-bluegrey',
    text: 'text-brown',
  },
  {
    title: 'Koulutamme',
    body: 'Saat kattavan koulutusmateriaalin sekä videot ja ohjekirjat. Niiden avulla sinä ja henkilökuntasi opitte käyttämään ReSelloa nopeasti ja varmasti.',
    bg: 'bg-peach',
    text: 'text-brown',
  },
  {
    title: 'Autamme',
    body: 'Olemme tukenasi koko matkan ajan. Autamme käyttöönotossa ja vastaamme kysymyksiin aina kun tarvitset, jotta arki sujuu ilman katkoja.',
    bg: 'bg-sage',
    text: 'text-brown',
  },
]

/** "Jännittääkö siirto tai käyttöönotto?" — kolme väritettyä laatikkoa. */
function Onboarding() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-[1.1rem] font-bold leading-[1.2] text-brown sm:text-[1.35rem] md:text-[1.9rem]">
          Jännittääkö siirto tai käyttöönotto?
        </h2>

        <div className="reveal mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={c.title}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`reveal-item flex flex-col rounded-3xl p-8 ${c.bg} ${c.text}`}
            >
              <span className="text-4xl font-bold tabular-nums opacity-40">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-brown/80">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Onboarding
