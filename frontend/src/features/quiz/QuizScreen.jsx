import { useEffect, useMemo, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { getPreguntas, submitQuiz } from '../../lib/api'
import { useVisitorStore } from '../../store/useVisitorStore'
import IxaAvatar from '../../components/ui/IxaAvatar'
import LanguageToggle from '../../components/ui/LanguageToggle'
import VoiceToggle from '../../components/ui/VoiceToggle'
import { useT } from '../../i18n/useT'
import { speak } from '../../lib/speech'
import { showError } from '../../lib/alerts'

const OPTION_COLORS = [
  'bg-[#FF6F61]', // A coral
  'bg-[#F4B740]', // B sol
  'bg-[#2FC4B2]', // C aguamarina
  'bg-[#0A7C95]', // D mar
  'bg-[#9B59B6]', // E orquídea
]

export default function QuizScreen() {
  const navigate = useNavigate()
  const { t, lang } = useT()
  const visitante = useVisitorStore((s) => s.visitante)
  const setResult = useVisitorStore((s) => s.setResult)

  const { data: preguntas = [], isLoading, isError } = useQuery({
    queryKey: ['preguntas'],
    queryFn: getPreguntas,
  })

  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({}) // { pregunta_id: inciso }
  const [selected, setSelected] = useState(null)

  const mutation = useMutation({
    mutationFn: submitQuiz,
    onSuccess: (data) => {
      setResult(data)
      navigate('/resultados')
    },
    onError: () => {
      showError(t('common.error'), t('common.errorQuizText'), t('common.close'))
    },
  })

  const progress = useMemo(
    () => (preguntas.length ? ((idx) / preguntas.length) * 100 : 0),
    [idx, preguntas.length]
  )

  const pregunta = preguntas[idx]

  // ÍXA lee la pregunta en voz alta al cambiar
  useEffect(() => {
    if (pregunta && !mutation.isPending) speak(pregunta.pregunta, lang)
  }, [pregunta?.id, lang, mutation.isPending]) // eslint-disable-line

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center text-[var(--c-cream)]">
        <Loader2 className="animate-spin" /> <span className="ml-2">{t('quiz.loading')}</span>
      </div>
    )

  if (isError || !preguntas.length)
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center text-[var(--c-cream)]">
        {t('quiz.error')}
      </div>
    )

  const handleSelect = (inciso) => {
    setSelected(inciso)
    setAnswers((a) => ({ ...a, [pregunta.id]: inciso }))
    setTimeout(() => {
      setSelected(null)
      if (idx + 1 < preguntas.length) {
        setIdx(idx + 1)
      } else {
        finish({ ...answers, [pregunta.id]: inciso })
      }
    }, 380)
  }

  const finish = (allAnswers) => {
    const respuestas = Object.entries(allAnswers).map(([pid, inciso]) => ({
      pregunta_id: Number(pid),
      inciso,
    }))
    mutation.mutate({
      visitante: {
        nombre: visitante.nombre,
        edad: Number(visitante.edad),
        correo_electronico: visitante.correo_electronico,
        telefono: visitante.telefono,
      },
      respuestas,
    })
  }

  return (
    <div className="bg-mayan relative flex min-h-screen flex-col px-4 py-8">
      {/* Idioma y voz disponibles en todo momento */}
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <VoiceToggle />
        <LanguageToggle />
      </div>

      {/* ÍXA lee la pregunta */}
      <div className="mx-auto mb-5 flex w-full max-w-3xl flex-col items-center">
        <IxaAvatar size={120} speaking={!mutation.isPending} className="shadow-sea-lg" />
        <p className="mt-2 flex items-center gap-2 text-sm text-[var(--c-cream)]/80">
          <span className="font-display text-lg text-gradient-gold">ÍXA</span>
          · {t('quiz.iaSpeaking')}
        </p>
      </div>

      {/* Barra de progreso */}
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-2 flex justify-between text-sm text-[var(--c-cream)]/80">
          <span>
            {t('quiz.question')} {idx + 1} {t('quiz.of')} {preguntas.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--c-primary-deep)]">
          <motion.div
            className="h-full rounded-full bg-[var(--c-secondary)]"
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
      </div>

      {mutation.isPending ? (
        <div className="flex flex-1 flex-col items-center justify-center text-[var(--c-cream)]">
          <Loader2 size={48} className="animate-spin text-[var(--c-secondary)]" />
          <p className="mt-4 font-display text-xl text-gradient-gold">{t('quiz.analyzing')}</p>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={pregunta.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{ perspective: 1000 }}
            >
              <h2 className="mb-8 text-center font-display text-2xl text-[var(--c-cream)] md:text-3xl">
                {pregunta.pregunta}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {pregunta.opciones.map((op, i) => (
                  <motion.button
                    key={`${pregunta.id}-${op.id}`}
                    whileHover={{ scale: 1.05, rotateX: 6, rotateY: i % 2 ? -6 : 6, y: -4 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleSelect(op.inciso)}
                    style={{
                      transformStyle: 'preserve-3d',
                      animationDelay: `${i * 0.09}s`,
                      boxShadow: '0 10px 0 rgba(0,0,0,0.18), 0 18px 35px rgba(5,60,76,0.45)',
                    }}
                    className={`btn-jelly flex items-center gap-3 rounded-3xl px-5 py-5 text-left text-white transition-all ${
                      OPTION_COLORS[i % OPTION_COLORS.length]
                    } ${i % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'} ${
                      selected === op.inciso ? 'ring-4 ring-white' : ''
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/30 font-bold">
                      {op.inciso}
                    </span>
                    <span className="font-semibold">{op.texto}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
