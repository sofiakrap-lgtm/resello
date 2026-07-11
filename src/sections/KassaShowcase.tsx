interface Row {
  img: string
  photo: string
  badge?: boolean
  title: string
  body: string
  bg: string
  reverse: boolean
}

const rows: Row[] = [
  {
    img: '/graphics/grafiikka-6.png',
    photo: '/images/kuva%203.jpg',
    title: 'Asiakkaat ja alennukset yhdessä näkymässä',
    body: 'Aseta alennuksia, muuta varauksia ja lisää asiakkaita ilman erillisiä työkaluja. Hallitset koko myymälää yhdestä näkymästä, jossa kaikki pysyy ajan tasalla eikä mikään jää roikkumaan eri järjestelmiin.',
    bg: 'bg-peach',
    reverse: false,
  },
  {
    img: '/graphics/grafiikka-7.png',
    photo: '/images/kuva%206.jpg',
    badge: true,
    title: 'Tilitykset ja käteisvirta hallinnassa',
    body: 'Helpot käteistilitykset ja selkeä näkymä käteisvirtaan. Näet kassavirran reaaliajassa ja teet myyjien tilitykset muutamalla klikkauksella, ilman käsityötä tai Excel-taulukoita.',
    bg: 'bg-sage',
    reverse: true,
  },
  {
    img: '/graphics/grafiikka-8.png',
    photo: '/images/kuva%202.jpg',
    title: 'Varaukset ja paikat järjestyksessä',
    body: 'Koordinoi varauksia, paikkoja ja tuotteita helposti. Kaikki tiedot löytyvät samasta paikasta ja pysyvät ajan tasalla, joten myymälän arki pysyy hallinnassa ruuhkaisimpanakin päivänä.',
    bg: 'bg-bluegrey',
    reverse: false,
  },
]

/** "Tässä on kassa." — kolme vuorottelevaa riviä (kuva + pädi / teksti). */
function KassaShowcase() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[1.1rem] font-bold tracking-tight text-brown sm:text-[1.35rem] md:text-[1.9rem]">
          Tässä on kassa.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-brown/75">
          Nopea ja intuitiivinen, ei kilojen rautaa. Käteinen, kortti tai
          lähimaksu, aivan niin kuin haluat.
        </p>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-6">
        {rows.map((row) => (
          <div
            key={row.img}
            className="reveal-item grid overflow-hidden rounded-3xl md:grid-cols-2"
          >
            {/* Kuva + pädi */}
            <div
              className={`relative min-h-[16rem] overflow-hidden md:min-h-[22rem] ${
                row.reverse ? 'md:order-2' : ''
              }`}
            >
              <img
                src={row.photo}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-brown/40" />
              <div className="relative flex h-full items-center justify-center p-6 md:p-10">
                <img
                  src={row.img}
                  alt="ReSellon näkymä tabletilla"
                  className="w-full max-w-sm drop-shadow-2xl"
                />
                {row.badge && (
                  <img
                    src="/graphics/grafiikka-9.png"
                    alt="Helppo työkalu"
                    className="absolute right-4 top-4 w-16 rotate-12 md:w-20"
                  />
                )}
              </div>
            </div>

            {/* Teksti */}
            <div
              className={`flex items-center px-6 py-10 text-brown md:px-12 md:py-14 ${row.bg}`}
            >
              <div>
                <h3 className="text-balance text-[1.05rem] font-bold leading-[1.25] sm:text-[1.25rem] md:text-[1.5rem]">
                  {row.title}
                </h3>
                <p className="mt-4 leading-relaxed text-brown/80">{row.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default KassaShowcase
