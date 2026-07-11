import { useEffect, useRef, useState } from 'react'
import {
  Barcode,
  BarChart3,
  BookText,
  CalendarCheck,
  Coins,
  CreditCard,
  Map as MapIcon,
  MapPin,
  MapPinned,
  MonitorSmartphone,
  QrCode,
  Search,
  Share2,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'

// --- Sisältö: 5 pääaihetta, kullakin oma väri ja 3 ala-aihetta (ikonia) ---

interface Feature {
  Icon: LucideIcon
  title: string
  body: string
  x: number
  y: number
}

interface Topic {
  label: string
  color: string
  x: number
  y: number
  features: Feature[]
}

const topics: Topic[] = [
  {
    label: 'Varausjärjestelmä',
    color: '#c17c45',
    x: 21,
    y: 73,
    features: [
      {
        Icon: CalendarCheck,
        title: 'Sähköinen paikkavaraus',
        body: 'Myyntipaikkojen varaus hoituu verkossa muutamassa sekunnissa, ilman puheluita tai papereita.',
        x: 9,
        y: 60,
      },
      {
        Icon: MapIcon,
        title: 'Myymäläkartta',
        body: 'Näe koko myymälä yhdellä silmäyksellä ja valitse vapaa paikka suoraan visuaaliselta pohjalta.',
        x: 31,
        y: 62,
      },
      {
        Icon: MapPin,
        title: 'Paikkojen hallinta ja saatavuus',
        body: 'Vuokrattavat paikat pysyvät ajan tasalla — varatut, vapaat ja tulevat näkyvät reaaliajassa.',
        x: 12,
        y: 85,
      },
    ],
  },
  {
    label: 'Kassajärjestelmä',
    color: '#4c5591',
    x: 15,
    y: 39,
    features: [
      {
        Icon: Barcode,
        title: 'Viivakoodilliset hintalaput',
        body: 'Tulosta hintalaput viivakoodilla ja lue tuotteet kassalla ilman virheitä ja käsin näppäilyä.',
        x: 7,
        y: 25,
      },
      {
        Icon: CreditCard,
        title: 'Kassa ja maksutapahtumat',
        body: 'Käteinen, kortti ja lähimaksu samasta laitteesta — nopeasti ja ilman kilojen rautaa.',
        x: 27,
        y: 27,
      },
      {
        Icon: Coins,
        title: 'Automaattiset tilitykset',
        body: 'Myyjäkohtaiset tilitykset lasketaan automaattisesti, joten rahat menevät oikein ilman käsityötä.',
        x: 9,
        y: 49,
      },
    ],
  },
  {
    label: 'Myyjän myynninseuranta',
    color: '#85815e',
    x: 47,
    y: 55,
    features: [
      {
        Icon: TrendingUp,
        title: 'Myynti reaaliajassa',
        body: 'Reaaliaikainen näkymä omiin myynteihin ja tuloihin — seuraa päivän kertymää mistä tahansa.',
        x: 41,
        y: 42,
      },
      {
        Icon: MonitorSmartphone,
        title: 'Toimii millä tahansa laitteella',
        body: 'Puhelin, tabletti tai tietokone — ReSello toimii selaimessa ilman erillisiä asennuksia.',
        x: 55,
        y: 66,
      },
      {
        Icon: Share2,
        title: 'Jaa valikoima someen',
        body: 'Jaa oma valikoimasi someen suoralla linkillä ja tuo lisää ostajia pöytäsi äärelle.',
        x: 38,
        y: 68,
      },
    ],
  },
  {
    label: 'Ostajan tuotehaku',
    color: '#3c2415',
    x: 81,
    y: 46,
    features: [
      {
        Icon: Search,
        title: 'Löydä tuote ja paikka',
        body: 'Haku näyttää miltä kirpputorilta ja mistä paikasta tuote löytyy — ostaja kävelee suoraan oikealle pöydälle.',
        x: 91,
        y: 33,
      },
      {
        Icon: QrCode,
        title: 'QR-koodi pöydällä',
        body: 'Kirpputorin pöydällä oleva QR-koodi ohjaa selaamaan myyjän ajantasaista valikoimaa.',
        x: 72,
        y: 31,
      },
      {
        Icon: MapPinned,
        title: 'Löydettävyys yli rajojen',
        body: 'Tuotteet löytyvät yli kirpputorirajojen — koko verkoston valikoima yhdessä haussa.',
        x: 91,
        y: 58,
      },
    ],
  },
  {
    label: 'Hallinta ja analytiikka',
    color: '#606060',
    x: 61,
    y: 21,
    features: [
      {
        Icon: BarChart3,
        title: 'Käyttöaste ja myynnin kehitys',
        body: 'Selkeät näkymät myymälän käyttöasteeseen ja myynnin kehitykseen — päätökset dataan nojaten.',
        x: 49,
        y: 15,
      },
      {
        Icon: Users,
        title: 'Asiakashallinta',
        body: 'Lisää ja hallitse asiakkaita sekä aseta alennuksia yhdestä selkeästä näkymästä.',
        x: 73,
        y: 13,
      },
      {
        Icon: BookText,
        title: 'Kirjanpito ja tilitykset',
        body: 'Kirjanpito ja tilitykset samassa paikassa — valmiit raportit aina saatavilla.',
        x: 59,
        y: 35,
      },
    ],
  },
]

// Litistetty lista kaikista ikoneista + porrastusjärjestys (etäisyys keskeltä)
type FeatureX = Feature & { color: string }
const allFeatures: FeatureX[] = topics.flatMap((t) =>
  t.features.map((f) => ({ ...f, color: t.color })),
)
const order = [...allFeatures.keys()].sort(
  (a, b) =>
    Math.hypot(allFeatures[a].x - 50, allFeatures[a].y - 50) -
    Math.hypot(allFeatures[b].x - 50, allFeatures[b].y - 50),
)
const stagger = new Map<number, number>(
  order.map((idx, rank) => [idx, rank] as [number, number]),
)

// Yhdysviivat pääsanasta sen ikoneihin
const links = topics.flatMap((t) =>
  t.features.map((f) => ({ x1: t.x, y1: t.y, x2: f.x, y2: f.y })),
)

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)
const smooth = (x: number, a: number, b: number) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

function EverythingHub() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<FeatureX | null>(null)

  useEffect(() => {
    const sec = scrollRef.current
    const sticky = stickyRef.current
    if (!sec || !sticky) return
    let raf = 0
    const update = () => {
      const total = sec.offsetHeight - window.innerHeight
      const scrolled = clamp(-sec.getBoundingClientRect().top, 0, Math.max(total, 1))
      const p = total > 0 ? scrolled / total : 0
      const open = smooth(p, 0.04, 0.42)
      const net = smooth(p, 0.32, 0.6)
      sticky.style.setProperty('--open', String(open))
      sticky.style.setProperty('--net', String(net))
      sticky.classList.toggle('is-open', net > 0.35)
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
    <section id="ominaisuudet" className="hub bg-beige">
      {/* Työpöytä: scroll-ohjattu, laitteesta aukeava verkosto */}
      <div ref={scrollRef} className="hub-scroll hidden md:block">
        <div
          ref={stickyRef}
          className="hub-sticky"
          style={{ ['--open' as string]: 0, ['--net' as string]: 0 }}
        >
          {/* Aukeava vihreä levy */}
          <div className="hub-plate" />

          {/* Intro: näkyy suljettuna, häipyy auetessa */}
          <div className="hub-intro">
            <p className="hub-intro-lead">
              ReSello on suomalaisille itsepalvelukirpputoreille suunnattu moderni
              käyttöjärjestelmä, joka yhdistää tavarat ja ihmiset samaan verkostoon
              ja tehostaa tuotteiden kiertoa. Se kokoaa myyntipaikkojen varaukset,
              kassan, tilitykset ja myynninseurannan yhteen selkeään näkymään, joka
              toimii millä tahansa laitteella ilman asennuksia.
            </p>
            <span className="hub-scrollhint">
              SKROLLAA ALAS
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 4v14m0 0l6-6m-6 6l-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {/* Verkosto: viivat + pääsanat + ikonit */}
          <div className="hub-net">
            <svg
              className="hub-links"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {links.map((l, i) => (
                <line
                  key={i}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  className="hub-link"
                />
              ))}
            </svg>

            {topics.map((t) => (
              <span
                key={t.label}
                className="hub-label"
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
              >
                {t.label}
              </span>
            ))}

            {allFeatures.map((f, i) => (
              <button
                key={f.title}
                type="button"
                className="hub-icon"
                style={{
                  left: `${f.x}%`,
                  top: `${f.y}%`,
                  background: hexA(f.color, 0.63),
                  ['--rank' as string]: stagger.get(i) ?? 0,
                  ['--fd' as string]: `${7 + (i % 5)}s`,
                  ['--fdelay' as string]: `${-(i % 6) * 0.8}s`,
                }}
                onMouseEnter={() => setHover(f)}
                onMouseLeave={() => setHover((h) => (h === f ? null : h))}
                onFocus={() => setHover(f)}
                onBlur={() => setHover((h) => (h === f ? null : h))}
                aria-label={f.title}
              >
                <f.Icon className="h-full w-full" strokeWidth={1.6} />
              </button>
            ))}
          </div>

          {/* Keskuslause, joka repeää nurkkiin */}
          <span className="hub-word hub-word1">Tässä on</span>
          <span className="hub-word hub-word2">kaikki.</span>

          {/* Keskitetty tietoikkuna ikonin päällä */}
          <div className={`hub-tip ${hover ? 'show' : ''}`}>
            {hover && (
              <>
                <h3 style={{ color: hover.color }}>{hover.title}</h3>
                <p>{hover.body}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobiili: selkeä listaus */}
      <div className="mx-auto max-w-md px-6 py-20 md:hidden">
        <h2 className="text-center text-[1.9rem] font-bold leading-[1.1] tracking-tight text-brown">
          Tässä on kaikki.
        </h2>
        <div className="mt-10 flex flex-col gap-8">
          {topics.map((t) => (
            <div key={t.label}>
              <h3 className="text-[1.15rem] font-bold" style={{ color: t.color }}>
                {t.label}
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                {t.features.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                      style={{ background: hexA(t.color, 0.63) }}
                    >
                      <f.Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="font-semibold text-brown">{f.title}</p>
                      <p className="text-sm text-brown/75">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// #rrggbb + alfa -> rgba()
function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}

export default EverythingHub
