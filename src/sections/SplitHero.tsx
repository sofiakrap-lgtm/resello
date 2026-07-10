import { useState } from 'react'
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react'

const navLinks = [
  { href: '#ominaisuudet', label: 'Ominaisuudet' },
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
              <span className="box-decoration-clone rounded bg-brown px-1.5 py-0.5 text-beige">
                yhdessä paikassa
              </span>
              . Ja uusia asiakkaita kaupan päälle.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-brown/70">
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

        {/* Ylhäällä oikealla: CTA */}
        <div className="absolute right-5 top-6 flex items-center gap-3 md:right-8">
          <a
            href="#varaa"
            className={`rounded-full bg-beige px-5 py-2 text-xs font-medium uppercase tracking-widest text-brown transition-colors hover:bg-beige/90 ${focus}`}
          >
            Varaa esittely
          </a>
        </div>

        {/* Koristegrafiikka (grafiikka 2) taustan värinä oikeassa alakulmassa */}
        <svg
          aria-hidden="true"
          viewBox="0 0 810 809.999993"
          className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 text-peach/95 md:h-[23rem] md:w-[23rem]"
        >
          <path
            fill="currentColor"
            d="M 740.445312 174.984375 C 690.042969 151.953125 618.199219 195.582031 561.488281 276.675781 C 558.871094 227.066406 541.636719 189.371094 510.105469 174.984375 C 459.792969 151.953125 387.949219 195.582031 331.242188 276.675781 C 328.578125 227.066406 311.339844 189.371094 279.855469 174.984375 C 215.625 145.507812 116.363281 224.917969 58.25 351.792969 C 0.140625 478.664062 5.183594 605.722656 69.460938 635.152344 C 119.863281 658.179688 191.710938 614.550781 248.417969 533.457031 C 251.082031 583.066406 268.316406 620.765625 299.804688 635.152344 C 350.207031 658.179688 422.003906 614.550781 478.710938 533.457031 C 481.375 583.066406 498.613281 620.765625 530.097656 635.152344 C 594.421875 664.535156 693.589844 585.402344 751.75 458.34375 C 809.90625 331.285156 804.769531 204.414062 740.445312 174.984375 Z M 740.445312 174.984375 "
          />
        </svg>

        {/* Alhaalla oikealla */}
        <a
          href="#varaa"
          className={`absolute bottom-6 right-6 z-10 inline-flex items-center gap-1.5 rounded-full border-2 border-beige px-4 py-2 text-base font-bold text-beige transition-colors hover:bg-beige hover:text-brown md:bottom-8 md:right-8 ${focus}`}
        >
          Ota yhteyttä
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}

export default SplitHero
