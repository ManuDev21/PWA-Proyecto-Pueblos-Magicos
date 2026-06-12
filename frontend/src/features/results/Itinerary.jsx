import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Loader2 } from 'lucide-react'
import { getItinerario } from '../../lib/api'
import { useT } from '../../i18n/useT'

const TIPOS = [
  { id: 'medio_dia', key: 'res.it.medio' },
  { id: '1_dia', key: 'res.it.1' },
  { id: '2_dias', key: 'res.it.2' },
  { id: 'fin_de_semana', key: 'res.it.finde' },
]

export default function Itinerary({ visitanteId }) {
  const { t } = useT()
  const [tipo, setTipo] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async (tipoId) => {
    setTipo(tipoId)
    setLoading(true)
    try {
      const res = await getItinerario(visitanteId, tipoId)
      setData(res)
    } catch (e) {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-12">
      <h2 className="mb-4 flex items-center gap-2 font-display text-2xl text-gradient-gold">
        <Calendar /> {t('res.itinerary')}
      </h2>
      <div className="flex flex-wrap gap-3">
        {TIPOS.map((tp) => (
          <button
            key={tp.id}
            onClick={() => load(tp.id)}
            className={`btn-jelly rounded-2xl px-5 py-2 font-medium transition-all ${
              tipo === tp.id
                ? 'bg-[var(--c-secondary)] text-[var(--c-primary-deep)]'
                : 'border-2 border-[var(--c-secondary)]/50 text-[var(--c-cream)]'
            }`}
          >
            {t(tp.key)}
          </button>
        ))}
      </div>

      {loading && (
        <div className="mt-6 flex items-center gap-2 text-[var(--c-cream)]">
          <Loader2 className="animate-spin" /> {t('res.generating')}
        </div>
      )}

      <AnimatePresence>
        {data && !loading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            {data.bloques.map((bloque, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-3xl p-5"
              >
                <h3 className="mb-3 font-display text-lg text-[var(--c-secondary)]">
                  {bloque.titulo}
                </h3>
                <ul className="space-y-3">
                  {bloque.actividades.map((act, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="rounded-lg bg-[var(--c-secondary)] px-2 py-1 text-xs font-bold text-[var(--c-primary-deep)]">
                        {act.hora}
                      </span>
                      <div>
                        <p className="text-[var(--c-cream)]">{act.experiencia.nombre}</p>
                        <a
                          href={act.maps_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-[var(--c-sage)] hover:underline"
                        >
                          <MapPin size={12} /> {t('res.location')}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
