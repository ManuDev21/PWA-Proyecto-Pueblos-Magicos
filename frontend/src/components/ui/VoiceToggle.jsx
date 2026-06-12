import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { setSpeechEnabled, isSpeechEnabled } from '../../lib/speech'

export default function VoiceToggle({ className = '' }) {
  const [on, setOn] = useState(isSpeechEnabled())

  const toggle = () => {
    const next = !on
    setOn(next)
    setSpeechEnabled(next)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggle}
      title={on ? 'Silenciar voz de ÍXA' : 'Activar voz de ÍXA'}
      className={`btn-jelly flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-semibold text-[var(--c-cream)] ${className}`}
      style={{ borderColor: 'rgba(47,196,178,0.7)' }}
    >
      {on ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </motion.button>
  )
}
