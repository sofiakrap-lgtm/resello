import Button from '../components/Button.tsx'

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-brown sm:text-5xl md:text-6xl">
          Kirpputorisi koko toiminta yhdessä paikassa. Ja uusia asiakkaita
          kaupan päälle.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-brown/75 md:text-xl">
          ReSello hoitaa varaukset, kassan, tilitykset ja myynninseurannan.
          Samalla se tuo ostajat suoraan sinun kirpputorillesi.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#varaa">Varaa esittely</Button>
          <Button href="#ominaisuudet" variant="outline">
            Katso miten se toimii
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
