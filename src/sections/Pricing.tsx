import PriceTimeline from '../components/PriceTimeline.tsx'

function Pricing() {
  return (
    <section id="hinnoittelu" className="scroll-mt-24 bg-sage px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.05rem] font-bold tracking-tight text-brown sm:text-[1.25rem]">
            Maksat kokosi mukaan. Ei piilokuluja.
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
