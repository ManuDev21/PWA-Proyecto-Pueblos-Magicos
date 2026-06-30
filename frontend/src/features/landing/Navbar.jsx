import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll del fondo cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2 shadow-sea' : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <button onClick={() => scrollTo('inicio')} className="flex items-center gap-2 sm:gap-3">
          <img
            src="/assets/pueblosMagicos.jpg"
            alt="Pueblos Mágicos de México"
            className="h-9 w-auto rounded-lg bg-white/90 object-contain p-0.5 shadow-sea sm:h-12 md:h-14"
          />
          <span className="hidden h-10 w-px bg-[var(--c-secondary)]/60 sm:block" />
          <img
            src="/assets/logo.jpeg"
            alt="ÍXA · Experta en Pueblos Mágicos"
            className="h-11 w-auto rounded-xl object-contain shadow-sea sm:h-14 md:h-16"
          />
          <span className="hidden h-10 w-px bg-[var(--c-secondary)]/60 sm:block" />
          <span className="hidden leading-tight text-left sm:block">
            <span className="block font-display text-base text-gradient-gold sm:text-lg md:text-xl">Isla Mujeres</span>
            <span className="block text-[10px] text-[var(--c-cream)]/70 sm:text-xs">{t('nav.experiences')}</span>
          </span>
        </button>

        {/* Links de escritorio */}
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

        {/* Controles derecha */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <VoiceToggle />
          <LanguageToggle />
          {/* Botón hamburguesa (móvil y tablet) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="btn-jelly flex items-center justify-center rounded-2xl border-2 border-[var(--c-secondary)]/60 p-2 text-[var(--c-cream)] md:hidden"
          >
            <Menu size={22} />
          </motion.button>
        </div>
      </div>

      {/* Menú modal móvil/tablet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="bg-mayan absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col gap-2 p-6 shadow-sea-lg"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-xl text-gradient-gold">ÍXA</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="rounded-xl p-1.5 text-[var(--c-cream)] hover:text-[var(--c-secondary)]"
                >
                  <X size={24} />
                </button>
              </div>

              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  onClick={() => scrollTo(l.id)}
                  className="rounded-2xl px-4 py-3 text-left text-base font-medium text-[var(--c-cream)]/90 transition-colors hover:bg-[var(--c-secondary)]/15"
                >
                  {t(l.key)}
                </motion.button>
              ))}

              <div className="mt-auto flex flex-col gap-3 border-t border-[var(--c-secondary)]/25 pt-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--c-cream)]/50">
                  {t('nav.voice')} · {t('nav.language')}
                </span>
                <div className="flex items-center gap-2">
                  <VoiceToggle />
                  <LanguageToggle />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
