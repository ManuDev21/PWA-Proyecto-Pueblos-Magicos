import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../i18n/useT'
import LanguageToggle from '../../components/ui/LanguageToggle'
import VoiceToggle from '../../components/ui/VoiceToggle'

const links = [
  { id: 'inicio', key: 'nav.home' },
  { id: 'sobre-nosotros', key: 'nav.about' },
  { id: 'experiencias', key: 'nav.experiences' },
  { id: 'contacto', key: 'nav.contact' },
]

export default function Navbar() {
  const { t } = useT()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2 shadow-sea' : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <button onClick={() => scrollTo('inicio')} className="flex items-center gap-3">
          <img
            src="/assets/logo.jpeg"
            alt="ÍXA · Experta en Pueblos Mágicos"
            className="h-14 w-auto rounded-xl object-contain shadow-sea md:h-16"
          />
          <span className="h-10 w-px bg-[var(--c-secondary)]/60" />
          <span className="leading-tight text-left">
            <span className="block font-display text-lg text-gradient-gold md:text-xl">Isla Mujeres</span>
            <span className="block text-xs text-[var(--c-cream)]/70">{t('nav.experiences')}</span>
          </span>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="group relative text-sm font-medium text-[var(--c-cream)]/90"
            >
              {t(l.key)}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[var(--c-secondary)] transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <VoiceToggle />
          <LanguageToggle />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate('/experiencia')}
            className="btn-jelly rounded-full bg-[var(--c-secondary)] px-5 py-2 text-sm font-bold text-[var(--c-primary-deep)] shadow-sea"
          >
            {t('nav.startQuiz')}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
