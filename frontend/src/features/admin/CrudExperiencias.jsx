import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react'
import Swal from 'sweetalert2'
import {
  getExperiencias, createExperiencia, updateExperiencia, deleteExperiencia,
  getCategorias,
} from '../../lib/api'
import Button from '../../components/ui/Button'
import ExperienceFormModal from './ExperienceFormModal'

export default function CrudExperiencias() {
  const qc = useQueryClient()
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
      title: `¿Eliminar "${exp.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B5462F',
    })
    if (r.isConfirmed) mDelete.mutate(exp.id)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-gradient-gold">Experiencias</h2>
        <Button onClick={() => setModal({})}>
          <span className="flex items-center gap-2"><Plus size={18} /> Nueva</span>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experiencias.map((e) => (
          <div key={e.id} className="glass overflow-hidden rounded-3xl">
            <img
              src={e.imagen_url}
              alt={e.nombre}
              onError={(ev) => { ev.currentTarget.src = '/assets/logo.jpeg' }}
              className="h-32 w-full object-cover"
            />
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
                <button onClick={() => setModal(e)} className="rounded-lg bg-[var(--c-secondary)]/20 p-2 text-[var(--c-secondary)]">
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(e)} className="rounded-lg bg-[var(--c-accent)]/20 p-2 text-[var(--c-accent)]">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
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
