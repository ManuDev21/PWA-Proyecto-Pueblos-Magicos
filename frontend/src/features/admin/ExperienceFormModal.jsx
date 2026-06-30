import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, MapPin, Save } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Button from '../../components/ui/Button'
import { useT } from '../../i18n/useT'

// Centro por defecto: Isla Mujeres
const DEFAULT_CENTER = [21.232, -86.731]

const readFileAsDataURL = (file) =>
  new Promise((resolve) => {
    if (!file) return resolve(null)
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })

const markerIcon = L.divIcon({
  className: '',
  html: '<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#FF6F61;border:3px solid #FBF4E4;box-shadow:0 4px 12px rgba(0,0,0,0.5)"></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
})

/**
 * Modal de alta/edición de experiencias para el admin con selector de
 * ubicación: clic en el mapa coloca el pin y llena latitud/longitud, que
 * luego se reflejan en los enlaces de Google Maps de la vista del usuario.
 */
export default function ExperienceFormModal({ exp = {}, categorias = [], onSave, onClose }) {
  const { t } = useT()
  const [form, setForm] = useState({
    nombre: exp.nombre || '',
    descripcion: exp.descripcion || '',
    categoria_id: exp.categoria_id || categorias[0]?.id || '',
    latitud: exp.latitud ?? '',
    longitud: exp.longitud ?? '',
    duracion_horas: exp.duracion_horas ?? 2,
    precio_aprox: exp.precio_aprox ?? 0,
    imagen_url: exp.imagen_url || '',
    historia: exp.historia || '',
  })
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markerRef = useRef(null)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  // Inicializa el mapa Leaflet (OpenStreetMap, sin API key)
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return
    const start =
      form.latitud && form.longitud
        ? [Number(form.latitud), Number(form.longitud)]
        : DEFAULT_CENTER
    const map = L.map(mapRef.current).setView(start, 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)

    if (form.latitud && form.longitud) {
      markerRef.current = L.marker(start, { icon: markerIcon }).addTo(map)
    }

    map.on('click', (e) => {
      const { lat, lng } = e.latlng
      setForm((f) => ({ ...f, latitud: lat.toFixed(6), longitud: lng.toFixed(6) }))
      if (markerRef.current) {
        markerRef.current.setLatLng(e.latlng)
      } else {
        markerRef.current = L.marker(e.latlng, { icon: markerIcon }).addTo(map)
      }
    })

    mapInstance.current = map
    // El modal anima su entrada: recalcular tamaño del mapa
    setTimeout(() => map.invalidateSize(), 350)
    return () => {
      map.remove()
      mapInstance.current = null
      markerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleImageFile = async (e) => {
    const dataUrl = await readFileAsDataURL(e.target.files[0])
    if (dataUrl) set('imagen_url', dataUrl)
  }

  const handleSave = () => {
    if (!form.nombre.trim()) return
    onSave({
      ...form,
      categoria_id: Number(form.categoria_id),
      historia: form.historia || null,
      latitud: form.latitud === '' ? null : String(form.latitud),
      longitud: form.longitud === '' ? null : String(form.longitud),
      duracion_horas: Number(form.duracion_horas) || 2,
      precio_aprox: Number(form.precio_aprox) || 0,
      imagen_url: form.imagen_url || null,
    })
  }

  const inputCls =
    'w-full rounded-xl border border-[rgba(47,196,178,0.4)] bg-[var(--c-primary-deep)] px-3 py-2 text-sm text-[var(--c-cream)] outline-none focus:border-[var(--c-secondary)]'

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl text-gradient-gold">
            {exp.id ? t('admin.exp.editTitle') : t('admin.exp.newTitle')}
          </h3>
          <button onClick={onClose} className="rounded-full p-2 text-[var(--c-cream)]/70 hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <input className={inputCls} placeholder={t('admin.exp.nombre')} value={form.nombre} onChange={(e) => set('nombre', e.target.value)} />
            <textarea className={`${inputCls} min-h-[90px]`} placeholder={t('admin.exp.descripcion')} value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)} />
            <textarea className={`${inputCls} min-h-[110px]`} placeholder={t('admin.exp.historia')} value={form.historia} onChange={(e) => set('historia', e.target.value)} />
            <select className={inputCls} value={form.categoria_id} onChange={(e) => set('categoria_id', e.target.value)}>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input className={inputCls} placeholder={t('admin.exp.duracion')} value={form.duracion_horas} onChange={(e) => set('duracion_horas', e.target.value)} />
              <input className={inputCls} placeholder={t('admin.exp.precio')} value={form.precio_aprox} onChange={(e) => set('precio_aprox', e.target.value)} />
            </div>
            <input
              className={inputCls}
              placeholder={t('admin.exp.imagenUrl')}
              value={String(form.imagen_url).startsWith('data:') ? '' : form.imagen_url}
              onChange={(e) => set('imagen_url', e.target.value)}
            />
            <label className="text-xs text-[var(--c-cream)]/70">
              {t('admin.exp.subirImagen')}
              <input type="file" accept="image/*" onChange={handleImageFile} className="mt-1 block w-full text-xs" />
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm text-[var(--c-cream)]/80">
              <MapPin size={15} className="text-[var(--c-accent)]" />
              {t('admin.exp.clickMapa')}
            </p>
            <div ref={mapRef} className="h-64 w-full overflow-hidden rounded-2xl border border-[rgba(47,196,178,0.4)]" />
            <div className="grid grid-cols-2 gap-3">
              <input className={inputCls} placeholder={t('admin.exp.latitud')} value={form.latitud} onChange={(e) => set('latitud', e.target.value)} />
              <input className={inputCls} placeholder={t('admin.exp.longitud')} value={form.longitud} onChange={(e) => set('longitud', e.target.value)} />
            </div>
            <p className="text-[11px] text-[var(--c-cream)]/50">
              {t('admin.exp.mapHint')}
            </p>
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
