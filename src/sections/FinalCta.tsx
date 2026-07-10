import Button from '../components/Button.tsx'

function FinalCta() {
  return (
    <section id="varaa" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 -rotate-2 font-hand text-2xl text-taupe">
          ilman sitoutumista
        </p>
        <h2 className="text-[1.05rem] font-bold tracking-tight text-brown sm:text-[1.25rem] md:text-[1.7rem]">
          Kokeile ilmaiseksi tai varaa esittely.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-brown/75">
          Näet omalla kirpputorillasi, miten paljon kevyemmäksi arki muuttuu.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#varaa">Aloita ilmaiseksi</Button>
          <Button href="#varaa" variant="outline">
            Varaa esittely
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FinalCta
