import { useState } from 'react'
import SplashScreen from '../features/splash/SplashScreen'
import Navbar from '../features/landing/Navbar'
import Hero from '../features/landing/Hero'
import About from '../features/landing/About'
import ExperiencesPreview from '../features/landing/ExperiencesPreview'
import Contact from '../features/landing/Contact'
import Footer from '../components/layout/Footer'

export default function LandingPage() {
  // La intro (pirámide + video de bienvenida de ÍXA) se muestra en cada carga
  const [introDone, setIntroDone] = useState(false)

  const finishIntro = () => setIntroDone(true)

  if (!introDone) {
    return <SplashScreen onFinish={finishIntro} />
  }

  return (
    <div className="bg-mayan min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <ExperiencesPreview />
      <Contact />
      <Footer />
    </div>
  )
}
