import Button from '../components/Button.tsx'

function FinalCta() {
  return (
    <section
      id="varaa"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Taustakuva + kevyt sävy */}
      <img
        src="/images/kuva%206.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-brown/45" />

      {/* Sisältö ikkunassa keskellä */}
      <div className="reveal-item relative mx-auto max-w-xl rounded-3xl bg-beige/95 px-6 py-12 text-center shadow-2xl backdrop-blur-sm md:px-12 md:py-16">
        <h2 className="text-[1.05rem] font-bold tracking-tight text-brown sm:text-[1.25rem] md:text-[1.7rem]">
          Kokeile ilmaiseksi tai varaa esittely.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-brown/75">
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
