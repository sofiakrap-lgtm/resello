import { useState } from 'react'
import { Instagram, ArrowUpRight, Image as ImageIcon } from 'lucide-react'

const navLinks = [
  { href: '#ominaisuudet', label: 'Ominaisuudet' },
  { href: '#nakyvyys', label: 'Näkyvyys' },
  { href: '#hinnoittelu', label: 'Hinnoittelu' },
  { href: '#varaa', label: 'Yhteystiedot' },
]

const focus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-beige rounded-md'

function SplitHero() {
  // Näyttää /images/hero.webp jos se on lisätty, muuten paikanpitäjän.
  const [showHeroImage, setShowHeroImage] = useState(true)

  return (
    <section className="grid border-b border-brown md:grid-cols-2">
      {/* Vasen palsta */}
      <div className="relative flex min-h-[88vh] flex-col overflow-hidden bg-beige px-6 pb-0 pt-5 md:min-h-screen md:px-10 md:pb-0 md:pt-6">
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium uppercase tracking-[0.16em] text-brown">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-brown/70 transition-colors hover:text-brown ${focus}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-1 items-center">
          <div className="max-w-2xl py-12">
            <h1 className="max-w-xl text-balance text-[1.1rem] font-bold leading-[1.15] tracking-tight text-brown sm:text-[1.3rem] md:text-[1.65rem]">
              Kirpputorisi koko toiminta{' '}
              <span className="underline decoration-2 underline-offset-4">
                yhdessä paikassa
              </span>
              . Ja uusia asiakkaita kaupan päälle.
            </h1>
            <p className="mt-4 max-w-lg font-serif text-lg italic text-brown/70">
              ReSello hoitaa varaukset, kassan, tilitykset ja myynninseurannan.
              Samalla se tuo ostajat suoraan sinun kirpputorillesi.
            </p>
          </div>
        </div>

        <div>
          <img
            src="/graphics/ReSello-hero.svg"
            alt="ReSello"
            className="h-auto w-[min(100%,30rem)]"
          />
        </div>
      </div>

      {/* Oikea palsta — hero-kuva */}
      <div className="relative min-h-[55vh] overflow-hidden bg-peach md:min-h-screen">
        <img
          src="/images/kuva%201.jpg"
          alt="Osto- ja maksutapahtuma kirpputorilla"
          onError={() => setShowHeroImage(false)}
          className={`absolute inset-0 h-full w-full object-cover ${
            showHeroImage ? '' : 'hidden'
          }`}
        />
        {/* Paikanpitäjä, kun kuvaa ei ole */}
        {!showHeroImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-brown/45">
            <ImageIcon className="h-10 w-10" />
            <span className="text-sm font-medium uppercase tracking-widest">
              Lisää hero-kuva
            </span>
          </div>
        )}

        {/* Ylhäällä oikealla: some + CTA */}
        <div className="absolute right-5 top-6 flex items-center gap-3 md:right-8">
          <a
            href="#varaa"
            aria-label="Instagram"
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-beige text-brown transition-colors hover:bg-beige/90 ${focus}`}
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#varaa"
            className={`rounded-full bg-beige px-5 py-2 text-xs font-medium uppercase tracking-widest text-brown transition-colors hover:bg-beige/90 ${focus}`}
          >
            Varaa esittely
          </a>
        </div>

        {/* Alhaalla oikealla */}
        <a
          href="#varaa"
          className={`absolute bottom-6 right-6 inline-flex items-center gap-1.5 rounded-full border border-beige px-4 py-2 text-base font-medium text-beige transition-colors hover:bg-beige hover:text-brown md:bottom-8 md:right-8 ${focus}`}
        >
          Ota yhteyttä
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}

export default SplitHero
