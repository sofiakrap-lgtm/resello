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
            <h1 className="max-w-xl text-balance text-[1.9rem] font-bold leading-[1.08] tracking-tight text-brown sm:text-4xl md:text-[2.9rem]">
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
          <span className="block whitespace-nowrap font-bold leading-[0.85] tracking-tight text-brown [font-size:clamp(3.5rem,11vw,9rem)]">
            ReSello
          </span>
        </div>
      </div>

      {/* Oikea palsta — hero-kuvan paikka */}
      <div className="relative min-h-[55vh] overflow-hidden bg-peach md:min-h-screen">
        {/* Kuva näkyy, kun public/images/hero.webp on lisätty */}
        <img
          src="/images/hero.webp"
          alt="ReSello — kirpputori"
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
        <div className="absolute right-5 top-6 flex items-center gap-4 md:right-8">
          <a
            href="#varaa"
            aria-label="Instagram"
            className={`text-brown transition-opacity hover:opacity-70 ${focus}`}
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#varaa"
            className={`rounded-full border border-brown px-5 py-2 text-xs font-medium uppercase tracking-widest text-brown transition-colors hover:bg-brown hover:text-beige ${focus}`}
          >
            Varaa esittely
          </a>
        </div>

        {/* Alhaalla oikealla */}
        <a
          href="#varaa"
          className={`absolute bottom-6 right-6 inline-flex items-center gap-1.5 text-lg font-medium text-brown underline-offset-4 hover:underline md:bottom-8 md:right-8 ${focus}`}
        >
          Varaa esittely
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}

export default SplitHero
