import { Languages } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLangStore } from '../../store/useLangStore'
import { stopSpeaking } from '../../lib/speech'

export default function LanguageToggle({ className = '' }) {
  const lang = useLangStore((s) => s.lang)
  const toggle = useLangStore((s) => s.toggle)

  const handleToggle = () => {
    // Reinicia la voz: corta lo que ÍXA esté diciendo y los componentes
    // vuelven a hablar en el idioma elegido (efectos sobre `lang`).
    stopSpeaking()
    toggle()
  }

  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      onClick={handleToggle}
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className={`btn-jelly flex items-center gap-2 rounded-full border-2 border-[var(--c-aqua,#2FC4B2)] px-3 py-1.5 text-sm font-semibold text-[var(--c-cream)] ${className}`}
      style={{ borderColor: 'rgba(47,196,178,0.7)' }}
    >
      <Languages size={16} />
      <span>{lang === 'es' ? 'ES' : 'EN'}</span>
      <span className="opacity-50">|</span>
      <span className="opacity-60">{lang === 'es' ? 'EN' : 'ES'}</span>
    </motion.button>
  )
}
