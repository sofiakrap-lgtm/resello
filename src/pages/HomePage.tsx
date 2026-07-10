import SplitHero from '../sections/SplitHero.tsx'
import EverythingHub from '../sections/EverythingHub.tsx'
import Pricing from '../sections/Pricing.tsx'
import Connect from '../sections/Connect.tsx'
import FinalCta from '../sections/FinalCta.tsx'
import Footer from '../sections/Footer.tsx'

function HomePage() {
  return (
    <div className="min-h-screen bg-beige">
      <SplitHero />
      <main>
        <EverythingHub />
        <Pricing />
        <Connect />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
