import Navbar from '../components/Navbar.tsx'
import Hero from '../sections/Hero.tsx'
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
      <Navbar />
      <main>
        <Hero />
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
