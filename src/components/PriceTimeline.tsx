import { useCallback, useEffect, useRef, useState } from 'react'

interface Tier {
  tick: string
  size: string
  price: string
}

// 5 hintaluokkaa — ilmainen 2 paikan taso poistettu.
const tiers: Tier[] = [
  { tick: '25', size: '1–25 paikkaa', price: '99' },
  { tick: '50', size: '26–50 paikkaa', price: '129' },
  { tick: '100', size: '51–100 paikkaa', price: '199' },
  { tick: '200', size: '101–200 paikkaa', price: '299' },
  { tick: '200+', size: 'yli 200 paikkaa', price: '399' },
]
const n = tiers.length
const pct = (i: number) => (i / (n - 1)) * 100

function PriceTimeline() {
  const [active, setActive] = useState(0)
  const [maxOpen, setMaxOpen] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const started = useRef(false)

  const select = useCallback((i: number) => {
    const c = Math.max(0, Math.min(n - 1, i))
    setActive(c)
    setMaxOpen((m) => Math.max(m, c))
  }, [])

  // Intro: kun osio tulee näkyviin, kahva liikkuu ja ikkunat avautuvat.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const timers: number[] = []
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          io.disconnect()
          let i = 0
          select(0)
          const step = () => {
            i += 1
            if (i < n) {
              select(i)
              timers.push(window.setTimeout(step, 760))
            } else {
              // Ikkunat auki — palataan aloitushintaan (99 €).
              timers.push(window.setTimeout(() => select(0), 950))
            }
          }
          timers.push(window.setTimeout(step, 820))
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach((t) => clearTimeout(t))
    }
  }, [select])

  const setFromX = useCallback(
    (clientX: number) => {
      const el = trackRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width))
      select(Math.round(ratio * (n - 1)))
    },
    [select],
  )

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    trackRef.current?.setPointerCapture(e.pointerId)
    setFromX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromX(e.clientX)
  }
  const endDrag = () => {
    dragging.current = false
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      select(active + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      select(active - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      select(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      select(n - 1)
    }
  }

  // Ruskean eri sävyt: alku haalein, loppu tummin. Väri ei muutu valinnasta.
  const shades = [
    'bg-[#e7d8c6] text-brown',
    'bg-[#cbb094] text-brown',
    'bg-[#9e7c5c] text-beige',
    'bg-[#6b4a2e] text-beige',
    'bg-[#3c2415] text-beige',
  ]

  const card = (i: number) => {
    const t = tiers[i]
    const isActive = i === active
    return (
      <div
        className={`rounded-2xl px-5 py-4 transition-shadow duration-300 ${
          shades[i]
        } ${
          isActive
            ? 'ring-2 ring-brown ring-offset-2 ring-offset-bluegrey'
            : 'ring-0'
        }`}
      >
        <div className="text-sm font-medium">{t.size}</div>
        <div className="mt-1 text-2xl font-bold tabular-nums">
          {t.price} <span className="text-base font-medium">€/kk</span>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className="mt-10 rounded-3xl border border-brown/15 bg-bluegrey px-6 py-10 md:px-10"
    >
      {/* Työpöytä: vaaka-aikajana */}
      <div className="relative hidden h-80 md:block">
        <div className="absolute inset-x-20 top-0 h-full">
          {/* Ikkunat */}
          {tiers.map((t, i) => {
            const above = i % 2 === 1
            const open = i <= maxOpen
            return (
              <button
                key={t.tick}
                type="button"
                tabIndex={-1}
                onClick={() => select(i)}
                style={{ left: `${pct(i)}%` }}
                className={`absolute w-40 -translate-x-1/2 text-left transition-all duration-700 ease-[cubic-bezier(0.55,0,0.1,1)] ${
                  above
                    ? 'bottom-[calc(50%+2rem)]'
                    : 'top-[calc(50%+2rem)]'
                } ${
                  open
                    ? 'translate-y-0 opacity-100'
                    : `pointer-events-none opacity-0 ${
                        above ? 'translate-y-3' : '-translate-y-3'
                      }`
                }`}
              >
                {card(i)}
              </button>
            )
          })}

          {/* Rata */}
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 cursor-pointer touch-none select-none"
          >
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-brown/25" />
            <div
              className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-brown transition-[width] duration-700 ease-[cubic-bezier(0.55,0,0.1,1)]"
              style={{ width: `${pct(active)}%` }}
            />
            {tiers.map((t, i) => (
              <span
                key={t.tick}
                style={{ left: `${pct(i)}%` }}
                className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors ${
                  i <= active ? 'bg-brown' : 'bg-brown/25'
                }`}
              />
            ))}
            <div
              role="slider"
              tabIndex={0}
              aria-valuemin={0}
              aria-valuemax={n - 1}
              aria-valuenow={active}
              aria-valuetext={`${tiers[active].size}, ${tiers[active].price} euroa kuukaudessa`}
              aria-label="Myyntipaikkojen määrä"
              onKeyDown={onKeyDown}
              style={{ left: `${pct(active)}%` }}
              className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-[3px] border-brown bg-beige shadow-sm transition-[left] duration-700 ease-[cubic-bezier(0.55,0,0.1,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-bluegrey active:cursor-grabbing"
            />
          </div>
        </div>
      </div>

      {/* Mobiili: pystyaikajana */}
      <div className="relative pl-8 md:hidden">
        <div className="absolute bottom-3 left-[7px] top-3 w-0.5 bg-brown/25" />
        <div className="space-y-4">
          {tiers.map((t, i) => {
            const open = i <= maxOpen
            return (
              <div
                key={t.tick}
                className={`relative transition-all duration-700 ease-[cubic-bezier(0.55,0,0.1,1)] ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                }`}
              >
                <span
                  className={`absolute -left-[1.6rem] top-4 h-3.5 w-3.5 rounded-full ring-4 ring-bluegrey transition-colors ${
                    i === active ? 'bg-brown' : 'bg-brown/40'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => select(i)}
                  className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-bluegrey rounded-2xl"
                >
                  {card(i)}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PriceTimeline
