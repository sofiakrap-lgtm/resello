import { useEffect, useRef, useState } from 'react'

// --- Sisältö: 5 pääaihetta, kullakin oma väri ja 3 ala-aihetta (ikonia) ---
// Ikonit ovat /public/graphics-kansion SVG-tiedostoja, nimetty ala-aiheen mukaan.

interface Feature {
  img: string
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

const g = (name: string) => encodeURI(`/graphics/${name}`)

const topics: Topic[] = [
  {
    label: 'Varausjärjestelmä',
    color: '#3c2415',
    x: 23.7,
    y: 71.2,
    features: [
      {
        img: g('1.1 Myyntipaikkojen sähköinen varaus.svg'),
        title: 'Sähköinen paikkavaraus',
        body: 'Myyntipaikkojen varaus hoituu verkossa muutamassa sekunnissa, ilman puheluita tai papereita.',
        x: 38,
        y: 71.4,
      },
      {
        img: g('1.2 Myymäläkartta.svg'),
        title: 'Myymäläkartta',
        body: 'Näe koko myymälä yhdellä silmäyksellä ja valitse vapaa paikka suoraan visuaaliselta pohjalta.',
        x: 23.9,
        y: 86.1,
      },
      {
        img: g('1.3 Vuokrattavien paikkojen hallinta ja saatavuus.svg'),
        title: 'Paikkojen hallinta ja saatavuus',
        body: 'Vuokrattavat paikat pysyvät ajan tasalla — varatut, vapaat ja tulevat näkyvät reaaliajassa.',
        x: 12.2,
        y: 84.2,
      },
    ],
  },
  {
    label: 'Kassajärjestelmä',
    color: '#3c2415',
    x: 15,
    y: 39,
    features: [
      {
        img: g('2.1 Viivakoodilliset hintalaput.svg'),
        title: 'Viivakoodilliset hintalaput',
        body: 'Tulosta hintalaput viivakoodilla ja lue tuotteet kassalla ilman virheitä ja käsin näppäilyä.',
        x: 30.3,
        y: 31.5,
      },
      {
        img: g('2.2 Kassa ja maksutapahtumat.svg'),
        title: 'Kassa ja maksutapahtumat',
        body: 'Käteinen, kortti ja lähimaksu samasta laitteesta — nopeasti ja ilman kilojen rautaa.',
        x: 24.9,
        y: 54.8,
      },
      {
        img: g('2.3 Myyjäkohtaiset tilitykset automaattisesti.svg'),
        title: 'Automaattiset tilitykset',
        body: 'Myyjäkohtaiset tilitykset lasketaan automaattisesti, joten rahat menevät oikein ilman käsityötä.',
        x: 10.8,
        y: 56.8,
      },
    ],
  },
  {
    label: 'Myyjän myynninseuranta',
    color: '#3c2415',
    x: 53.7,
    y: 78.8,
    features: [
      {
        img: g('3.1 Reaaliaikainen näkymä omiin myynteihin ja tuloihin.svg'),
        title: 'Myynti reaaliajassa',
        body: 'Reaaliaikainen näkymä omiin myynteihin ja tuloihin — seuraa päivän kertymää mistä tahansa.',
        x: 68.4,
        y: 68,
      },
      {
        img: g('3.2 Toimii millä tahansa laitteella.svg'),
        title: 'Toimii millä tahansa laitteella',
        body: 'Puhelin, tabletti tai tietokone — ReSello toimii selaimessa ilman erillisiä asennuksia.',
        x: 65.4,
        y: 85.5,
      },
      {
        img: g('3.3 Oman valikoiman jakaminen someen suoralla linkillä.svg'),
        title: 'Jaa valikoima someen',
        body: 'Jaa oma valikoimasi someen suoralla linkillä ja tuo lisää ostajia pöytäsi äärelle.',
        x: 49.4,
        y: 91.6,
      },
    ],
  },
  {
    label: 'Ostajan tuotehaku',
    color: '#3c2415',
    x: 86.5,
    y: 38.7,
    features: [
      {
        img: g('4.1 Tuotehaku kirpputoreilta.svg'),
        title: 'Löydä tuote ja paikka',
        body: 'Haku näyttää miltä kirpputorilta ja mistä paikasta tuote löytyy — ostaja kävelee suoraan oikealle pöydälle.',
        x: 84.6,
        y: 21.5,
      },
      {
        img: g('4.2 QR-koodi ohjaa selaamaan valikoimaa.svg'),
        title: 'QR-koodi pöydällä',
        body: 'Kirpputorin pöydällä oleva QR-koodi ohjaa selaamaan myyjän ajantasaista valikoimaa.',
        x: 73.2,
        y: 56.3,
      },
      {
        img: g('4.3 Tuotteiden löydettävyys yli kirpputorirajojen.svg'),
        title: 'Löydettävyys yli rajojen',
        body: 'Tuotteet löytyvät yli kirpputorirajojen — koko verkoston valikoima yhdessä haussa.',
        x: 87.1,
        y: 61.3,
      },
    ],
  },
  {
    label: 'Hallinta ja analytiikka',
    color: '#3c2415',
    x: 57.2,
    y: 12.6,
    features: [
      {
        img: g('5.1 Käyttöaste ja myynnin kehitys.svg'),
        title: 'Käyttöaste ja myynnin kehitys',
        body: 'Selkeät näkymät myymälän käyttöasteeseen ja myynnin kehitykseen — päätökset dataan nojaten.',
        x: 45,
        y: 26.9,
      },
      {
        img: g('5.2 Asiakashallinta.svg'),
        title: 'Asiakashallinta',
        body: 'Lisää ja hallitse asiakkaita sekä aseta alennuksia yhdestä selkeästä näkymästä.',
        x: 69.9,
        y: 15,
      },
      {
        img: g('5.3 Kirjanpito ja tilitykset.svg'),
        title: 'Kirjanpito ja tilitykset',
        body: 'Kirjanpito ja tilitykset samassa paikassa — valmiit raportit aina saatavilla.',
        x: 64.7,
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

// ReSello-keskusnode
const reselloPos = { x: 52.6, y: 51.2 }

// Pääsanojen lopulliset (auenneen) paikat + lähtöpaikat otsikossa
// Pääsanat lähtevät keskeltä (näkymättöminä) ja repeävät nurkkiin auetessa.
const words = [
  { text: 'Tässä on', sx: 50, sy: 50, tx: 18.3, ty: 10.5 },
  { text: 'kaikki.', sx: 50, sy: 50, tx: 86.3, ty: 83.4 },
]

// Solmujen sijainnit avaimella (otsikot, ikonit, ReSello) — viivoja varten
const nodePos = new Map<string, { x: number; y: number }>()
topics.forEach((t) => {
  nodePos.set(t.label, { x: t.x, y: t.y })
  t.features.forEach((f) => nodePos.set(f.title, { x: f.x, y: f.y }))
})
nodePos.set('ReSello', reselloPos)

// Mukautetut yhdysviivat (avainpareina); kaksoiskappaleet poistetaan
const linkPairs: [string, string][] = [
  ['Varausjärjestelmä', 'Sähköinen paikkavaraus'],
  ['Varausjärjestelmä', 'Myymäläkartta'],
  ['Varausjärjestelmä', 'Paikkojen hallinta ja saatavuus'],
  ['Kassajärjestelmä', 'Viivakoodilliset hintalaput'],
  ['Kassajärjestelmä', 'Kassa ja maksutapahtumat'],
  ['Kassajärjestelmä', 'Automaattiset tilitykset'],
  ['Myyjän myynninseuranta', 'Myynti reaaliajassa'],
  ['Myyjän myynninseuranta', 'Toimii millä tahansa laitteella'],
  ['Myyjän myynninseuranta', 'Jaa valikoima someen'],
  ['Ostajan tuotehaku', 'Löydä tuote ja paikka'],
  ['Ostajan tuotehaku', 'QR-koodi pöydällä'],
  ['Ostajan tuotehaku', 'Löydettävyys yli rajojen'],
  ['Hallinta ja analytiikka', 'Käyttöaste ja myynnin kehitys'],
  ['Hallinta ja analytiikka', 'Asiakashallinta'],
  ['Hallinta ja analytiikka', 'Kirjanpito ja tilitykset'],
  ['Myymäläkartta', 'Jaa valikoima someen'],
  ['Varausjärjestelmä', 'Kassajärjestelmä'],
  ['Hallinta ja analytiikka', 'Ostajan tuotehaku'],
  ['Löydettävyys yli rajojen', 'Toimii millä tahansa laitteella'],
  ['Asiakashallinta', 'Löydä tuote ja paikka'],
  ['ReSello', 'Myyjän myynninseuranta'],
  ['Varausjärjestelmä', 'ReSello'],
  ['Kassajärjestelmä', 'ReSello'],
  ['Hallinta ja analytiikka', 'ReSello'],
  ['ReSello', 'Ostajan tuotehaku'],
]
const seenLink = new Set<string>()
const links = linkPairs
  .filter(([a, b]) => {
    const k = [a, b].sort().join('|')
    if (seenLink.has(k)) return false
    seenLink.add(k)
    return true
  })
  .map(([a, b]) => {
    const A = nodePos.get(a)
    const B = nodePos.get(b)
    if (!A || !B) return null
    // Pieni tyhjä tila viivan päihin, ettei viiva ala suoraan sanasta/ikonista.
    const dx = B.x - A.x
    const dy = B.y - A.y
    const len = Math.hypot(dx, dy) || 1
    const gx = (dx / len) * 3
    const gy = (dy / len) * 3
    return { x1: A.x + gx, y1: A.y + gy, x2: B.x - gx, y2: B.y - gy }
  })
  .filter((l): l is { x1: number; y1: number; x2: number; y2: number } => l !== null)

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
    const stage = stickyRef.current
    if (!stage) return
    let raf = 0
    let played = false
    const setAll = (open: number, net: number) => {
      stage.style.setProperty('--open', String(open))
      stage.style.setProperty('--net', String(net))
      stage.classList.toggle('is-open', net > 0.35)
    }
    const play = () => {
      if (played) return
      played = true
      // Saavutettavuus: ei liikettä -> näytetään suoraan valmis verkosto.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setAll(1, 1)
        return
      }
      const start = performance.now()
      const delay = 350
      const dur = 2600
      const tick = (now: number) => {
        const t = clamp((now - start - delay) / dur, 0, 1)
        // Aukeaa ja verkosto ilmestyy itsestään, ilman skrollausta.
        setAll(smooth(t, 0, 0.55), smooth(t, 0.4, 1))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          play()
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(stage)
    return () => {
      io.disconnect()
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
            <h2 className="hub-intro-title">Tässä on kaikki.</h2>
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
                  background: hexA(f.color, 0.7),
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
                <img src={f.img} alt="" aria-hidden="true" className="hub-icon-img" />
              </button>
            ))}

            {/* Keskuslaite (generoitu ReSello-näkymä) */}
            <img
              src={g('resello-tablet.svg')}
              alt="ReSello-sovelluksen näkymä"
              className="hub-device"
              style={{ left: `${reselloPos.x}%`, top: `${reselloPos.y}%` }}
            />
          </div>

          {/* Keskuslause, joka repeää nurkkiin */}
          {words.map((w) => (
            <span
              key={w.text}
              className="hub-word"
              style={{
                ['--sx' as string]: w.sx,
                ['--sy' as string]: w.sy,
                ['--tx' as string]: w.tx,
                ['--ty' as string]: w.ty,
              }}
            >
              {w.text}
            </span>
          ))}

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
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg p-2"
                      style={{ background: hexA(t.color, 0.7) }}
                    >
                      <img
                        src={f.img}
                        alt=""
                        aria-hidden="true"
                        className="hub-icon-img h-full w-full"
                      />
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
