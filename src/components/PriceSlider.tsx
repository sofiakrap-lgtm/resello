import { useCallback, useRef, useState } from 'react'

interface Tier {
  tick: string
  size: string
  price: string
  free?: boolean
}

const tiers: Tier[] = [
  { tick: '2', size: 'Enint. 2 paikkaa', price: '0', free: true },
  { tick: '25', size: '1–25 paikkaa', price: '99' },
  { tick: '50', size: '26–50 paikkaa', price: '129' },
  { tick: '100', size: '51–100 paikkaa', price: '199' },
  { tick: '200', size: '101–200 paikkaa', price: '299' },
  { tick: '200+', size: 'yli 200 paikkaa', price: '399' },
]

function PriceSlider() {
  const [i, setI] = useState(1)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const n = tiers.length
  const pct = (idx: number) => (idx / (n - 1)) * 100

  const setFromX = useCallback(
    (clientX: number) => {
      const el = trackRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width))
      setI(Math.round(ratio * (n - 1)))
    },
    [n],
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
      setI((v) => Math.min(n - 1, v + 1))
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      setI((v) => Math.max(0, v - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setI(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setI(n - 1)
    }
  }

  const current = tiers[i]

  return (
    <div className="mt-10 rounded-3xl border border-brown/10 bg-card p-8 md:p-12">
      {/* Hintanäyttö */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-brown">{current.size}</span>
          {current.free && (
            <span className="rounded-full bg-brown px-2.5 py-0.5 text-xs font-medium text-beige">
              Aloita tästä
            </span>
          )}
        </div>
        <div className="mt-2 flex items-baseline gap-1.5 text-brown">
          <span className="text-6xl font-bold tabular-nums">{current.price}</span>
          <span className="text-2xl font-medium">€/kk</span>
        </div>
        <p className="mt-2 text-sm text-brown/60">
          Tilitykset sisältyvät · käyttöönotto maksuton
        </p>
      </div>

      {/* Liukuri */}
      <div className="mt-10 px-3">
        <div className="relative h-5">
          {tiers.map((t, idx) => (
            <span
              key={t.tick}
              className="absolute top-0 -translate-x-1/2 text-xs font-medium tabular-nums text-brown/55"
              style={{ left: `${pct(idx)}%` }}
            >
              {t.tick}
            </span>
          ))}
        </div>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="relative h-8 cursor-pointer touch-none select-none"
        >
          <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-brown/20" />
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-brown transition-[width] duration-150 ease-out motion-reduce:transition-none"
            style={{ width: `${pct(i)}%` }}
          />
          {tiers.map((t, idx) => (
            <button
              key={t.tick}
              type="button"
              tabIndex={-1}
              aria-label={`${t.size}, ${t.price} euroa kuukaudessa`}
              onClick={() => setI(idx)}
              className="absolute top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              style={{ left: `${pct(idx)}%` }}
            >
              <span
                className={`block h-2.5 w-2.5 rounded-full ${
                  idx <= i ? 'bg-brown' : 'bg-brown/25'
                }`}
              />
            </button>
          ))}
          <div
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={n - 1}
            aria-valuenow={i}
            aria-valuetext={`${current.size}, ${current.price} euroa kuukaudessa`}
            aria-label="Myyntipaikkojen määrä"
            onKeyDown={onKeyDown}
            className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-[3px] border-brown bg-beige shadow-sm transition-[left] duration-150 ease-out active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-reduce:transition-none"
            style={{ left: `${pct(i)}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default PriceSlider
