import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
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
  ['!', 'M', 'A', 'G', 'I', 'C', 'O', 'S', '!'],
]

/**
 * Intro cinematográfica de ÍXA: las letras caen con rebote y se arma una
 * pirámide; al completarse, la pirámide cae y detrás se revela el video
 * de ÍXA dando la bienvenida (ES/EN). Al terminar llama onFinish().
 */
export default function SplashScreen({ onFinish }) {
  const { t, lang } = useT()
  const [phase, setPhase] = useState('letters') // letters -> video
  const pyramidRef = useRef(null)
  const setPueblo = useVisitorStore((s) => s.setPueblo)

  useEffect(() => {
    if (phase !== 'letters') return
    const ctx = gsap.context(() => {
      const chars = pyramidRef.current.querySelectorAll('.char')
      const tl = gsap.timeline({
        onComplete: () => setPhase('video'),
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
      {phase === 'video' && (
        <div className="absolute right-4 top-4 z-30 flex gap-2">
          <VoiceToggle />
          <LanguageToggle />
        </div>
      )}

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
              <div className="overflow-hidden rounded-full" style={{ width: 'min(60vw, 300px)', height: 'min(60vw, 300px)' }}>
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
              className="max-w-xl text-center font-display text-2xl text-gradient-gold sm:text-3xl md:text-4xl"
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
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => selectPueblo('Isla Mujeres')}
                  className="btn-jelly inline-flex items-center gap-2 rounded-full bg-[var(--c-secondary)] px-7 py-3 text-base font-bold text-[var(--c-primary-deep)] shadow-sea-lg"
                >
                  <MapPin size={20} /> {t('splash.islaMujeres')}
                </button>
                <button
                  onClick={() => selectPueblo('otros')}
                  className="btn-jelly inline-flex items-center gap-2 rounded-full border-2 border-[var(--c-secondary)] px-7 py-3 text-base font-bold text-[var(--c-secondary)]"
                >
                  <Sparkles size={20} /> {t('splash.otros')}
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
