import SplitHero from '../sections/SplitHero.tsx'
import EverythingHub from '../sections/EverythingHub.tsx'
import ValueProps from '../sections/ValueProps.tsx'
import Visibility from '../sections/Visibility.tsx'
import Pricing from '../sections/Pricing.tsx'
import Migration from '../sections/Migration.tsx'
import Team from '../sections/Team.tsx'
import Connect from '../sections/Connect.tsx'
import FinalCta from '../sections/FinalCta.tsx'
import Footer from '../sections/Footer.tsx'

function HomePage() {
  return (
    <div className="min-h-screen bg-beige">
      <SplitHero />
      <main>
        <EverythingHub />
        <ValueProps />
        <Visibility />
        <Pricing />
        <Migration />
        <Team />
        <Connect />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
