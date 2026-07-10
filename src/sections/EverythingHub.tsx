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
  side: 'l' | 'r'
  y: number
}

// Ominaisuudet reunoilla; viivat kulkevat keskuslaitteesta ikkunan reunaan.
const nodes: Node[] = [
  { icon: CalendarCheck, label: 'Varaukset ja kassa', side: 'l', y: 22 },
  { icon: TrendingUp, label: 'Reaaliaikainen seuranta', side: 'l', y: 50 },
  { icon: Wallet, label: 'Myyjien tilitykset', side: 'l', y: 78 },
  { icon: QrCode, label: 'Näkyvyys ostajille', side: 'r', y: 22 },
  { icon: Barcode, label: 'Viivakoodit ja kartta', side: 'r', y: 50 },
  { icon: Share2, label: 'Kirjanpito ja some', side: 'r', y: 78 },
]

/** Vaakasuora tabletti (pädi), vaalea näyttö ja ReSello-logo. */
function Device({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[4/3] rounded-2xl bg-beige p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="flex h-full flex-col gap-2 rounded-xl bg-card p-3">
        <div className="flex items-center justify-between">
          <img
            src="/graphics/ReSello-hero.svg"
            alt="ReSello"
            className="h-3.5 w-auto"
          />
          <span className="h-2 w-8 rounded-full bg-brown/15" />
        </div>
        <div className="mt-1 grid grid-cols-3 gap-2">
          <span className="h-9 rounded-md bg-brown/10" />
          <span className="h-9 rounded-md bg-brown/10" />
          <span className="h-9 rounded-md bg-brown/10" />
        </div>
        <span className="mt-1 h-2 w-3/4 rounded-full bg-brown/15" />
        <span className="h-2 w-full rounded-full bg-brown/10" />
        <span className="mt-auto h-6 w-full rounded-lg bg-brown/12" />
      </div>
    </div>
  )
}

function EverythingHub() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(SVGLineElement | null)[]>([])

  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current
      if (!stage) return
      const cx = stage.clientWidth / 2
      const cy = stage.clientHeight / 2
      nodes.forEach((n, i) => {
        const el = nodeRefs.current[i]
        if (!el) return
        const x = el.offsetLeft + el.offsetWidth / 2
        // Solmu keskitetään pystyssä translate(-50%):lla, joten näkyvä keskikohta on offsetTop.
        const y = el.offsetTop
        el.style.setProperty('--dx', `${cx - x}px`)
        el.style.setProperty('--dy', `${cy - y}px`)
        // Viiva päättyy solmun sisäreunaan (missä kortti alkaa).
        const line = lineRefs.current[i]
        if (line) {
          const innerX =
            n.side === 'l' ? el.offsetLeft + el.offsetWidth : el.offsetLeft
          line.setAttribute('x1', String(cx))
          line.setAttribute('y1', String(cy))
          line.setAttribute('x2', String(innerX))
          line.setAttribute('y2', String(y))
        }
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
      { threshold: 0.25 },
    )
    if (rootRef.current) io.observe(rootRef.current)
    return () => {
      window.removeEventListener('resize', measure)
      io.disconnect()
    }
  }, [])

  return (
    <section ref={rootRef} className="hub bg-beige px-4 py-14 sm:px-6 md:py-20">
      <div className="hub-card mx-auto max-w-6xl rounded-[2rem] bg-brown px-6 py-12 text-beige md:px-10 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-[2.5rem]">
            Tässä on kaikki.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-beige/70">
            Yksi laite hoitaa koko kirpputorin. Kaikki ominaisuudet avautuvat
            samasta näkymästä.
          </p>
        </div>

        {/* Työpöytä: tabletti keskellä, ominaisuudet reunoilla */}
        <div
          ref={stageRef}
          className="relative mx-auto mt-8 hidden h-[24rem] md:block"
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            {nodes.map((n, i) => (
              <line
                key={n.label}
                ref={(el) => {
                  lineRefs.current[i] = el
                }}
                pathLength={1}
                className="hub-line"
              />
            ))}
          </svg>

          <div className="hub-device absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <Device className="w-72" />
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
                  top: `${n.y}%`,
                  ...(n.side === 'l' ? { left: 0 } : { right: 0 }),
                  transitionDelay: `${260 + i * 70}ms`,
                }}
                className="hub-node absolute z-20 flex w-40 items-center gap-3 rounded-2xl border border-beige/20 bg-beige/[0.08] px-4 py-3 backdrop-blur-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-beige/15 text-beige">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium leading-tight">
                  {n.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Mobiili: tabletti + pinottu lista */}
        <div className="mx-auto mt-10 max-w-sm md:hidden">
          <Device className="mx-auto mb-8 w-52" />
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
      </div>
    </section>
  )
}

export default EverythingHub
