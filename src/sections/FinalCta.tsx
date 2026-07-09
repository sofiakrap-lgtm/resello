import Button from '../components/Button.tsx'

function FinalCta() {
  return (
    <section id="varaa" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-brown sm:text-4xl md:text-5xl">
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
