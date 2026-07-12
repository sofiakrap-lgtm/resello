import Button from '../components/Button.tsx'

function FinalCta() {
  return (
    <section id="varaa" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Kaksi vierekkäistä, vahvasti pyöristettyä lohkoa — kiinni
            toisissaan, vain ohut rako välissä. */}
        <div className="grid gap-2 overflow-hidden rounded-[2rem] md:grid-cols-2">
          {/* Vasen: kuva */}
          <div className="relative min-h-[18rem] overflow-hidden rounded-[1.6rem] md:min-h-[30rem]">
            <img
              src="/images/kuva%204.jpg"
              alt="Kirpputorin vaatteita ja tavaroita"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Oikea: värillinen lohko + vaaleampi ikkuna (ei varjoa) */}
          <div className="flex items-center justify-center rounded-[1.6rem] bg-peach px-6 py-14 md:px-12 md:py-16">
            <div className="w-full max-w-sm rounded-[1.4rem] bg-card p-8 text-center md:p-10">
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
        </div>
      </div>
    </section>
  )
}

export default FinalCta
