interface Deco {
  img: string
  tint: string
}

interface Row {
  img: string
  photo: string
  badge?: boolean
  title: string
  body: string
  bg: string
  reverse: boolean
  deco?: Deco
}

const g = (name: string) => encodeURI(`/graphics/${name}`)

const rows: Row[] = [
  {
    img: '/graphics/grafiikka-6.png',
    photo: '/images/kuva%203.jpg',
    title: 'Asiakkaat ja alennukset yhdessä näkymässä',
    body: 'Aseta alennuksia, muuta varauksia ja lisää asiakkaita ilman erillisiä työkaluja. Hallitset koko myymälää yhdestä näkymästä, jossa kaikki pysyy ajan tasalla eikä mikään jää roikkumaan eri järjestelmiin.',
    bg: 'bg-peach',
    reverse: false,
    deco: { img: g('grafiikka 2.svg'), tint: '#fdf7ec' },
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
    deco: { img: g('grafiikka 20.svg'), tint: '#fdf7ec' },
  },
]

/** Kolme vuorottelevaa riviä (kuva + pädi / teksti) + koristegrafiikat. */
function KassaShowcase() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mb-12 flex justify-center">
        <h2 className="rounded-full bg-[#5c4f42] px-8 py-3.5 text-center text-[1.05rem] font-bold text-white sm:text-[1.3rem] md:text-[1.6rem]">
          Kassa, varaus- ja asiakashallinta
        </h2>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
        {/* Pyörivä resello-merkki (grafiikka 15) keskellä rivien välissä */}
        <img
          src={g('grafiikka 15.svg')}
          alt=""
          aria-hidden="true"
          className="price-spin pointer-events-none absolute left-1/2 top-1/3 z-30 h-24 w-24 -translate-x-1/2 -translate-y-1/2 md:h-32 md:w-32"
        />

        {rows.map((row) => (
          <div
            key={row.img}
            className="reveal-item grid overflow-hidden rounded-lg md:grid-cols-2"
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
              className={`relative flex items-center overflow-hidden px-6 py-10 text-brown md:px-12 md:py-14 ${row.bg}`}
            >
              {row.deco && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 md:h-56 md:w-56"
                  style={{
                    backgroundColor: row.deco.tint,
                    WebkitMaskImage: `url("${row.deco.img}")`,
                    maskImage: `url("${row.deco.img}")`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                  }}
                />
              )}
              <div className="relative z-10">
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
