interface Item {
  img: string
  title: string
  badge?: boolean
}

const items: Item[] = [
  {
    img: '/graphics/grafiikka-6.png',
    title: 'Aseta alennuksia, muuta varauksia ja lisää asiakkaita.',
  },
  {
    img: '/graphics/grafiikka-7.png',
    title: 'Koordinoi asiakkaita, varauksia ja tuotteita helposti.',
    badge: true,
  },
  {
    img: '/graphics/grafiikka-8.png',
    title: 'Helpot käteistilitykset ja käteisvirran ylläpito.',
  },
]

/** "Tässä on kassa" — kolme tablettinäkymää (grafiikat 6–8). */
function KassaShowcase() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.05rem] font-bold tracking-tight text-brown sm:text-[1.25rem] md:text-[1.7rem]">
            Tässä on kassa.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-brown/75">
            Nopea ja intuitiivinen — ei kilojen rautaa. Käteinen, kortti tai
            lähimaksu, aivan niin kuin haluat.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <div key={item.img} className="text-center">
              <div className="relative mx-auto w-full max-w-xs">
                <img
                  src={item.img}
                  alt=""
                  aria-hidden="true"
                  className="w-full"
                />
                {item.badge && (
                  <img
                    src="/graphics/grafiikka-9.png"
                    alt="Helppo työkalu"
                    className="absolute -right-1 -top-5 w-20 rotate-12 md:w-24"
                  />
                )}
              </div>
              <p className="mx-auto mt-5 max-w-[16rem] text-brown/80">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KassaShowcase
