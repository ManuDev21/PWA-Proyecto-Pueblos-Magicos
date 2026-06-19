import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import RecommendationCard from './RecommendationCard'
import Itinerary from './Itinerary'
import LanguageToggle from '../../components/ui/LanguageToggle'
import VoiceToggle from '../../components/ui/VoiceToggle'
import { useVisitorStore } from '../../store/useVisitorStore'
import { useT } from '../../i18n/useT'
import { tc } from '../../i18n/contentTranslations'

export default function RecommendationsScreen({ result }) {
  const navigate = useNavigate()
  const { t, lang } = useT()
  const visitante = useVisitorStore((s) => s.visitante)

  // Agrupar recomendaciones por categoría
  const grupos = result.recomendaciones.reduce((acc, item, i) => {
    const cat = item.experiencia.categoria?.nombre || 'Otras'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push({ item, index: i })
    return acc
  }, {})

  return (
    <div className="bg-mayan flex min-h-screen flex-col">
      <div className="absolute right-4 top-4 z-30 flex gap-2">
        <VoiceToggle />
        <LanguageToggle />
      </div>
      <Header compact />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 md:p-8"
        >
          <button
            onClick={() => navigate('/resultados')}
            className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--c-cream)]/80 hover:text-[var(--c-secondary)]"
          >
            <ArrowLeft size={16} /> {t('recs.back')}
          </button>
          <div className="flex items-center gap-3">
            <Sparkles className="text-[var(--c-secondary)]" />
            <h1 className="font-display text-3xl text-gradient-gold md:text-4xl">
              {t('recs.title')}
            </h1>
          </div>
          <p className="mt-2 text-[var(--c-cream)]/80">
            {t('recs.subtitle', { perfil: result.perfil_detectado })}
          </p>
        </motion.section>

        {/* Experiencias agrupadas por categoría */}
        <section className="mt-10">
          <h2 className="mb-5 font-display text-2xl text-gradient-gold">
            {t('recs.byCategory')}
          </h2>
          <div className="space-y-10">
            {Object.entries(grupos).map(([categoria, items]) => (
              <div key={categoria}>
                <h3 className="mb-4 inline-block rounded-full bg-[var(--c-secondary)] px-4 py-1 font-display text-lg font-semibold text-[var(--c-primary-deep)]">
                  {tc(categoria, lang)}
                </h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(({ item, index }) => (
                    <RecommendationCard key={index} item={item} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Itinerario recomendado */}
        <Itinerary visitanteId={result.visitante_id} visitorName={visitante.nombre} />
      </main>
      <Footer />
    </div>
  )
}
