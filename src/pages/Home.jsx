import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomeHero from '../components/home/HomeHero'
import HomeStrip from '../components/home/HomeStrip'
import HomeAbout from '../components/home/HomeAbout'
import HomeHowItWorks from '../components/home/HomeHowItWorks'
import HomeFeatures from '../components/home/HomeFeatures'
import HomeCta from '../components/home/HomeCta'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="app-bg flex min-h-screen flex-col font-sans text-white antialiased">
      <Navbar page="home" onAddProject={() => navigate('/dashboard')} />

      <div className="home-shell flex flex-1 flex-col">
        <HomeHero />
        <HomeStrip />

        <main className="x-main home-main">
          <div className="x-main__container">
            <HomeAbout />
            <HomeHowItWorks />
            <HomeFeatures />
            <HomeCta />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
