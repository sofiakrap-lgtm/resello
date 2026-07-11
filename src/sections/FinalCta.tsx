import Button from '../components/Button.tsx'

function FinalCta() {
  return (
    <section id="varaa" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="relative grid overflow-hidden rounded-lg md:grid-cols-2">
          {/* Vasen: kuva */}
          <div className="relative min-h-[18rem] md:min-h-[30rem]">
            <img
              src="/images/kuva%204.jpg"
              alt="Kirpputorin vaatteita ja tavaroita"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Oikea: värillinen tausta + vaaleampi ikkuna */}
          <div className="relative flex items-center justify-center bg-peach px-6 py-14 md:px-12 md:py-16">
            <div className="w-full max-w-sm rounded-lg bg-card p-8 text-center shadow-2xl md:p-10">
              <h2 className="text-[1.15rem] font-bold tracking-tight text-brown sm:text-[1.4rem] md:text-[1.7rem]">
                Kiinnostuitko?
              </h2>
              <p className="mx-auto mt-4 max-w-xs text-brown/75">
                Varaamalla ilmaisen esittelyn saat kattavan informaatiopaketin
                palvelustamme ja sen ominaisuuksista.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="#varaa">Varaa esittely</Button>
              </div>
            </div>
          </div>

          {/* Koristegrafiikka panelien välissä */}
          <svg
            aria-hidden="true"
            viewBox="0 0 40 480"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 text-brown/40 md:block"
          >
            <path
              d="M20 0 C38 60 2 120 20 180 C38 240 2 300 20 360 C34 408 8 444 20 480"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeDasharray="4 9"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default FinalCta
