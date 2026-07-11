import { ArrowUpRight } from 'lucide-react'

/** "Rakennettu kirpputorin arjesta" — keskitetty arvot/tarina-osio. */
function Story() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="reveal-item text-balance text-[1.5rem] font-bold leading-[1.1] tracking-tight text-brown sm:text-[2rem] md:text-[2.6rem]">
          Rakennettu kirpputorin arjesta
        </h2>
        <p className="reveal-item mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-taupe">
          Yrittäjältä yrittäjälle
        </p>
      </div>

      <div className="reveal-item mx-auto mt-12 grid max-w-4xl gap-8 text-brown/80 sm:grid-cols-2 sm:gap-12">
        <p className="leading-relaxed">
          ReSello ei syntynyt kokoushuoneessa vaan kirpputorin pöytien välissä.
          Kymmenen vuoden aikana olemme nähneet läheltä, mikä
          kirpputoriyrittäjän arjessa toimii ja mikä ei. Vanhentuneet
          järjestelmät, kankeat kassat ja työkalut, jotka on rakennettu jollekin
          muulle kuin sinulle.
        </p>
        <p className="leading-relaxed">
          Siksi teimme toisin. ReSello yhdistää tavarat ja ihmiset samaan
          verkostoon, tehostaa tuotteiden kiertoa ja tuo pienillekin
          kirpputoreille näkyvyyden, joka ennen kuului vain suurimmille. Reilu
          hinta, integroitu haku ja näkymä, joka ei kuormita. Kaikki yhdessä
          paikassa.
        </p>
      </div>

      <div className="reveal-item mt-12 text-center">
        <a
          href="#varaa"
          className="inline-flex items-center gap-1.5 rounded-lg border-2 border-brown px-6 py-3 text-sm font-medium uppercase tracking-[0.16em] text-brown transition-colors hover:bg-brown hover:text-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-beige"
        >
          Tutustu ReSelloon
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

export default Story
