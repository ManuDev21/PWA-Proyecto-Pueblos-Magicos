import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import { getExperiencias } from '../../lib/api'
import { useT } from '../../i18n/useT'

export default function ExperiencesPreview() {
  const { t } = useT()
  const { data: experiencias = [] } = useQuery({
    queryKey: ['experiencias'],
    queryFn: getExperiencias,
  })

  const top = experiencias.slice(0, 6)

  return (
    <section id="experiencias" className="bg-mayan px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-display text-4xl text-gradient-gold md:text-5xl"
        >
          {t('nav.experiences')}
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="hover-reveal relative h-72 overflow-hidden rounded-3xl shadow-sea"
            >
              <img
                src={e.imagen_url}
                alt={e.nombre}
                onError={(ev) => {
                  ev.currentTarget.src = '/assets/logo.jpeg'
                }}
                className="reveal-img absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-primary-deep)] via-transparent to-transparent" />

              {/* Título visible siempre (se desvanece al hover) */}
              <div className="reveal-base absolute bottom-0 left-0 p-5">
                <span className="rounded-full bg-[var(--c-secondary)] px-3 py-1 text-xs font-semibold text-[var(--c-primary-deep)]">
                  {e.categoria?.nombre}
                </span>
                <h3 className="mt-2 font-display text-xl text-white drop-shadow">{e.nombre}</h3>
              </div>

              {/* Info revelada al hover */}
              <div className="reveal-info absolute inset-0 flex flex-col justify-center bg-[var(--c-primary-deep)]/95 p-6 text-center">
                <h3 className="font-display text-xl text-[var(--c-secondary)]">{e.nombre}</h3>
                <p className="mt-2 text-sm text-[var(--c-cream)]/90">{e.descripcion}</p>
                <div className="mt-3 flex items-center justify-center gap-3 text-xs text-[var(--c-cream)]/80">
                  <span className="flex items-center gap-1">
                    <Star size={13} className="text-[var(--c-secondary)]" />
                    {Number(e.puntuacion_promedio).toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-[var(--c-secondary)]" /> Isla Mujeres
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
