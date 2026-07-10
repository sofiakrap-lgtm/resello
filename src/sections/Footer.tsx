import { Instagram } from 'lucide-react'

const navLinks = [
  { href: '#ominaisuudet', label: 'Ominaisuudet' },
  { href: '#hinnoittelu', label: 'Hinnoittelu' },
  { href: '#varaa', label: 'Varaa esittely' },
  { href: '#varaa', label: 'Ota yhteyttä' },
]

const socials = [
  { href: '#varaa', label: 'Instagram' },
  { href: '#varaa', label: 'TikTok' },
  { href: '#varaa', label: 'Pinterest' },
]

const focus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige focus-visible:ring-offset-2 focus-visible:ring-offset-brown rounded-md'

function Footer() {
  return (
    <footer className="bg-brown text-beige">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        {/* Vain Instagram-kuvake, vaaleat ääriviivat */}
        <div className="flex justify-start">
          <a
            href="#varaa"
            aria-label="Instagram"
            className={`text-beige/80 transition-colors hover:text-beige ${focus}`}
          >
            <Instagram className="h-6 w-6" />
          </a>
        </div>

        {/* Keskiosa: navi vasemmalla, sanamerkki keskellä, some oikealla */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 sm:grid-cols-3">
          <nav className="flex flex-col gap-3 sm:items-start">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-base text-beige/80 transition-colors hover:text-beige ${focus}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex justify-center">
            <img
              src="/graphics/ReSello-hero-light.svg"
              alt="ReSello"
              className="h-16 w-auto select-none md:h-24"
            />
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-beige/50">
              Seuraa
            </span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={`text-base text-beige/80 transition-colors hover:text-beige ${focus}`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-2 border-t border-beige/15 pt-6 text-sm text-beige/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ReSello. Kaikki oikeudet pidätetään.</p>
          <p>Kirpputorin käyttöjärjestelmä itsepalvelukirpputoreille.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
