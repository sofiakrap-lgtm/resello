import { useEffect, useRef } from 'react'

/** "Entä jos minulla on jo toinen kassajärjestelmä?" — teksti vasemmalla,
 *  kuva + läppäri oikealla puolikkaalla. */
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
    <section ref={rootRef} className="migrate grid md:grid-cols-2">
      {/* Vasen puolikas: pelkkä tausta ja teksti */}
      <div className="flex items-center bg-brown px-6 py-16 md:px-14 md:py-28">
        <div className="max-w-md">
          <h2 className="text-balance text-[1.1rem] font-bold leading-[1.2] text-beige sm:text-[1.35rem] md:text-[1.9rem]">
            Entä jos minulla on jo toinen kassajärjestelmä?
          </h2>
          <p className="mt-5 text-lg text-beige/80">
            Ei hätää. Me pidämme huolen datan siirrosta, niin että tiedot
            asiakkaistasi, tuotteistasi ja myyjistäsi pysyvät tallessa.
          </p>
        </div>
      </div>

      {/* Oikea puolikas: kuva + läppäri */}
      <div className="relative min-h-[18rem] overflow-hidden md:min-h-0">
        <img
          src="/images/kuva%205.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-brown/45" />
        <div className="migrate-laptop relative flex h-full items-center justify-center p-8 md:p-12">
          <img
            src="/graphics/grafiikka-5.png"
            alt="ReSellon näkymä kannettavalla"
            className="w-full max-w-md drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

export default Migration
