import Eyebrow from '../components/Eyebrow.tsx'

interface Tier {
  label: string
  price: string
  highlight?: boolean
}

const tiers: Tier[] = [
  { label: 'Ilmainen (enint. 2 paikkaa)', price: '0 €/kk', highlight: true },
  { label: '1–25 paikkaa', price: '99 €/kk' },
  { label: '26–50 paikkaa', price: '129 €/kk' },
  { label: '51–100 paikkaa', price: '199 €/kk' },
  { label: '101–200 paikkaa', price: '299 €/kk' },
  { label: 'yli 200 paikkaa', price: '399 €/kk' },
]

function Pricing() {
  return (
    <section id="hinnoittelu" className="scroll-mt-24 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Hinnoittelu</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-brown sm:text-4xl">
          Maksat kokosi mukaan. Ei piilokuluja.
        </h2>
        <p className="mt-5 text-lg text-brown/75">
          Hinta porrastuu myyntipaikkojen määrän mukaan. Tilitykset sisältyvät,
          käyttöönotto on maksuton, ja voit aloittaa ilmaiseksi.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-brown/10 bg-card">
          <ul className="divide-y divide-brown/10">
            {tiers.map((tier) => (
              <li
                key={tier.label}
                className={`flex items-center justify-between gap-4 px-6 py-5 ${
                  tier.highlight ? 'bg-peach/30' : ''
                }`}
              >
                <span className="flex items-center gap-3 text-lg text-brown">
                  {tier.label}
                  {tier.highlight && (
                    <span className="rounded-full bg-brown px-2.5 py-0.5 text-xs font-medium text-beige">
                      Aloita tästä
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-lg font-bold text-brown">
                  {tier.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Pricing
