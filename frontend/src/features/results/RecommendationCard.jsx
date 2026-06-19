import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Star } from 'lucide-react'
import { useT } from '../../i18n/useT'
import { tc } from '../../i18n/contentTranslations'

export default function RecommendationCard({ item, index }) {
  const { t, lang } = useT()
  const exp = item.experiencia
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const handleMove = (e) => {
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
      className="hover-reveal glass relative h-80 overflow-hidden rounded-3xl shadow-sea transition-transform"
    >
      {/* Imagen (se desvanece al hover) */}
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

      {/* Título visible (se desvanece al hover) */}
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

      {/* Info revelada al hover */}
      <div className="reveal-info absolute inset-0 z-20 flex flex-col justify-center bg-[var(--c-primary-deep)]/95 p-6 text-center">
        <h3 className="font-display text-xl text-[var(--c-secondary)]">{tc(exp.nombre, lang)}</h3>
        <p className="mt-2 text-sm text-[var(--c-cream)]/90">{tc(exp.descripcion, lang)}</p>
        <span className="mx-auto mt-3 rounded-full bg-[var(--c-secondary)]/20 px-3 py-1 text-xs font-semibold text-[var(--c-secondary)]">
          {t('res.affinity')} {Math.round(item.score)}
        </span>
        <a
          href={item.maps_url}
          target="_blank"
          rel="noreferrer"
          className="btn-jelly mx-auto mt-4 flex w-max items-center justify-center gap-2 rounded-2xl bg-[var(--c-secondary)] px-5 py-2 text-sm font-semibold text-[var(--c-primary-deep)]"
        >
          <MapPin size={16} /> {t('res.viewMaps')}
        </a>
      </div>
    </motion.div>
  )
}
