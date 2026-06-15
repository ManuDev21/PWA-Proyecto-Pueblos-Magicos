import { useEffect, useRef, useState } from 'react'
import { Languages, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLangStore } from '../../store/useLangStore'
import { stopSpeaking } from '../../lib/speech'

const LANGS = [
  { code: 'es', label: 'Español', flag: '🇲🇽' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

export default function LanguageToggle({ className = '' }) {
  const lang = useLangStore((s) => s.lang)
  const setLang = useLangStore((s) => s.setLang)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleSelect = (code) => {
    setOpen(false)
    if (code === lang) return
    // Corta lo que ÍXA esté diciendo; los componentes re-leen en el nuevo idioma.
    stopSpeaking()
    setLang(code)
  }

  const current = LANGS.find((l) => l.code === lang) || LANGS[0]

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
        title="Idioma / Language / Langue"
        className="btn-jelly flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-semibold text-[var(--c-cream)]"
        style={{ borderColor: 'rgba(47,196,178,0.7)' }}
      >
        <Languages size={16} />
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-2 min-w-[150px] overflow-hidden rounded-2xl border border-[var(--c-secondary)]/40 bg-[var(--c-primary-deep)] shadow-sea-lg"
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => handleSelect(l.code)}
                  className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--c-secondary)]/20 ${
                    l.code === lang ? 'font-bold text-[var(--c-secondary)]' : 'text-[var(--c-cream)]/90'
                  }`}
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="flex-1">{l.label}</span>
                  {l.code === lang && <Check size={15} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
