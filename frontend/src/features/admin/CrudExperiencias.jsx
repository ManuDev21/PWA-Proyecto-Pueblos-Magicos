import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react'
import Swal from 'sweetalert2'
import {
  getExperiencias, createExperiencia, updateExperiencia, deleteExperiencia,
  getCategorias,
} from '../../lib/api'
import Button from '../../components/ui/Button'
import ExperienceFormModal from './ExperienceFormModal'
import { useT } from '../../i18n/useT'

export default function CrudExperiencias() {
  const qc = useQueryClient()
  const { t } = useT()
  const [modal, setModal] = useState(null) // null | {} (nueva) | exp (editar)
  const { data: experiencias = [] } = useQuery({ queryKey: ['experiencias'], queryFn: getExperiencias })
  const { data: categorias = [] } = useQuery({ queryKey: ['categorias'], queryFn: getCategorias })

  const invalidate = () => qc.invalidateQueries({ queryKey: ['experiencias'] })
  const mCreate = useMutation({ mutationFn: createExperiencia, onSuccess: invalidate })
  const mUpdate = useMutation({ mutationFn: ({ id, data }) => updateExperiencia(id, data), onSuccess: invalidate })
  const mDelete = useMutation({ mutationFn: deleteExperiencia, onSuccess: invalidate })

  const onSave = (data) => {
    if (modal?.id) {
      mUpdate.mutate({ id: modal.id, data })
    } else {
      mCreate.mutate(data)
    }
    setModal(null)
  }
  const onDelete = async (exp) => {
    const r = await Swal.fire({
      title: t('admin.confirmDelete', { name: exp.nombre }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('admin.delete'),
      cancelButtonText: t('admin.cancel'),
      confirmButtonColor: '#B5462F',
    })
    if (r.isConfirmed) mDelete.mutate(exp.id)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-gradient-gold">{t('admin.exp.title')}</h2>
        <Button onClick={() => setModal({})}>
          <span className="flex items-center gap-2"><Plus size={18} /> {t('admin.new')}</span>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {experiencias.map((e, i) => (
            <motion.div
              key={e.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group glass overflow-hidden rounded-3xl shadow-sea transition-shadow hover:shadow-sea-lg"
            >
              <div className="relative h-32 w-full overflow-hidden">
                <img
                  src={e.imagen_url}
                  alt={e.nombre}
                  onError={(ev) => { ev.currentTarget.src = '/assets/logo.jpeg' }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-primary-deep)]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-4">
                <p className="font-medium text-[var(--c-cream)]">{e.nombre}</p>
                <p className="text-xs text-[var(--c-secondary)]">{e.categoria?.nombre}</p>
                <p className="mt-1 line-clamp-2 text-xs text-[var(--c-cream)]/60">{e.descripcion}</p>
                {e.latitud && e.longitud && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-[var(--c-sage,#2FC4B2)]">
                    <MapPin size={11} /> {Number(e.latitud).toFixed(4)}, {Number(e.longitud).toFixed(4)}
                  </p>
                )}
                <div className="mt-3 flex justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setModal(e)}
                    className="rounded-lg bg-[var(--c-secondary)]/20 p-2 text-[var(--c-secondary)]"
                  >
                    <Pencil size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(e)}
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
        <ExperienceFormModal
          exp={modal}
          categorias={categorias}
          onSave={onSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
