import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { getPreguntasAdmin, createPregunta, deletePregunta } from '../../lib/api'
import Button from '../../components/ui/Button'

const CATS = ['Cultural', 'Gastronómico', 'Ecológico', 'Comunitario', 'Bienestar']
const INCISOS = ['A', 'B', 'C', 'D', 'E']

const swalForm = async () => {
  const opcionRows = INCISOS.map(
    (inc, i) =>
      `<div style="display:flex;gap:6px;margin:4px 0">
        <span style="width:24px;font-weight:bold">${inc}</span>
        <input id="op-${inc}" class="swal2-input" style="margin:0;flex:1" placeholder="Texto opción ${inc}">
        <select id="cat-${inc}" class="swal2-select" style="margin:0">
          ${CATS.map((c, j) => `<option value="${c}" ${i === j ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>`
  ).join('')

  const { value } = await Swal.fire({
    title: 'Nueva pregunta',
    width: 640,
    html:
      `<input id="q-text" class="swal2-input" placeholder="Texto de la pregunta">` +
      `<input id="q-orden" class="swal2-input" type="number" placeholder="Orden" value="11">` +
      `<div style="text-align:left;margin-top:8px">${opcionRows}</div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonColor: '#C9A227',
    preConfirm: () => ({
      pregunta: document.getElementById('q-text').value,
      orden: Number(document.getElementById('q-orden').value) || 0,
      categoria: 'mixta',
      activa: true,
      opciones: INCISOS.map((inc) => ({
        inciso: inc,
        texto: document.getElementById(`op-${inc}`).value,
        categoria_destino: document.getElementById(`cat-${inc}`).value,
        puntuacion: 1,
      })).filter((o) => o.texto),
    }),
  })
  return value
}

export default function CrudPreguntas() {
  const qc = useQueryClient()
  const { data: preguntas = [] } = useQuery({ queryKey: ['preguntas-admin'], queryFn: getPreguntasAdmin })

  const invalidate = () => qc.invalidateQueries({ queryKey: ['preguntas-admin'] })
  const mCreate = useMutation({ mutationFn: createPregunta, onSuccess: invalidate })
  const mDelete = useMutation({ mutationFn: deletePregunta, onSuccess: invalidate })

  const onAdd = async () => {
    const v = await swalForm()
    if (v?.pregunta) mCreate.mutate(v)
  }
  const onDelete = async (q) => {
    const r = await Swal.fire({
      title: '¿Eliminar pregunta?',
      text: q.pregunta,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B5462F',
    })
    if (r.isConfirmed) mDelete.mutate(q.id)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-gradient-gold">Preguntas del Quiz</h2>
        <Button onClick={onAdd}>
          <span className="flex items-center gap-2"><Plus size={18} /> Nueva</span>
        </Button>
      </div>
      <div className="space-y-3">
        {preguntas.map((q) => (
          <div key={q.id} className="glass rounded-2xl p-4">
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
              <button onClick={() => onDelete(q)} className="rounded-lg bg-[var(--c-accent)]/20 p-2 text-[var(--c-accent)]">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
