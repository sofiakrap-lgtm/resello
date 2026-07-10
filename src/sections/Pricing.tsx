import PriceTimeline from '../components/PriceTimeline.tsx'

function Pricing() {
  return (
    <section
      id="hinnoittelu"
      className="scroll-mt-24 bg-bluegrey px-6 py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Pyörivä merkki oikeassa yläkulmassa */}
        <div className="pointer-events-none absolute -top-6 right-0 z-10 md:-top-10 md:right-2">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-peach text-brown shadow-lg md:h-32 md:w-32">
            <svg
              viewBox="0 0 100 100"
              className="price-spin absolute inset-0 h-full w-full"
            >
              <defs>
                <path
                  id="priceCircle"
                  d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                />
              </defs>
              <text
                fill="currentColor"
                style={{ fontSize: '9px', letterSpacing: '1.2px', fontWeight: 600 }}
              >
                <textPath href="#priceCircle">
                  MAKSAT KOKOSI MUKAAN · EI PIILOKULUJA ·&nbsp;
                </textPath>
              </text>
            </svg>
            <div className="text-center leading-none">
              <div className="text-[0.55rem] font-medium uppercase tracking-wide">
                alkaen
              </div>
              <div className="mt-0.5 text-base font-bold md:text-xl">99 €</div>
            </div>
          </div>
        </div>

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
        <PriceTimeline />
      </div>
    </section>
  )
}

export default Pricing
