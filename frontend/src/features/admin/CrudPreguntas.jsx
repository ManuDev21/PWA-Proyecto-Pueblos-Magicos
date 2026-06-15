import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { getPreguntasAdmin, createPregunta, updatePregunta, deletePregunta } from '../../lib/api'
import Button from '../../components/ui/Button'
import PreguntaFormModal from './PreguntaFormModal'
import { useT } from '../../i18n/useT'

export default function CrudPreguntas() {
  const qc = useQueryClient()
  const { t } = useT()
  const [modal, setModal] = useState(null) // null | {} (nueva) | pregunta (editar)
  const { data: preguntas = [] } = useQuery({ queryKey: ['preguntas-admin'], queryFn: getPreguntasAdmin })

  const invalidate = () => qc.invalidateQueries({ queryKey: ['preguntas-admin'] })
  const mCreate = useMutation({ mutationFn: createPregunta, onSuccess: invalidate })
  const mUpdate = useMutation({ mutationFn: ({ id, data }) => updatePregunta(id, data), onSuccess: invalidate })
  const mDelete = useMutation({ mutationFn: deletePregunta, onSuccess: invalidate })

  const onSave = (data) => {
    if (modal?.id) {
      mUpdate.mutate({ id: modal.id, data })
    } else {
      mCreate.mutate(data)
    }
    setModal(null)
  }

  const onDelete = async (q) => {
    const r = await Swal.fire({
      title: t('admin.q.confirmDelete'),
      text: q.pregunta,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('admin.delete'),
      cancelButtonText: t('admin.cancel'),
      confirmButtonColor: '#B5462F',
    })
    if (r.isConfirmed) mDelete.mutate(q.id)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-gradient-gold">{t('admin.q.title')}</h2>
        <Button onClick={() => setModal({})}>
          <span className="flex items-center gap-2"><Plus size={18} /> {t('admin.new')}</span>
        </Button>
      </div>
      <div className="space-y-3">
        <AnimatePresence>
          {preguntas.map((q, i) => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
              className="glass rounded-2xl p-4 transition-shadow hover:shadow-sea"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-[var(--c-cream)]">
                    {q.orden}. {q.pregunta}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {q.opciones.map((o) => (
                      <span key={o.id} className="rounded-full bg-[var(--c-primary-deep)]/60 px-2 py-1 text-xs text-[var(--c-cream)]/80">
                        {o.inciso}) {o.texto} · <em className="text-[var(--c-secondary)]">{o.categoria_destino}</em>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setModal(q)}
                    className="rounded-lg bg-[var(--c-secondary)]/20 p-2 text-[var(--c-secondary)]"
                  >
                    <Pencil size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(q)}
                    className="rounded-lg bg-[var(--c-accent)]/20 p-2 text-[var(--c-accent)]"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {modal !== null && (
        <PreguntaFormModal
          pregunta={modal}
          onSave={onSave}
          onClose={() => setModal(null)}
          t={t}
        />
      )}
    </div>
  )
}
