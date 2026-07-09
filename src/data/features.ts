import {
  Boxes,
  Barcode,
  Store,
  LineChart,
  Tags,
  ScanLine,
  type LucideIcon,
} from 'lucide-react'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

/** Etusivun ominaisuudet / hyödyt -osion sisältö. */
export const features: Feature[] = [
  {
    icon: Boxes,
    title: 'Inventaario hallinnassa',
    description:
      'Pidä koko varasto yhdessä näkymässä. Reaaliaikaiset saldot, tilat ja sijainnit — ei enää päällekkäistä myyntiä tai kadonneita tuotteita.',
  },
  {
    icon: Barcode,
    title: 'Viivakoodit ja etiketit',
    description:
      'Luo jokaiselle tuotteelle uniikki viivakoodi ja tulosta valmiit etiketit yhdellä klikkauksella. Ei erillisiä työkaluja.',
  },
  {
    icon: ScanLine,
    title: 'Nopea skannaus',
    description:
      'Lisää ja etsi tuotteita skannaamalla. Vastaanotto, hinnoittelu ja myynti hoituvat sekunneissa puhelimella tai lukijalla.',
  },
  {
    icon: Store,
    title: 'Monikanavamyynti',
    description:
      'Listaa tuotteet useaan kauppapaikkaan kerralla. Saldot ja hinnat pysyvät synkassa kaikissa kanavissa automaattisesti.',
  },
  {
    icon: Tags,
    title: 'Älykäs hinnoittelu',
    description:
      'Seuraa hankintahintaa, katetta ja alennuksia tuotekohtaisesti. Näet heti, mikä myy voitolla ja mikä sitoo pääomaa.',
  },
  {
    icon: LineChart,
    title: 'Raportit ja analytiikka',
    description:
      'Ymmärrä liiketoimintasi luvut: myydyimmät tuotteet, kiertonopeus ja kate. Tee päätökset datalla, älä mutulla.',
  },
]
