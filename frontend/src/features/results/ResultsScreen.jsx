import { motion } from 'framer-motion'
import { Brain, MessageCircle, RefreshCw, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'
import LanguageToggle from '../../components/ui/LanguageToggle'
import VoiceToggle from '../../components/ui/VoiceToggle'
import { useVisitorStore } from '../../store/useVisitorStore'
import { useT } from '../../i18n/useT'
import { showWarning } from '../../lib/alerts'

export default function ResultsScreen({ result }) {
  const navigate = useNavigate()
  const { t } = useT()
  const visitante = useVisitorStore((s) => s.visitante)
  const reset = useVisitorStore((s) => s.reset)

  // Código de país por defecto (México). Se antepone si el número es nacional.
  const COUNTRY_CODE = '52'
  const normalizePhone = (raw) => {
    let digits = (raw || '').replace(/\D/g, '')
    if (!digits) return ''
    if (digits.startsWith('00')) digits = digits.slice(2) // prefijo internacional 00
    if (digits.length === 10) digits = COUNTRY_CODE + digits // número nacional MX
    return digits
  }

  const enviarWhatsApp = () => {
    const phone = normalizePhone(visitante.telefono)
    if (!phone) {
      showWarning(t('res.noPhoneTitle'), t('res.noPhoneBody'), t('common.close'))
      return
    }
    const link = `${window.location.origin}/recomendaciones`
    const mensaje = t('res.waMessage', {
      name: visitante.nombre || '',
      perfil: result.perfil_detectado,
      link,
    })
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank', 'noopener,noreferrer')
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
            <motion.button
              onClick={enviarWhatsApp}
              whileHover={{
                scale: [1, 1.12, 0.95, 1.05, 0.98, 1.02, 1],
                transition: { duration: 0.6, ease: 'easeInOut' },
              }}
              whileTap={{ scale: 0.94 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 font-bold text-white shadow-sea-lg"
            >
              <MessageCircle size={20} /> {t('res.getInfo')}
            </motion.button>
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
      </main>
      <Footer />
    </div>
  )
}
