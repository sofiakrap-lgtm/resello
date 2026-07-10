import SiteHeader from '../sections/SiteHeader.tsx'
import SplitHero from '../sections/SplitHero.tsx'
import EverythingHub from '../sections/EverythingHub.tsx'
import KassaShowcase from '../sections/KassaShowcase.tsx'
import Pricing from '../sections/Pricing.tsx'
import Migration from '../sections/Migration.tsx'
import Onboarding from '../sections/Onboarding.tsx'
import Gallery from '../sections/Gallery.tsx'
import Faq from '../sections/Faq.tsx'
import FinalCta from '../sections/FinalCta.tsx'
import Footer from '../sections/Footer.tsx'

function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-beige">
      <SiteHeader />
      <SplitHero />
      <main>
        <EverythingHub />
        <KassaShowcase />
        <Pricing />
        <Migration />
        <Onboarding />
        <Gallery />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
