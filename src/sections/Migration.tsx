import { useEffect, useRef } from 'react'

/** "Entä jos minulla on jo toinen kassajärjestelmä?" — läppäri liukuu esiin. */
function Migration() {
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
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={rootRef} className="migrate relative overflow-hidden">
      {/* Taustakuva + tumma sävy */}
      <img
        src="/images/kuva%205.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-brown/80" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <h2 className="text-balance text-[1.1rem] font-bold leading-[1.2] text-beige sm:text-[1.35rem] md:text-[1.8rem]">
            Entä jos minulla on jo toinen kassajärjestelmä?
          </h2>
          <p className="mt-5 max-w-md text-lg text-beige/80">
            Ei hätää — me pidämme huolen datan siirrosta, niin että tiedot
            asiakkaistasi, tuotteistasi ja myyjistäsi pysyvät tallessa.
          </p>
        </div>

        <div className="migrate-laptop">
          <img
            src="/graphics/grafiikka-5.png"
            alt="ReSellon näkymä kannettavalla"
            className="mx-auto w-full max-w-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

export default Migration
