import Button from '../components/Button.tsx'

function FinalCta() {
  return (
    <section id="varaa" className="scroll-mt-24 px-4 py-10 md:py-12">
      <div className="mx-auto max-w-[120rem]">
        {/* Kaksi joka kulmasta pyöristettyä lohkoa, jotka koskettavat keskeltä
            toisiaan — pyöristys jättää kaaren kohtaamiskohtaan. */}
        <div className="grid gap-0 md:grid-cols-2">
          {/* Vasen: sinooriharmaa paneeli, teksti suoraan taustalla (ei valkoista korttia) */}
          <div className="flex items-center justify-center rounded-[2rem] bg-bluegrey px-6 py-16 text-center md:px-14 md:py-24">
            <div className="max-w-md">
              <h2 className="text-[1.6rem] font-bold tracking-tight text-brown sm:text-[1.95rem] md:text-[2.4rem]">
                Kiinnostuitko?
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-lg text-brown/80 md:text-xl">
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
              src="/images/kuva%208.jpg"
              alt="Maksutapahtuma ReSellolla"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCta
