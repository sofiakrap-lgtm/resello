import FeatureCard from './FeatureCard.tsx'
import { features } from '../data/features.ts'

function FeaturesSection() {
  return (
    <section id="ominaisuudet" className="scroll-mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Ominaisuudet
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Kaikki jälleenmyyntiin yhdessä paikassa
        </h2>
        <p className="mt-4 text-slate-600">
          Resello kokoaa inventaarion, viivakoodit, myyntikanavat ja raportit
          samaan työkaluun — jotta voit keskittyä myymiseen etkä hallintaan.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
