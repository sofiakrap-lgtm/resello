import PriceTimeline from '../components/PriceTimeline.tsx'

function Pricing() {
  return (
    <section
      id="hinnoittelu"
      className="scroll-mt-24 border-t border-brown bg-bluegrey px-6 py-14 md:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <div className="reveal-item mx-auto max-w-2xl text-center">
          <h2 className="text-[1.4rem] font-bold tracking-tight text-brown sm:text-[1.7rem] md:text-[2.1rem]">
            Hinnasto
          </h2>
          <p className="mt-5 text-lg text-brown/75">
            Hinta porrastuu myyntipaikkojen määrän mukaan. Tilitykset
            sisältyvät, käyttöönotto on maksuton. Vedä liukuria ja katso hinta
            kirpputorisi koon mukaan.
          </p>
        </div>

        {/* Aikajanakortti + merkki (grafiikka 11) kortin oikeassa yläkulmassa */}
        <div className="relative">
          <img
            src="/graphics/grafiikka-11.png"
            alt="Maksat kokosi mukaan, alkaen 99 €, ei piilokuluja"
            className="absolute -right-2 top-2 z-10 w-24 rotate-[15deg] md:-right-6 md:-top-6 md:w-36"
          />
          <PriceTimeline />
        </div>
      </div>
    </section>
  )
}

export default Pricing
