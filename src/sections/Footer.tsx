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
    <footer className="overflow-hidden bg-brown text-beige">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:px-10">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-beige text-brown">
            <Instagram className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium uppercase tracking-[0.16em] text-beige/80">
            ReSello
          </span>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-10 sm:flex-row">
          {/* Navigaatio vasemmalla */}
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-lg text-beige/80 transition-colors hover:text-beige ${focus}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Some-linkit oikealla */}
          <div className="flex flex-col gap-3 sm:items-end">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-beige/50">
              Seuraa
            </span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={`text-lg text-beige/80 transition-colors hover:text-beige ${focus}`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-2 border-t border-beige/15 pt-6 text-sm text-beige/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ReSello. Kaikki oikeudet pidätetään.</p>
          <p>Kirpputorin käyttöjärjestelmä itsepalvelukirpputoreille.</p>
        </div>
      </div>

      {/* Iso beige ReSello-sanamerkki alareunassa */}
      <img
        src="/graphics/ReSello-hero-light.svg"
        alt="ReSello"
        className="mt-10 w-full select-none"
        aria-hidden="true"
      />
    </footer>
  )
}

export default Footer
