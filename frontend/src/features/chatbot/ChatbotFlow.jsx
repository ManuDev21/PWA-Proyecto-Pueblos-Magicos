import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { checkAdmin } from '../../lib/api'
import { useVisitorStore } from '../../store/useVisitorStore'
import Button from '../../components/ui/Button'
import IxaAvatar from '../../components/ui/IxaAvatar'
import { useT } from '../../i18n/useT'
import { speak } from '../../lib/speech'
import { showWarning, showError } from '../../lib/alerts'

// Solo letras (incluye tildes y ñ), espacios y apóstrofo/guion. Sin números ni símbolos.
const NAME_RE = /^[A-Za-zÀ-ÿñÑ\s'.-]{2,}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STEPS = [
  { key: 'nombre', q: 'chat.q.nombre', ph: 'chat.ph.nombre', err: 'chat.err.nombre',
    validate: (v) => NAME_RE.test(v.trim()) },
  { key: 'edad', q: 'chat.q.edad', ph: 'chat.ph.edad', err: 'chat.err.edad', type: 'number',
    validate: (v) => Number(v) >= 1 && Number(v) <= 120 },
  { key: 'correo_electronico', q: 'chat.q.correo', ph: 'chat.ph.correo', err: 'chat.err.correo', type: 'email',
    validate: (v) => EMAIL_RE.test(v.trim()) },
  { key: 'telefono', q: 'chat.q.telefono', ph: 'chat.ph.telefono', err: 'chat.err.telefono', type: 'tel',
    validate: (v) => v.replace(/\D/g, '').length >= 10 },
]

export default function ChatbotFlow() {
  const navigate = useNavigate()
  const { t, lang } = useT()
  const setVisitante = useVisitorStore((s) => s.setVisitante)
  const [stepIdx, setStepIdx] = useState(0)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const dataRef = useRef({})
  const initedRef = useRef(false) // evita doble presentación (React StrictMode)

  // Los mensajes del bot guardan su CLAVE de traducción (+ vars) para poder
  // re-renderizarse en el idioma elegido en cualquier momento.
  const pushBot = (key, vars) => {
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', key, vars }])
      setTyping(false)
      speak(t(key, vars), lang) // ÍXA lo dice en voz alta
    }, 700)
  }

  // Presentación inicial: SOLO una vez
  useEffect(() => {
    if (initedRef.current) return
    initedRef.current = true
    pushBot('chat.q.nombre')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Al cambiar de idioma, ÍXA repite la pregunta actual ya traducida
  useEffect(() => {
    if (!initedRef.current || messages.length === 0) return
    const step = STEPS[stepIdx]
    if (step) speak(t(step.q, { name: dataRef.current.nombre }), lang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = async () => {
    const step = STEPS[stepIdx]
    const value = input.trim()
    if (!value) return

    // El acceso de administrador se verifica ANTES de validar el nombre
    // (el correo admin contiene '@' y la validación de nombre lo rechazaría)
    if (step.key === 'nombre') {
      try {
        const { is_admin } = await checkAdmin(value)
        if (is_admin) {
          setMessages((m) => [...m, { from: 'user', text: value }])
          setInput('')
          pushBot('chat.admin')
          setTimeout(() => navigate('/admin'), 1400)
          return
        }
      } catch (e) {
        // Si parecía un intento de acceso admin, avisar que el servidor no responde
        if (value.includes('@')) {
          showError('ÍXA', t('common.errorQuizText'), t('common.close'))
          return
        }
        /* continúa flujo normal si el backend no responde */
      }
    }

    if (!step.validate(value)) {
      showWarning('ÍXA', t(step.err), t('common.close'))
      return
    }

    setMessages((m) => [...m, { from: 'user', text: value }])
    setInput('')

    dataRef.current[step.key] = step.type === 'number' ? Number(value) : value
    setVisitante({ [step.key]: dataRef.current[step.key] })

    const next = stepIdx + 1
    if (next < STEPS.length) {
      const nextStep = STEPS[next]
      pushBot(nextStep.q, { name: dataRef.current.nombre })
      setStepIdx(next)
    } else {
      pushBot('chat.finish')
      setTimeout(() => navigate('/quiz'), 1800)
    }
  }

  const currentType = STEPS[stepIdx]?.type || 'text'

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-4 px-4 py-6">
      <div
        ref={scrollRef}
        className="glass flex h-[60vh] flex-col gap-5 overflow-y-auto rounded-3xl p-4 md:p-6"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) =>
            m.from === 'bot' ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-end gap-3 self-start"
              >
                <IxaAvatar size={84} speaking={i === messages.length - 1 && !typing} />
                <div className="max-w-[78%] rounded-3xl rounded-bl-sm bg-[var(--c-primary-light)] px-5 py-3 text-[var(--c-cream)] shadow-sea">
                  {t(m.key, m.vars)}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-[78%] self-end rounded-3xl rounded-br-sm bg-[var(--c-secondary)] px-5 py-3 font-medium text-[var(--c-primary-deep)] shadow-sea"
              >
                {m.text}
              </motion.div>
            )
          )}
          {typing && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-end gap-3 self-start"
            >
              <IxaAvatar size={84} speaking />
              <div className="rounded-3xl rounded-bl-sm bg-[var(--c-primary-light)] px-5 py-4">
                <span className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-2 w-2 rounded-full bg-[var(--c-secondary)]"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        <input
          type={currentType}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t(STEPS[stepIdx]?.ph)}
          className="flex-1 rounded-2xl border border-[rgba(47,196,178,0.4)] bg-[var(--c-primary-deep)] px-4 py-3 text-[var(--c-cream)] outline-none focus:border-[var(--c-secondary)]"
        />
        <Button onClick={handleSend} className="!px-4">
          <Send size={20} />
        </Button>
      </div>
    </div>
  )
}
