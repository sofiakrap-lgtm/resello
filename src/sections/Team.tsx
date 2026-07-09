import Eyebrow from '../components/Eyebrow.tsx'

function Team() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
      <Eyebrow>Kuka rakentaa</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-brown sm:text-4xl">
        Rakennettu kirpputorialan sisältä.
      </h2>
      <p className="mt-5 text-lg text-brown/75">
        Yhdistämme kymmenen vuoden kokemuksen kirpputorialalta ja vahvan
        teknisen osaamisen. Ymmärrämme arkeasi, koska tunnemme sen. ReSello on
        tehty pienten ja keskisuurten kirpputorien puolesta, ei suurimpien
        ehdoilla.
      </p>
    </section>
  )
}

export default Team
