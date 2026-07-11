import { useEffect, useRef } from 'react'
import {
  CreditCard,
  Wallet,
  FileText,
  Megaphone,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Chip {
  type: 'icon' | 'text'
  icon?: LucideIcon
  label: string
  info: string
}

interface Cluster {
  word: string
  color: 'peach' | 'sage' | 'bluegrey' | 'taupe' | 'brown'
  x: number
  y: number
  chips: Chip[]
}

// Pääsanat leviävät keskuslauseen "Tässä on kaikki." ympärille, kukin oma väri.
const clusters: Cluster[] = [
  {
    word: 'Kassa',
    color: 'peach',
    x: 20,
    y: 20,
    chips: [
      {
        type: 'text',
        label: 'Käteinen & kortti',
        info: 'Käteinen, kortti ja lähimaksu samasta laitteesta, ilman kilojen rautaa.',
      },
      {
        type: 'icon',
        icon: CreditCard,
        label: 'Maksut',
        info: 'Nopea maksaminen ja selkeä kassanäkymä koko myymälään.',
      },
    ],
  },
  {
    word: 'Myyjien työkalu',
    color: 'bluegrey',
    x: 80,
    y: 18,
    chips: [
      {
        type: 'text',
        label: 'Tilitykset',
        info: 'Automaattiset tilitykset myyjille ilman käsityötä.',
      },
      {
        type: 'icon',
        icon: Wallet,
        label: 'Myynti',
        info: 'Myyjät näkevät oman myyntinsä ja saldonsa reaaliajassa.',
      },
    ],
  },
  {
    word: 'Kirjanpito',
    color: 'taupe',
    x: 85,
    y: 56,
    chips: [
      {
        type: 'icon',
        icon: FileText,
        label: 'Vienti',
        info: 'Vie tiedot suoraan kirjanpitoosi muutamalla klikkauksella.',
      },
      {
        type: 'text',
        label: 'Raportit',
        info: 'Valmiit raportit ja koosteet ovat aina saatavilla.',
      },
    ],
  },
  {
    word: 'Mainostyökalu',
    color: 'brown',
    x: 60,
    y: 85,
    chips: [
      {
        type: 'text',
        label: 'Some-jaot',
        info: 'Jaa tuotteet someen yhdellä klikkauksella.',
      },
      {
        type: 'icon',
        icon: Megaphone,
        label: 'Näkyvyys',
        info: 'Tuo lisää ostajia valmiilla mainospohjilla.',
      },
    ],
  },
  {
    word: 'Asiakashallinta',
    color: 'sage',
    x: 16,
    y: 72,
    chips: [
      {
        type: 'icon',
        icon: Users,
        label: 'Asiakkaat',
        info: 'Lisää ja hallitse asiakkaita yhdestä näkymästä.',
      },
      {
        type: 'text',
        label: 'Alennukset',
        info: 'Aseta alennuksia ja tarjouksia hetkessä.',
      },
    ],
  },
]

const bgClass: Record<Cluster['color'], string> = {
  peach: 'bg-peach',
  sage: 'bg-sage',
  bluegrey: 'bg-bluegrey',
  taupe: 'bg-taupe',
  brown: 'bg-brown',
}
const wordText: Record<Cluster['color'], string> = {
  peach: 'text-brown',
  sage: 'text-brown',
  bluegrey: 'text-brown',
  taupe: 'text-brown',
  brown: 'text-beige',
}
const iconText: Record<Cluster['color'], string> = {
  peach: 'text-peach',
  sage: 'text-sage',
  bluegrey: 'text-bluegrey',
  taupe: 'text-taupe',
  brown: 'text-brown',
}

function Chips({ chips, color }: { chips: Chip[]; color: Cluster['color'] }) {
  return (
    <div className="flex items-start justify-center gap-2">
      {chips.map((chip) => {
        const Icon = chip.icon
        return (
          <div key={chip.label} className="group relative">
            <div className="flex items-center gap-1.5 rounded-xl border border-brown/10 bg-card px-3 py-2 text-xs font-medium text-brown shadow-sm">
              {chip.type === 'icon' && Icon ? (
                <Icon className={`h-4 w-4 ${iconText[color]}`} />
              ) : (
                <span>{chip.label}</span>
              )}
            </div>
            {/* Lisätietoikkuna hoverilla — laatikon alla keskellä */}
            <div className="pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-50 w-52 -translate-x-1/2 rounded-xl bg-beige p-3 text-center text-xs leading-relaxed text-brown/80 opacity-0 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.55)] transition-opacity duration-200 group-hover:opacity-100">
              {chip.info}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function EverythingHub() {
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
    <section
      id="ominaisuudet"
      ref={rootRef}
      className="hub2 scroll-mt-24 bg-beige px-6 py-20 md:py-28"
    >
      {/* Työpöytä: verkosto */}
      <div className="relative mx-auto hidden h-[44rem] max-w-6xl md:block">
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {clusters.map((c, i) => (
            <line
              key={c.word}
              x1="50%"
              y1="50%"
              x2={`${c.x}%`}
              y2={`${c.y}%`}
              className="hub2-line"
              style={{ transitionDelay: `${400 + i * 90}ms` }}
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 w-[22rem] -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-[2rem] font-bold leading-[1.1] tracking-tight text-brown md:text-[2.75rem]">
            Tässä on kaikki.
          </h2>
        </div>

        {clusters.map((c, i) => (
          <div
            key={c.word}
            className="hub2-cluster absolute"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              transitionDelay: `${250 + i * 120}ms`,
              ['--fdur' as string]: `${5.5 + i * 0.4}s`,
              ['--fdelay' as string]: `${i * 0.3}s`,
            }}
          >
            <div className="flex flex-col items-center gap-2.5">
              <span
                className={`rounded-full px-4 py-1.5 text-sm font-bold shadow-sm ${bgClass[c.color]} ${wordText[c.color]}`}
              >
                {c.word}
              </span>
              <Chips chips={c.chips} color={c.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Mobiili: keskuslause + pinottu lista */}
      <div className="mx-auto max-w-md md:hidden">
        <h2 className="text-center text-[1.75rem] font-bold leading-[1.1] tracking-tight text-brown">
          Tässä on kaikki.
        </h2>
        <div className="mt-10 flex flex-col gap-6">
          {clusters.map((c) => (
            <div key={c.word} className="flex flex-col items-center gap-2.5">
              <span
                className={`rounded-full px-4 py-1.5 text-sm font-bold ${bgClass[c.color]} ${wordText[c.color]}`}
              >
                {c.word}
              </span>
              <Chips chips={c.chips} color={c.color} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EverythingHub
