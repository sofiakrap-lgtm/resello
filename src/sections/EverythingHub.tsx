import { useEffect, useRef } from 'react'

// Koristepalikat (Anthropic path-to-hope -tyylinen verkosto)
const pills = [
  { x: 22, y: 30, w: 15, h: 5 },
  { x: 8, y: 36, w: 17, h: 5 },
  { x: 53, y: 15, w: 6, h: 6 },
  { x: 57, y: 42, w: 18, h: 6 },
  { x: 71, y: 40, w: 5, h: 6 },
  { x: 87, y: 40, w: 14, h: 6 },
  { x: 65, y: 13, w: 5, h: 6 },
  { x: 81, y: 13, w: 15, h: 5 },
  { x: 14, y: 66, w: 16, h: 6 },
  { x: 40, y: 69, w: 20, h: 6 },
  { x: 63, y: 66, w: 16, h: 6 },
  { x: 85, y: 62, w: 13, h: 6 },
  { x: 37, y: 83, w: 18, h: 6 },
  { x: 59, y: 83, w: 6, h: 6 },
]

interface Main {
  label: string
  x: number
  y: number
  info: string
}

const mains: Main[] = [
  {
    label: 'kassa',
    x: 46,
    y: 55,
    info: 'Käteinen, kortti ja lähimaksu samasta laitteesta, ilman kilojen rautaa.',
  },
  {
    label: 'myyjien työkalu',
    x: 70,
    y: 27,
    info: 'Automaattiset tilitykset ja myyjän oma näkymä myyntiin reaaliajassa.',
  },
  {
    label: 'asiakashallinta',
    x: 82,
    y: 55,
    info: 'Lisää ja hallitse asiakkaita sekä aseta alennuksia yhdestä näkymästä.',
  },
  {
    label: 'mainostyökalu',
    x: 20,
    y: 50,
    info: 'Jaa tuotteet someen ja tuo lisää ostajia valmiilla mainospohjilla.',
  },
  {
    label: 'kirjanpito',
    x: 15,
    y: 78,
    info: 'Vie tiedot suoraan kirjanpitoosi, valmiit raportit aina saatavilla.',
  },
]

// Viivat pääsanoista lähipalikoihin
const lines = [
  { x1: 26, y1: 51, x2: 35, y2: 49 },
  { x1: 18, y1: 74, x2: 22, y2: 68 },
]

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)
const smooth = (x: number, a: number, b: number) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

function EverythingHub() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sec = scrollRef.current
    const sticky = stickyRef.current
    if (!sec || !sticky) return
    let raf = 0
    const update = () => {
      const total = sec.offsetHeight - window.innerHeight
      const scrolled = clamp(-sec.getBoundingClientRect().top, 0, Math.max(total, 1))
      const p = total > 0 ? scrolled / total : 0
      const open = smooth(p, 0, 0.2) * (1 - smooth(p, 0.8, 1))
      const net = smooth(p, 0.24, 0.4) * (1 - smooth(p, 0.62, 0.78))
      sticky.style.setProperty('--open', String(open))
      sticky.style.setProperty('--net', String(net))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="ominaisuudet" className="hub2 scroll-mt-0 bg-beige">
      {/* Työpöytä: scroll-ohjattu animaatio */}
      <div ref={scrollRef} className="hub2-scroll hidden md:block">
        <div
          ref={stickyRef}
          className="hub2-sticky"
          style={{ ['--open' as string]: 0, ['--net' as string]: 0 }}
        >
          <div className="hub2-card" />

          {/* Verkosto */}
          <div className="hub2-net">
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              {lines.map((l, i) => (
                <line
                  key={i}
                  x1={`${l.x1}%`}
                  y1={`${l.y1}%`}
                  x2={`${l.x2}%`}
                  y2={`${l.y2}%`}
                  stroke="rgba(250,241,224,0.55)"
                  strokeWidth={1.5}
                />
              ))}
            </svg>

            {pills.map((n, i) => (
              <span
                key={i}
                className="hub2-pill"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  width: `${n.w}%`,
                  height: `${n.h}%`,
                }}
              />
            ))}

            {/* Grafiikka 4 -merkki nurkassa */}
            <div className="hub2-badge">
              <img
                src="/graphics/grafiikka-4.png"
                alt=""
                aria-hidden="true"
                className="hub2-badge-spin h-full w-full"
              />
            </div>

            {mains.map((m) => (
              <div
                key={m.label}
                className="hub2-main group"
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
              >
                <span className="text-[1.4rem] font-bold text-beige md:text-[1.9rem]">
                  {m.label}
                </span>
                <div className="pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-50 w-56 -translate-x-1/2 rounded-lg bg-beige p-3 text-center text-xs leading-relaxed text-brown/80 opacity-0 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.6)] transition-opacity duration-200 group-hover:opacity-100">
                  {m.info}
                </div>
              </div>
            ))}
          </div>

          {/* Keskuslause, joka jakautuu nurkkiin */}
          <span className="hub2-t hub2-t1">Tässä on</span>
          <span className="hub2-t hub2-t2">kaikki.</span>
        </div>
      </div>

      {/* Mobiili: yksinkertainen versio */}
      <div className="mx-auto max-w-md px-6 py-20 md:hidden">
        <h2 className="text-center text-[1.75rem] font-bold leading-[1.1] tracking-tight text-brown">
          Tässä on kaikki.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {mains.map((m) => (
            <span
              key={m.label}
              className="rounded-lg bg-brown px-4 py-2 text-sm font-bold text-beige"
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EverythingHub
