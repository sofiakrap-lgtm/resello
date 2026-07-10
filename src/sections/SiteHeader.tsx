import { useEffect, useState } from 'react'

const links = [
  { href: '#ominaisuudet', label: 'Ominaisuudet' },
  { href: '#hinnoittelu', label: 'Hinnoittelu' },
  { href: '#varaa', label: 'Yhteystiedot' },
]

const focus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-beige rounded-md'

/** Kiinteä yläpalkki, joka ilmestyy heti heron jälkeen: logo vasemmalla,
 *  sivulinkit ja "Varaa esittely" oikealla. */
function SiteHeader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-brown/10 bg-beige/85 backdrop-blur transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-3 md:px-10">
        <a href="#top" aria-label="ReSello" className={focus}>
          <img
            src="/graphics/ReSello-hero.svg"
            alt="ReSello"
            className="h-5 w-auto md:h-6"
          />
        </a>
        <nav className="flex items-center gap-x-5 text-xs font-medium uppercase tracking-[0.16em] text-brown/70">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`hidden transition-colors hover:text-brown sm:inline ${focus}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#varaa"
            className={`inline-flex items-center rounded-full bg-brown px-4 py-2 text-beige transition-colors hover:bg-brown/90 ${focus}`}
          >
            Varaa esittely
          </a>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
