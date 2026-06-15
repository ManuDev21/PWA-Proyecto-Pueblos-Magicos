import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, Save } from 'lucide-react'
import Button from '../../components/ui/Button'

const CATS = ['Cultural', 'Gastronómico', 'Ecológico', 'Comunitario', 'Bienestar']
const INCISOS = ['A', 'B', 'C', 'D', 'E']

const buildInitialOpciones = (opciones = []) =>
  INCISOS.map((inc, i) => {
    const existing = opciones.find((o) => o.inciso === inc)
    return {
      inciso: inc,
      texto: existing?.texto || '',
      categoria_destino: existing?.categoria_destino || CATS[i] || CATS[0],
      puntuacion: existing?.puntuacion ?? 1,
    }
  })

/**
 * Modal de alta/edición de preguntas del quiz con CRUD completo de opciones
 * (texto, categoría destino y puntuación por inciso).
 */
export default function PreguntaFormModal({ pregunta = {}, onSave, onClose, t }) {
  const isEdit = Boolean(pregunta.id)
  const [texto, setTexto] = useState(pregunta.pregunta || '')
  const [orden, setOrden] = useState(pregunta.orden ?? 0)
  const [opciones, setOpciones] = useState(buildInitialOpciones(pregunta.opciones))

  const setOpcion = (idx, key, value) =>
    setOpciones((prev) => prev.map((o, i) => (i === idx ? { ...o, [key]: value } : o)))

  const handleSave = () => {
    if (!texto.trim()) return
    const cleanOpciones = opciones
      .filter((o) => o.texto.trim())
      .map((o) => ({
        inciso: o.inciso,
        texto: o.texto.trim(),
        categoria_destino: o.categoria_destino,
        puntuacion: Number(o.puntuacion) || 1,
      }))
    if (cleanOpciones.length < 2) return
    onSave({
      pregunta: texto.trim(),
      orden: Number(orden) || 0,
      categoria: 'mixta',
      activa: true,
      opciones: cleanOpciones,
    })
  }

  const inputCls =
    'w-full rounded-xl border border-[rgba(47,196,178,0.4)] bg-[var(--c-primary-deep)] px-3 py-2 text-sm text-[var(--c-cream)] outline-none focus:border-[var(--c-secondary)]'

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-5 sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl text-gradient-gold">
            {isEdit ? t('admin.q.editTitle') : t('admin.q.newTitle')}
          </h3>
          <button onClick={onClose} className="rounded-full p-2 text-[var(--c-cream)]/70 hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <textarea
            className={`${inputCls} min-h-[70px]`}
            placeholder={t('admin.q.texto')}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              className={inputCls}
              placeholder={t('admin.q.orden')}
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            />
          </div>

          <p className="mt-2 text-sm font-semibold text-[var(--c-secondary)]">{t('admin.q.opciones')}</p>
          <div className="flex flex-col gap-2">
            {opciones.map((o, idx) => (
              <div key={o.inciso} className="flex flex-col gap-2 rounded-2xl bg-[var(--c-primary-deep)]/50 p-2 sm:flex-row sm:items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--c-secondary)]/25 font-bold text-[var(--c-secondary)]">
                  {o.inciso}
                </span>
                <input
                  className={`${inputCls} flex-1`}
                  placeholder={`${t('admin.q.opcion')} ${o.inciso}`}
                  value={o.texto}
                  onChange={(e) => setOpcion(idx, 'texto', e.target.value)}
                />
                <select
                  className={`${inputCls} sm:w-40`}
                  value={o.categoria_destino}
                  onChange={(e) => setOpcion(idx, 'categoria_destino', e.target.value)}
                >
                  {CATS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  type="number"
                  className={`${inputCls} sm:w-20`}
                  placeholder={t('admin.q.pts')}
                  value={o.puntuacion}
                  onChange={(e) => setOpcion(idx, 'puntuacion', e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-2xl px-5 py-2 text-sm text-[var(--c-cream)]/80 hover:bg-white/10">
            {t('admin.cancel')}
          </button>
          <Button onClick={handleSave}>
            <span className="flex items-center gap-2"><Save size={16} /> {t('admin.save')}</span>
          </Button>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}
