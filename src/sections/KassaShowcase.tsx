import { useEffect, useRef } from 'react'

interface Item {
  img: string
  title: string
  badge?: boolean
}

const items: Item[] = [
  {
    img: '/graphics/grafiikka-6.png',
    title:
      'Aseta alennuksia, muuta varauksia ja lisää asiakkaita. Hallitset koko myymälää yhdestä näkymästä ilman erillisiä työkaluja tai päällekkäistä kirjanpitoa.',
  },
  {
    img: '/graphics/grafiikka-7.png',
    title:
      'Koordinoi asiakkaita, varauksia ja tuotteita helposti. Kaikki tiedot löytyvät samasta paikasta ja pysyvät ajan tasalla reaaliajassa.',
    badge: true,
  },
  {
    img: '/graphics/grafiikka-8.png',
    title:
      'Helpot käteistilitykset ja käteisvirran ylläpito. Näet kassavirran reaaliajassa ja teet tilitykset muutamalla klikkauksella, ilman käsityötä.',
  },
]

/** "Tässä on kassa." — kolme tablettinäkymää (grafiikat 6-8). */
function KassaShowcase() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={rootRef} className="kassa px-6 pb-12 pt-20 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal-item mx-auto max-w-2xl text-center">
          <h2 className="text-[1.05rem] font-bold tracking-tight text-brown sm:text-[1.25rem] md:text-[1.7rem]">
            Tässä on kassa.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-brown/75">
            Nopea ja intuitiivinen, ei kilojen rautaa. Käteinen, kortti tai
            lähimaksu, aivan niin kuin haluat.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => (
            <div key={item.img} className="text-center">
              <div
                className="kassa-tablet relative mx-auto w-full max-w-xs"
                style={{ transitionDelay: `${i * 140}ms` }}
              >
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
                    className="kassa-badge-anim absolute -right-5 -top-8 w-20 md:w-24"
                  />
                )}
              </div>
              <p className="mx-auto mt-5 max-w-xs text-brown/80">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KassaShowcase
