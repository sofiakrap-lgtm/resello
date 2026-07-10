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
    <section className="grid md:grid-cols-2">
      {/* Vasen palsta */}
      <div className="relative flex min-h-[88vh] flex-col overflow-hidden bg-beige px-6 py-8 md:min-h-screen md:px-10 md:py-10">
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium tracking-wide text-brown">
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
            <h1 className="max-w-xl text-balance text-[1.35rem] font-bold uppercase leading-[1.12] tracking-tight text-brown sm:text-[1.6rem] md:text-[2rem]">
              Kirpputorisi koko toiminta yhdessä paikassa. Ja uusia asiakkaita
              kaupan päälle.
            </h1>
            <p className="mt-4 max-w-lg text-brown/70">
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
          src="/images/kuva%204.jpg"
          alt="Kirpputorin vaaterekkiä selaava asiakas"
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
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-beige/85 text-brown backdrop-blur-sm transition-colors hover:bg-beige ${focus}`}
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#varaa"
            className={`rounded-full border border-brown bg-beige/85 px-5 py-2 text-xs font-medium uppercase tracking-widest text-brown backdrop-blur-sm transition-colors hover:bg-brown hover:text-beige ${focus}`}
          >
            Varaa esittely
          </a>
        </div>

        {/* Alhaalla oikealla */}
        <a
          href="#varaa"
          className={`absolute bottom-6 right-6 inline-flex items-center gap-1.5 rounded-full bg-beige/85 px-4 py-2 text-base font-medium text-brown backdrop-blur-sm transition-colors hover:bg-beige md:bottom-8 md:right-8 ${focus}`}
        >
          Varaa esittely
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}

export default SplitHero
