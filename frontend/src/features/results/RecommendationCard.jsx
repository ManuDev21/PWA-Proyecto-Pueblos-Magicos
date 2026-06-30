import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Star, BookOpen, ArrowLeft, Volume2, Square } from 'lucide-react'
import { useT } from '../../i18n/useT'
import { tc } from '../../i18n/contentTranslations'
import { speak, stopSpeaking } from '../../lib/speech'

export default function RecommendationCard({ item, index }) {
  const { t, lang } = useT()
  const exp = item.experiencia
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [flipped, setFlipped] = useState(false)
  const [playing, setPlaying] = useState(false)

  const toggleAudio = (e) => {
    e.stopPropagation()
    if (playing) {
      stopSpeaking()
      setPlaying(false)
    } else {
      stopSpeaking()
      setPlaying(true)
      speak(tc(exp.historia, lang), lang)
    }
  }

  const handleFlipBack = () => {
    if (playing) {
      stopSpeaking()
      setPlaying(false)
    }
    setFlipped(false)
  }

  const handleMove = (e) => {
    if (flipped) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: -py * 10, ry: px * 10 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      className="relative h-80 [perspective:1200px] transition-transform"
    >
      <div
        className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Cara frontal */}
        <div className="hover-reveal glass absolute inset-0 overflow-hidden rounded-3xl shadow-sea [backface-visibility:hidden]">
          <img
            src={exp.imagen_url}
            alt={tc(exp.nombre, lang)}
            onError={(e) => {
              e.currentTarget.src = '/assets/logo.jpeg'
            }}
            className="reveal-img absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-primary-deep)] via-[var(--c-primary-deep)]/30 to-transparent" />

          <span className="reveal-base absolute left-3 top-3 z-10 rounded-full bg-[var(--c-secondary)] px-3 py-1 text-xs font-semibold text-[var(--c-primary-deep)]">
            {exp.categoria?.nombre ? tc(exp.categoria.nombre, lang) : 'Experiencia'}
          </span>

          <div className="reveal-base absolute bottom-0 left-0 z-10 p-5">
            <h3 className="font-display text-xl text-white drop-shadow">{tc(exp.nombre, lang)}</h3>
            <div className="mt-1 flex gap-3 text-xs text-[var(--c-cream)]/90">
              <span className="flex items-center gap-1">
                <Star size={13} className="text-[var(--c-secondary)]" />
                {Number(exp.puntuacion_promedio).toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-[var(--c-secondary)]" />
                {Number(exp.duracion_horas)} h
              </span>
            </div>
          </div>

          <div className="reveal-info absolute inset-0 z-20 flex flex-col justify-center bg-[var(--c-primary-deep)]/95 p-6 text-center">
            <h3 className="font-display text-xl text-[var(--c-secondary)]">{tc(exp.nombre, lang)}</h3>
            <p className="mt-2 text-sm text-[var(--c-cream)]/90">{tc(exp.descripcion, lang)}</p>
            <span className="mx-auto mt-3 rounded-full bg-[var(--c-secondary)]/20 px-3 py-1 text-xs font-semibold text-[var(--c-secondary)]">
              {t('res.affinity')} {Math.round(item.score)}
            </span>
            <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-2">
              <a
                href={item.maps_url}
                target="_blank"
                rel="noreferrer"
                className="btn-jelly flex w-max items-center justify-center gap-2 rounded-2xl bg-[var(--c-secondary)] px-5 py-2 text-sm font-semibold text-[var(--c-primary-deep)]"
              >
                <MapPin size={16} /> {t('res.viewMaps')}
              </a>
              {exp.historia && (
                <button
                  onClick={() => setFlipped(true)}
                  className="btn-jelly flex w-max items-center justify-center gap-2 rounded-2xl border border-[var(--c-secondary)]/50 px-5 py-2 text-sm font-semibold text-[var(--c-secondary)] hover:bg-[var(--c-secondary)]/10"
                >
                  <BookOpen size={16} /> {t('exp.miHistoria')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cara trasera — historia */}
        {exp.historia && (
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--c-primary-deep)] to-[#061814] p-6 shadow-sea [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--c-secondary)]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[var(--c-accent)]/15 blur-2xl" />

            <div className="relative flex h-full flex-col">
              <span className="mb-3 flex w-max items-center gap-2 rounded-full bg-[var(--c-secondary)]/20 px-3 py-1 text-xs font-semibold text-[var(--c-secondary)]">
                <BookOpen size={14} /> {t('exp.miHistoria')}
              </span>
              <h3 className="mb-3 font-display text-lg text-[var(--c-secondary)]">{tc(exp.nombre, lang)}</h3>
              <AnimatePresence>
                {flipped && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex-1 overflow-y-auto text-sm leading-relaxed text-[var(--c-cream)]/90"
                  >
                    {tc(exp.historia, lang)}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={handleFlipBack}
                  className="btn-jelly flex w-max items-center gap-2 rounded-2xl border border-[var(--c-secondary)]/40 px-4 py-2 text-xs font-semibold text-[var(--c-cream)] hover:bg-white/5"
                >
                  <ArrowLeft size={14} /> {t('exp.cerrarHistoria')}
                </button>
                <button
                  onClick={toggleAudio}
                  className="btn-jelly flex w-max items-center gap-2 rounded-2xl border border-[var(--c-secondary)]/40 px-4 py-2 text-xs font-semibold text-[var(--c-secondary)] hover:bg-[var(--c-secondary)]/10"
                >
                  {playing ? <Square size={14} /> : <Volume2 size={14} />}
                  {playing ? t('exp.detener') : t('exp.escuchar')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
