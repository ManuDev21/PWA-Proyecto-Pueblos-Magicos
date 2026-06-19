import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, ChevronDown, Sparkles } from 'lucide-react'
import { useT } from '../../i18n/useT'

export default function Hero() {
  const { t } = useT()
  const navigate = useNavigate()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 220])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const title = t('hero.title')
  const words = title.split(' ')

  return (
    <section
      id="inicio"
      ref={ref}
      className="bg-beach-hero relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Capa de partículas/burbujas */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: 6 + (i % 5) * 6,
              height: 6 + (i % 5) * 6,
              left: `${(i * 7.3) % 100}%`,
              bottom: -20,
            }}
            animate={{ y: [-20, -700], opacity: [0, 0.7, 0] }}
            transition={{ duration: 9 + (i % 6), repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-[var(--c-cream)]"
        >
          <Sparkles size={15} className="text-[var(--c-secondary)]" />
          {t('hero.badge')}
        </motion.span>

        <h1 className="font-display text-4xl font-black leading-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className={`mr-3 inline-block ${i >= words.length - 2 ? 'text-gradient-gold' : ''}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-[var(--c-cream)]/90"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 140 }}
          whileHover={{
            scale: [1, 1.18, 0.9, 1.1, 0.97, 1.04, 1],
            transition: { duration: 0.7, ease: 'easeInOut' },
          }}
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate('/experiencia')}
          className="water-btn mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--c-secondary)] px-9 py-4 text-lg font-bold text-[var(--c-primary-deep)] shadow-sea-lg"
        >
          <MapPin size={22} />
          {t('hero.cta')}
        </motion.button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 text-center text-[var(--c-cream)]/80"
      >
        <p className="mb-1 text-xs">{t('hero.scroll')}</p>
        <ChevronDown className="mx-auto" />
      </motion.div>

      {/* Divisor de ola hacia la siguiente sección */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,90 L0,90 Z"
          fill="var(--c-primary-deep)"
          opacity="0.96"
        />
      </svg>
    </section>
  )
}
