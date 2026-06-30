import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Play, ChevronDown } from 'lucide-react'
import ParticlesBackground from '../../components/effects/ParticlesBackground'
import LanguageToggle from '../../components/ui/LanguageToggle'
import VoiceToggle from '../../components/ui/VoiceToggle'
import { useT } from '../../i18n/useT'
import { speak } from '../../lib/speech'
import { useVisitorStore } from '../../store/useVisitorStore'
import { showComingSoon } from '../../lib/alerts'

// Tres pisos: ÍXA · ISLA · MUJERES
const PYRAMID_ROWS = [
  ['Í', 'X', 'A'],
  ['P', 'U', 'E', 'B', 'L', 'O', 'S'],
  ['¡', 'M', 'Á', 'G', 'I', 'C', 'O', 'S', '!'],
]

/**
 * Intro cinematográfica de ÍXA: las letras caen con rebote y se arma una
 * pirámide; al completarse, la pirámide cae y detrás se revela el video
 * de ÍXA dando la bienvenida (ES/EN). Al terminar llama onFinish().
 */
export default function SplashScreen({ onFinish }) {
  const { t, lang } = useT()
  const [phase, setPhase] = useState('letters') // letters -> cta -> video
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pyramidRef = useRef(null)
  const setPueblo = useVisitorStore((s) => s.setPueblo)

  useEffect(() => {
    if (phase !== 'letters') return
    const ctx = gsap.context(() => {
      const chars = pyramidRef.current.querySelectorAll('.char')
      const tl = gsap.timeline({
        onComplete: () => setPhase('cta'),
      })

      // 1) Cada letra cae desde arriba a su lugar en la pirámide (rebote)
      tl.from(chars, {
        y: () => -(window.innerHeight * 0.7 + gsap.utils.random(0, 220)),
        opacity: 0,
        rotateZ: () => gsap.utils.random(-90, 90),
        scale: 1.4,
        stagger: 0.09,
        duration: 0.85,
        ease: 'bounce.out',
      })
      // 2) Destello dorado al quedar armada
      tl.to(chars, {
        color: '#FFD56B',
        textShadow: '0 0 28px rgba(244,183,64,0.95)',
        stagger: { each: 0.025, from: 'start' },
        duration: 0.22,
        yoyo: true,
        repeat: 1,
      })
      // 3) Pequeño pulso de la pirámide completa
      tl.to(pyramidRef.current, {
        scale: 1.06,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      })
      tl.to({}, { duration: 0.5 })
      // 4) La pirámide cae por gravedad y desaparece
      tl.to(chars, {
        y: () => window.innerHeight * 0.9,
        opacity: 0,
        rotateZ: () => gsap.utils.random(-120, 120),
        stagger: { each: 0.03, from: 'end' },
        duration: 0.9,
        ease: 'power2.in',
      })
    })
    return () => ctx.revert()
  }, [phase])

  // Fase video: ÍXA da la bienvenida; se re-lee al cambiar de idioma.
  // NO avanza solo: el usuario debe elegir un pueblo para continuar.
  useEffect(() => {
    if (phase !== 'video') return
    speak(t('splash.welcome'), lang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lang])

  // El clic en "Iniciar" es el gesto que desbloquea el audio del navegador:
  // pasa a la fase de video y ÍXA habla automáticamente.
  const handleStart = () => {
    speak(t('splash.welcome'), lang)
    setPhase('video')
  }

  const selectPueblo = (pueblo) => {
    if (pueblo === 'otros') {
      showComingSoon(t('common.comingSoon'), t('common.comingSoonText'), t('common.close'))
      return
    }
    setPueblo('Isla Mujeres')
    onFinish?.()
  }

  return (
    <div className="bg-mayan relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <ParticlesBackground count={500} />

      {/* Toggles de idioma y voz siempre disponibles */}
      {phase !== 'letters' && (
        <div className="absolute right-4 top-4 z-30 flex gap-2">
          <VoiceToggle />
          <LanguageToggle />
        </div>
      )}

      {/* Botón "Iniciar" con efecto tornado giratorio tras la animación de letras */}
      <AnimatePresence>
        {phase === 'cta' && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.4, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', damping: 12, stiffness: 120 }}
            className="relative z-20 flex flex-col items-center gap-6"
          >
            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative flex h-36 w-36 items-center justify-center rounded-full bg-[var(--c-secondary)] text-[var(--c-primary-deep)] shadow-sea-lg"
            >
              {/* Anillos giratorios estilo tornado */}
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full border-4 border-dashed border-[var(--c-cream)]/70"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              <motion.span
                className="pointer-events-none absolute -inset-3 rounded-full border-2 border-[var(--c-aqua,#2FC4B2)]/60"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              <motion.span
                className="pointer-events-none absolute -inset-6 rounded-full border border-[var(--c-secondary)]/40"
                animate={{ rotate: 360, scale: [1, 1.06, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <span className="flex flex-col items-center gap-1">
                <Play size={30} className="fill-current" />
                <span className="font-display text-lg font-bold">{t('splash.start')}</span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video de ÍXA + bienvenida + selector de pueblo */}
      <AnimatePresence>
        {phase === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="logo-ring"
            >
              <div className="overflow-hidden rounded-full" style={{ width: 'min(60vw, 250px)', height: 'min(60vw, 250px)' }}>
                <video
                  src="/assets/chatbot.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate nofullscreen"
                  onContextMenu={(e) => e.preventDefault()}
                  className="pointer-events-none h-full w-full select-none object-cover"
                  style={{ transform: 'scale(1.18)' }}
                />
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="max-w-xl text-justify font-display text-2xl text-gradient-gold"
            >
              {t('splash.welcome')}
            </motion.p>

            {/* Selector de pueblo: solo al elegir uno se avanza */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-sm text-[var(--c-cream)]/80">{t('splash.choose')}</p>
              <div className="flex flex-row items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="btn-jelly inline-flex items-center gap-2 rounded-full bg-[var(--c-secondary)] py-2 pl-2 pr-5 text-base font-bold text-[var(--c-primary-deep)] shadow-sea-lg"
                  >
                    <img
                      src="/assets/pueblosMagicos.jpg"
                      alt=""
                      className="h-9 w-9 rounded-full bg-white object-contain p-0.5"
                    />
                    {t('splash.pueblosMagicos')}
                    <ChevronDown size={18} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-[var(--c-secondary)]/40 bg-[var(--c-primary-deep)] shadow-sea-lg"
                      >
                        <button
                          onClick={() => selectPueblo('Isla Mujeres')}
                          className="flex w-full items-center gap-3 px-5 py-3 text-left text-[var(--c-cream)] transition-colors hover:bg-[var(--c-secondary)]/20"
                        >
                          <MapPin size={18} className="text-[var(--c-secondary)]" />
                          {t('splash.islaMujeres')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => selectPueblo('otros')}
                  className="btn-jelly inline-flex items-center gap-2 rounded-full bg-[var(--c-accent)] py-2 pl-2 pr-5 text-base font-bold text-[var(--c-primary-deep)] shadow-sea-lg"
                >
                  <img
                    src="/assets/turismoComuunitario.png"
                    alt=""
                    className="h-9 w-9 rounded-full bg-white object-contain p-0.5"
                  />
                  {t('splash.turismoComunitario')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pirámide de letras */}
      {phase === 'letters' && (
        <div
          ref={pyramidRef}
          className="relative z-10 flex flex-col items-center gap-1 sm:gap-2"
          style={{ perspective: 1100 }}
        >
          {PYRAMID_ROWS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-2 sm:gap-4">
              {row.map((c, ci) => (
                <span
                  key={`${ri}-${ci}`}
                  className="char inline-block text-center font-display font-black leading-none text-[var(--c-cream)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]"
                  style={{
                    willChange: 'transform',
                    fontSize: 'clamp(2.2rem, 8vw, 5rem)',
                    width: 'clamp(2.6rem, 9vw, 5.6rem)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
