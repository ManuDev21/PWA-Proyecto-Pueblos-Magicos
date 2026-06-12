import { useState } from 'react'
import Swal from 'sweetalert2'
import SplashScreen from '../features/splash/SplashScreen'
import ChatbotFlow from '../features/chatbot/ChatbotFlow'
import ParticlesBackground from '../components/effects/ParticlesBackground'
import { useVisitorStore } from '../store/useVisitorStore'

export default function HomePage() {
  const [phase, setPhase] = useState('splash') // splash -> chat
  const setPueblo = useVisitorStore((s) => s.setPueblo)

  const handleSelect = (pueblo) => {
    if (pueblo === 'Otros') {
      Swal.fire({
        icon: 'info',
        title: 'Próximamente',
        text: 'Muy pronto sumaremos más Pueblos Mágicos a ÍXA. Por ahora, explora Isla Mujeres.',
        confirmButtonColor: '#C9A227',
        background: '#0F3D2E',
        color: '#F5F0E1',
      })
      return
    }
    setPueblo(pueblo)
    setPhase('chat')
  }

  if (phase === 'splash') {
    return <SplashScreen onSelectPueblo={handleSelect} />
  }

  return (
    <div className="bg-mayan relative min-h-screen">
      <ParticlesBackground count={700} />
      <ChatbotFlow />
    </div>
  )
}
