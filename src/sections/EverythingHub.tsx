import { useEffect, useRef } from 'react'
import {
  CalendarCheck,
  TrendingUp,
  Wallet,
  QrCode,
  Barcode,
  Share2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Node {
  icon: LucideIcon
  label: string
  x: number
  y: number
}

// Ominaisuudet leviävät keskuslaitteesta. x/y = sijainti stagella (%).
const nodes: Node[] = [
  { icon: CalendarCheck, label: 'Varaukset ja kassa', x: 17, y: 20 },
  { icon: TrendingUp, label: 'Reaaliaikainen seuranta', x: 11, y: 50 },
  { icon: Wallet, label: 'Myyjien tilitykset', x: 17, y: 80 },
  { icon: QrCode, label: 'Näkyvyys ostajille', x: 83, y: 20 },
  { icon: Barcode, label: 'Viivakoodit ja kartta', x: 89, y: 50 },
  { icon: Share2, label: 'Kirjanpito ja some', x: 83, y: 80 },
]

function Device({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19] rounded-[1.75rem] border-4 border-beige/90 bg-brown shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="absolute inset-[0.4rem] flex flex-col gap-2 rounded-[1.3rem] bg-beige/[0.07] p-3">
        <span className="mx-auto mt-1 text-sm font-bold text-beige">ReSello</span>
        <span className="mt-1 h-2 w-3/4 rounded-full bg-beige/25" />
        <span className="h-2 w-full rounded-full bg-beige/15" />
        <span className="h-2 w-5/6 rounded-full bg-beige/15" />
        <span className="mt-auto h-7 w-full rounded-lg bg-beige/20" />
      </div>
    </div>
  )
}

function EverythingHub() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current
      if (!stage) return
      const cx = stage.clientWidth / 2
      const cy = stage.clientHeight / 2
      nodeRefs.current.forEach((el) => {
        if (!el) return
        const x = el.offsetLeft + el.offsetWidth / 2
        const y = el.offsetTop + el.offsetHeight / 2
        el.style.setProperty('--dx', `${cx - x}px`)
        el.style.setProperty('--dy', `${cy - y}px`)
      })
    }
    measure()
    window.addEventListener('resize', measure)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          rootRef.current?.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    if (rootRef.current) io.observe(rootRef.current)
    return () => {
      window.removeEventListener('resize', measure)
      io.disconnect()
    }
  }, [])

  return (
    <section ref={rootRef} className="hub bg-brown px-6 py-20 text-beige md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-[2.5rem]">
          Tässä on kaikki.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-beige/70">
          Yksi laite hoitaa koko kirpputorin. Kaikki ominaisuudet avautuvat
          samasta näkymästä.
        </p>
      </div>

      {/* Työpöytä: laite keskellä, ominaisuudet leviävät ympärille */}
      <div
        ref={stageRef}
        className="relative mx-auto mt-16 hidden h-[34rem] max-w-5xl md:block"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {nodes.map((n) => (
            <line
              key={n.label}
              x1="50%"
              y1="50%"
              x2={`${n.x}%`}
              y2={`${n.y}%`}
              pathLength={1}
              className="hub-line"
            />
          ))}
        </svg>

        <div className="hub-device absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Device className="w-40" />
        </div>

        {nodes.map((n, i) => {
          const Icon = n.icon
          return (
            <div
              key={n.label}
              ref={(el) => {
                nodeRefs.current[i] = el
              }}
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transitionDelay: `${180 + i * 70}ms`,
              }}
              className="hub-node absolute z-20 flex w-44 items-center gap-3 rounded-2xl border border-beige/20 bg-beige/[0.08] px-4 py-3 backdrop-blur-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-beige/15 text-beige">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium leading-tight">{n.label}</span>
            </div>
          )
        })}
      </div>

      {/* Mobiili: laite + pinottu lista */}
      <div className="mx-auto mt-12 max-w-sm md:hidden">
        <Device className="mx-auto mb-10 w-28" />
        <div className="flex flex-col gap-3">
          {nodes.map((n, i) => {
            const Icon = n.icon
            return (
              <div
                key={n.label}
                style={{ transitionDelay: `${i * 60}ms` }}
                className="hub-mnode flex items-center gap-3 rounded-2xl border border-beige/20 bg-beige/[0.08] px-4 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-beige/15 text-beige">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{n.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EverythingHub
