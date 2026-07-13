import Button from '../components/Button.tsx'

function FinalCta() {
  return (
    <section id="varaa" className="scroll-mt-24 px-4 py-10 md:py-12">
      <div className="mx-auto max-w-[108rem]">
        {/* Kaksi erillistä, joka kulmasta pyöristettyä lohkoa, kaari välissä */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Vasen: sinooriharmaa paneeli, teksti suoraan taustalla (ei valkoista korttia) */}
          <div className="flex items-center justify-center rounded-[2rem] bg-bluegrey px-6 py-16 text-center md:px-14 md:py-24">
            <div className="max-w-sm">
              <h2 className="text-[1.4rem] font-bold tracking-tight text-brown sm:text-[1.7rem] md:text-[2rem]">
                Kiinnostuitko?
              </h2>
              <p className="mx-auto mt-4 max-w-xs text-brown/80">
                Varaamalla ilmaisen esittelyn saat kattavan informaatiopaketin
                palvelustamme ja sen ominaisuuksista.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="#varaa">Varaa esittely</Button>
              </div>
            </div>
          </div>

          {/* Oikea: kuva */}
          <div className="relative min-h-[20rem] overflow-hidden rounded-[2rem] md:min-h-[32rem]">
            <img
              src="/images/kuva%204.jpg"
              alt="Kirpputorin vaatteita ja tavaroita"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCta
