import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Loader2, Download, Clock } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { getItinerario } from '../../lib/api'
import { useT } from '../../i18n/useT'
import { tc } from '../../i18n/contentTranslations'

const TIPOS = [
  { id: 'medio_dia', key: 'res.it.medio' },
  { id: '1_dia', key: 'res.it.1' },
  { id: '2_dias', key: 'res.it.2' },
  { id: 'fin_de_semana', key: 'res.it.finde' },
]

export default function Itinerary({ visitanteId, visitorName = '' }) {
  const { t, lang } = useT()
  const [tipo, setTipo] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const tipoLabel = (id) => {
    const found = TIPOS.find((tp) => tp.id === id)
    return found ? t(found.key) : ''
  }

  const descargarItinerarioPDF = () => {
    if (!data) return
    const doc = new jsPDF()
    doc.setFillColor(15, 61, 46)
    doc.rect(0, 0, 210, 36, 'F')
    doc.setTextColor(201, 162, 39)
    doc.setFontSize(22)
    doc.text(`ÍXA · ${t('res.it.title')}`, 14, 23)

    doc.setTextColor(40, 40, 40)
    doc.setFontSize(12)
    let y = 48
    if (visitorName) {
      doc.text(`${t('res.it.for')}: ${visitorName}`, 14, y)
      y += 7
    }
    doc.text(`${tipoLabel(tipo)}`, 14, y)
    y += 10

    data.bloques.forEach((bloque) => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }
      doc.setFontSize(14)
      doc.setTextColor(15, 61, 46)
      doc.text(tc(bloque.titulo, lang), 14, y)
      y += 7
      doc.setFontSize(11)
      doc.setTextColor(40, 40, 40)
      bloque.actividades.forEach((act) => {
        if (y > 275) {
          doc.addPage()
          y = 20
        }
        doc.text(`  ${act.hora}  ·  ${act.experiencia.nombre}`, 14, y)
        y += 6
        if (act.maps_url) {
          doc.setTextColor(120, 120, 120)
          doc.text(`       ${act.maps_url}`, 14, y)
          doc.setTextColor(40, 40, 40)
          y += 6
        }
      })
      y += 4
    })

    doc.save(`ixa-itinerario-${(visitorName || 'viajero').toLowerCase()}.pdf`)
  }

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

      {data && !loading && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={descargarItinerarioPDF}
          className="btn-jelly mt-6 inline-flex items-center gap-2 rounded-2xl bg-[var(--c-accent)] px-5 py-2.5 text-sm font-bold text-[var(--c-primary-deep)] shadow-sea-lg"
        >
          <Download size={18} /> {t('res.it.downloadPdf')}
        </motion.button>
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
                  {tc(bloque.titulo, lang)}
                </h3>
                <ul className="space-y-3">
                  {bloque.actividades.map((act, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="whitespace-nowrap rounded-lg bg-[var(--c-secondary)] px-2 py-1 text-xs font-bold text-[var(--c-primary-deep)]">
                        {act.hora}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[var(--c-cream)]">{tc(act.experiencia.nombre, lang)}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[var(--c-cream)]/70">
                          {act.experiencia.categoria?.nombre && (
                            <span className="rounded-full bg-[var(--c-primary-light)]/40 px-2 py-0.5 text-[var(--c-sage)]">
                              {tc(act.experiencia.categoria.nombre, lang)}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {Number(act.experiencia.duracion_horas)} h
                          </span>
                        </div>
                        <a
                          href={act.maps_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 flex items-center gap-1 text-xs text-[var(--c-sage)] hover:underline"
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
