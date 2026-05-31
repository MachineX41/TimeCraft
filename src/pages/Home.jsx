import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GradualBlur from '../components/GradualBlur'
import HomeHero from '../components/home/HomeHero'
import HomeMetrics from '../components/home/HomeMetrics'
import HomeAbout from '../components/home/HomeAbout'
import HomeHowItWorks from '../components/home/HomeHowItWorks'
import HomeFeatures from '../components/home/HomeFeatures'
import HomeFaq from '../components/home/HomeFaq'
import HomeCta from '../components/home/HomeCta'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="app-bg home-page flex min-h-screen flex-col font-sans text-white antialiased">
      <div className="home-page__ambient" aria-hidden="true" />
      <div className="home-page__grid" aria-hidden="true" />

      <Navbar page="home" onAddProject={() => navigate('/dashboard')} />

      <div className="home-shell flex flex-1 flex-col">
        <HomeHero />

        <main id="home-content" className="x-main home-main">
          <div className="x-main__container">
            <HomeMetrics />
            <HomeAbout />
            <HomeHowItWorks />
            <HomeFeatures />
            <HomeFaq />
            <HomeCta />
          </div>
        </main>

        <Footer />
      </div>

      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={1.5}
        divCount={4}
        curve="bezier"
        exponential
        opacity={0.85}
        style={{ zIndex: 45 }}
      />
    </div>
  )
}
