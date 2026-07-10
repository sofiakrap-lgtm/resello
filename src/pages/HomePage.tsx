import SplitHero from '../sections/SplitHero.tsx'
import EverythingHub from '../sections/EverythingHub.tsx'
import Problem from '../sections/Problem.tsx'
import Solution from '../sections/Solution.tsx'
import Visibility from '../sections/Visibility.tsx'
import Pricing from '../sections/Pricing.tsx'
import Migration from '../sections/Migration.tsx'
import Team from '../sections/Team.tsx'
import FinalCta from '../sections/FinalCta.tsx'
import Footer from '../sections/Footer.tsx'

function HomePage() {
  return (
    <div className="min-h-screen bg-beige">
      <SplitHero />
      <main>
        <EverythingHub />
        <Problem />
        <Solution />
        <Visibility />
        <Pricing />
        <Migration />
        <Team />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
