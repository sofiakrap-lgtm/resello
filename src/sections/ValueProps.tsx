import { Scale, HeartHandshake, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Prop {
  icon: LucideIcon
  title: string
  body: string
}

const props: Prop[] = [
  {
    icon: Scale,
    title: 'Reilu hinnoittelu',
    body: 'Hinnoittelu koon mukaan — avoimesti ja reilusti, ilman piilokuluja.',
  },
  {
    icon: HeartHandshake,
    title: 'Yrittäjiltä yrittäjille',
    body: 'Meillä on kokemusta kirpputorin alalta, ja kehitimme järjestelmän kirpputoriyrittäjät mielessä.',
  },
  {
    icon: Clock,
    title: 'Ajassa mukana',
    body: 'Kuuntelemme ja sopeudumme — ReSello kehittyy alan ja arkesi mukana.',
  },
]

function ValueProps() {
  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.05rem] font-bold tracking-tight text-brown sm:text-[1.25rem]">
            Miksi ReSello?
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {props.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-brown/10 bg-card p-7"
            >
              <div className="inline-flex rounded-xl bg-peach/40 p-3 text-brown">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-brown">{title}</h3>
              <p className="mt-2 text-brown/75">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueProps
