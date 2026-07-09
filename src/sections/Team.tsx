import Eyebrow from '../components/Eyebrow.tsx'

function Team() {
  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="overflow-hidden rounded-3xl bg-peach/35">
          <img
            src="/images/kuva%205.jpg"
            alt="ReSellon tekijä työskentelee kannettavalla"
            className="aspect-[4/3] w-full object-cover md:aspect-[4/5]"
          />
        </div>
        <div>
          <Eyebrow>Kuka rakentaa</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brown sm:text-4xl">
            Rakennettu kirpputorialan sisältä.
          </h2>
          <p className="mt-5 text-lg text-brown/75">
            Yhdistämme kymmenen vuoden kokemuksen kirpputorialalta ja vahvan
            teknisen osaamisen. Ymmärrämme arkeasi, koska tunnemme sen. ReSello
            on tehty pienten ja keskisuurten kirpputorien puolesta, ei
            suurimpien ehdoilla.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Team
