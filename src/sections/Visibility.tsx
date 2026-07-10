import { QrCode } from 'lucide-react'

function Visibility() {
  return (
    <section id="nakyvyys" className="scroll-mt-24 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-sage px-8 py-16 md:px-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex rounded-2xl bg-brown/10 p-4 text-brown">
              <QrCode className="h-7 w-7" />
            </div>
            <h2 className="text-[1.05rem] font-bold tracking-tight text-brown sm:text-[1.25rem]">
              Kirpputorisi ei jää enää piiloon.
            </h2>
            <p className="mt-5 text-lg text-brown/80">
              Jokainen myyntipaikan QR-koodi ohjaa ostajan selaamaan
              valikoimaasi. Kun ostaja etsii tuotetta, hän löytää sen sinun
              kirpputoriltasi. Näkyvyys, jonka aiemmin sai vain suurin toimija.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Visibility
