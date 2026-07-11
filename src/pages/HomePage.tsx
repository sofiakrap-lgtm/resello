import { useEffect } from 'react'
import SiteHeader from '../sections/SiteHeader.tsx'
import SplitHero from '../sections/SplitHero.tsx'
import EverythingHub from '../sections/EverythingHub.tsx'
import Pricing from '../sections/Pricing.tsx'
import Migration from '../sections/Migration.tsx'
import Onboarding from '../sections/Onboarding.tsx'
import Story from '../sections/Story.tsx'
import Gallery from '../sections/Gallery.tsx'
import Faq from '../sections/Faq.tsx'
import FinalCta from '../sections/FinalCta.tsx'
import Footer from '../sections/Footer.tsx'

function HomePage() {
  // Yleinen reveal-on-scroll: jokainen .reveal-item liukuu esiin näkyviin tullessa.
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-item')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div id="top" className="min-h-screen bg-beige">
      <SiteHeader />
      <SplitHero />
      <main>
        <EverythingHub />
        <Pricing />
        <Migration />
        <Onboarding />
        <Story />
        <Gallery />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
