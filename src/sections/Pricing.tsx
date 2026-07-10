import PriceSlider from '../components/PriceSlider.tsx'

function Pricing() {
  return (
    <section id="hinnoittelu" className="scroll-mt-24 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-[1.05rem] font-bold uppercase tracking-tight text-brown sm:text-[1.25rem]">
          Maksat kokosi mukaan. Ei piilokuluja.
        </h2>
        <p className="mt-5 text-lg text-brown/75">
          Hinta porrastuu myyntipaikkojen määrän mukaan. Tilitykset sisältyvät,
          käyttöönotto on maksuton, ja voit aloittaa ilmaiseksi. Vedä liukuria
          ja katso hinta kirpputorisi koon mukaan.
        </p>
        <PriceSlider />
      </div>
    </section>
  )
}

export default Pricing
