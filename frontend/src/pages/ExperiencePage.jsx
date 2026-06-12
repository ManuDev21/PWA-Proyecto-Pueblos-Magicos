import { useEffect } from 'react'
import ChatbotFlow from '../features/chatbot/ChatbotFlow'
import ParticlesBackground from '../components/effects/ParticlesBackground'
import LanguageToggle from '../components/ui/LanguageToggle'
import VoiceToggle from '../components/ui/VoiceToggle'
import { useVisitorStore } from '../store/useVisitorStore'

export default function ExperiencePage() {
  const setPueblo = useVisitorStore((s) => s.setPueblo)

  useEffect(() => {
    setPueblo('Isla Mujeres')
  }, [setPueblo])

  return (
    <div className="bg-mayan relative min-h-screen">
      <ParticlesBackground count={350} color={0x2fc4b2} />
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <VoiceToggle />
        <LanguageToggle />
      </div>
      <ChatbotFlow />
    </div>
  )
}
