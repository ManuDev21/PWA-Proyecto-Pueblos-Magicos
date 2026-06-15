import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import {
  getCategorias, createCategoria, updateCategoria, deleteCategoria,
} from '../../lib/api'
import Button from '../../components/ui/Button'
import { useT } from '../../i18n/useT'

const swalForm = async (cat, t) => {
  const { value } = await Swal.fire({
    title: cat.id ? t('admin.cat.editTitle') : t('admin.cat.newTitle'),
    html:
      `<input id="s-nombre" class="swal2-input" placeholder="${t('admin.cat.nombre')}" value="${cat.nombre || ''}">` +
      `<textarea id="s-desc" class="swal2-textarea" placeholder="${t('admin.cat.descripcion')}">${cat.descripcion || ''}</textarea>` +
      `<input id="s-color" type="color" class="swal2-input" value="${cat.color_hex || '#C9A227'}">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: t('admin.save'),
    cancelButtonText: t('admin.cancel'),
    confirmButtonColor: '#C9A227',
    preConfirm: () => ({
      nombre: document.getElementById('s-nombre').value,
      descripcion: document.getElementById('s-desc').value,
      color_hex: document.getElementById('s-color').value,
    }),
  })
  return value
}

export default function CrudCategorias() {
  const qc = useQueryClient()
  const { t } = useT()
  const { data: categorias = [] } = useQuery({ queryKey: ['categorias'], queryFn: getCategorias })

  const invalidate = () => qc.invalidateQueries({ queryKey: ['categorias'] })
  const mCreate = useMutation({ mutationFn: createCategoria, onSuccess: invalidate })
  const mUpdate = useMutation({ mutationFn: ({ id, data }) => updateCategoria(id, data), onSuccess: invalidate })
  const mDelete = useMutation({ mutationFn: deleteCategoria, onSuccess: invalidate })

  const onAdd = async () => {
    const v = await swalForm({}, t)
    if (v?.nombre) mCreate.mutate(v)
  }
  const onEdit = async (cat) => {
    const v = await swalForm(cat, t)
    if (v?.nombre) mUpdate.mutate({ id: cat.id, data: v })
  }
  const onDelete = async (cat) => {
    const r = await Swal.fire({
      title: t('admin.confirmDelete', { name: cat.nombre }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('admin.delete'),
      cancelButtonText: t('admin.cancel'),
      confirmButtonColor: '#B5462F',
    })
    if (r.isConfirmed) mDelete.mutate(cat.id)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-gradient-gold">{t('admin.cat.title')}</h2>
        <Button onClick={onAdd}>
          <span className="flex items-center gap-2"><Plus size={18} /> {t('admin.new')}</span>
        </Button>
      </div>
      <div className="overflow-hidden rounded-3xl glass">
        <table className="w-full text-left text-[var(--c-cream)]">
          <thead className="bg-[var(--c-primary-deep)]/60 text-sm">
            <tr>
              <th className="p-3">{t('admin.cat.nombre')}</th>
              <th className="p-3">{t('admin.cat.descripcion')}</th>
              <th className="p-3">{t('admin.cat.color')}</th>
              <th className="p-3 text-right">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id} className="border-t border-white/10">
                <td className="p-3 font-medium">{c.nombre}</td>
                <td className="p-3 text-sm text-[var(--c-cream)]/70">{c.descripcion}</td>
                <td className="p-3">
                  <span className="inline-block h-5 w-5 rounded-full" style={{ background: c.color_hex }} />
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(c)} className="rounded-lg bg-[var(--c-secondary)]/20 p-2 text-[var(--c-secondary)]">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(c)} className="rounded-lg bg-[var(--c-accent)]/20 p-2 text-[var(--c-accent)]">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
