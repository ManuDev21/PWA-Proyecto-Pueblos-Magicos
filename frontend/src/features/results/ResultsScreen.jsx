import { motion } from 'framer-motion'
import { Brain, Download, RefreshCw, Sparkles } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'
import RecommendationCard from './RecommendationCard'
import Itinerary from './Itinerary'
import LanguageToggle from '../../components/ui/LanguageToggle'
import VoiceToggle from '../../components/ui/VoiceToggle'
import { useVisitorStore } from '../../store/useVisitorStore'
import { useT } from '../../i18n/useT'

export default function ResultsScreen({ result }) {
  const navigate = useNavigate()
  const { t } = useT()
  const visitante = useVisitorStore((s) => s.visitante)
  const reset = useVisitorStore((s) => s.reset)

  const generarFolletoPDF = () => {
    const doc = new jsPDF()
    doc.setFillColor(15, 61, 46)
    doc.rect(0, 0, 210, 40, 'F')
    doc.setTextColor(201, 162, 39)
    doc.setFontSize(26)
    doc.text('ÍXA · Folleto de Experiencias', 14, 25)

    doc.setTextColor(40, 40, 40)
    doc.setFontSize(12)
    let y = 52
    doc.text(`Viajero: ${visitante.nombre}`, 14, y)
    y += 7
    doc.text(`Perfil detectado: ${result.perfil_detectado} (${Math.round(result.confianza)}%)`, 14, y)
    y += 7
    const expl = doc.splitTextToSize(result.explicacion || '', 180)
    doc.text(expl, 14, y)
    y += expl.length * 6 + 4

    doc.setFontSize(14)
    doc.setTextColor(15, 61, 46)
    doc.text('Experiencias recomendadas:', 14, y)
    y += 8
    doc.setFontSize(11)
    doc.setTextColor(40, 40, 40)
    result.recomendaciones.forEach((r, i) => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }
      doc.text(`${i + 1}. ${r.experiencia.nombre} — ${r.experiencia.categoria?.nombre || ''}`, 14, y)
      y += 6
      doc.setTextColor(120, 120, 120)
      doc.text(`   ${r.maps_url}`, 14, y)
      doc.setTextColor(40, 40, 40)
      y += 8
    })

    doc.save(`ixa-folleto-${visitante.nombre || 'viajero'}.pdf`)
  }

  return (
    <div className="bg-mayan flex min-h-screen flex-col">
      <div className="absolute right-4 top-4 z-30 flex gap-2">
        <VoiceToggle />
        <LanguageToggle />
      </div>
      <Header compact />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {/* Perfil + explicabilidad */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="text-[var(--c-secondary)]" />
            <p className="text-[var(--c-cream)]/80">
              {t('res.yourProfile', { name: visitante.nombre })}
            </p>
          </div>
          <h1 className="mt-2 font-display text-4xl text-gradient-gold md:text-5xl">
            {result.perfil_detectado}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-[var(--c-primary-light)] px-3 py-1 text-sm text-[var(--c-cream)]">
              {t('res.model')}: {result.modelo_usado}
            </span>
            <span className="rounded-full bg-[var(--c-secondary)] px-3 py-1 text-sm font-semibold text-[var(--c-primary-deep)]">
              {t('res.confidence')} {Math.round(result.confianza)}%
            </span>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[var(--c-primary-deep)]/60 p-4">
            <Brain className="mt-1 shrink-0 text-[var(--c-sage)]" />
            <p className="text-[var(--c-cream)]/90 italic">{result.explicacion}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={generarFolletoPDF}>
              <span className="flex items-center gap-2">
                <Download size={18} /> {t('res.downloadPdf')}
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                reset()
                navigate('/')
              }}
            >
              <span className="flex items-center gap-2">
                <RefreshCw size={18} /> {t('res.restart')}
              </span>
            </Button>
          </div>
        </motion.section>

        {/* Recomendaciones */}
        <section className="mt-10">
          <h2 className="mb-5 font-display text-2xl text-gradient-gold">
            {t('res.forYou')}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {result.recomendaciones.map((item, i) => (
              <RecommendationCard key={i} item={item} index={i} />
            ))}
          </div>
        </section>

        {/* Itinerario */}
        <Itinerary visitanteId={result.visitante_id} />
      </main>
      <Footer />
    </div>
  )
}
