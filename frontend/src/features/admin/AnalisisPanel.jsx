import { useQuery } from '@tanstack/react-query'
import { getAnalisis } from '../../lib/api'

export default function AnalisisPanel() {
  const { data: analisis = [] } = useQuery({ queryKey: ['analisis'], queryFn: getAnalisis })

  return (
    <div>
      <h2 className="mb-4 font-display text-2xl text-gradient-gold">Estadísticas IA</h2>
      <div className="overflow-x-auto rounded-3xl glass">
        <table className="w-full text-left text-[var(--c-cream)]">
          <thead className="bg-[var(--c-primary-deep)]/60 text-sm">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Perfil detectado</th>
              <th className="p-3">Confianza</th>
              <th className="p-3">Modelo</th>
              <th className="p-3">Explicación</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {analisis.map((a) => (
              <tr key={a.id} className="border-t border-white/10 align-top">
                <td className="p-3">{a.id}</td>
                <td className="p-3 font-medium">{a.perfil_detectado}</td>
                <td className="p-3">
                  <span className="rounded-full bg-[var(--c-secondary)] px-2 py-1 text-xs font-semibold text-[var(--c-primary-deep)]">
                    {Math.round(a.confianza)}%
                  </span>
                </td>
                <td className="p-3 text-sm">{a.modelo_usado}</td>
                <td className="p-3 max-w-md text-xs text-[var(--c-cream)]/70">{a.explicacion}</td>
                <td className="p-3 text-xs text-[var(--c-cream)]/60">
                  {new Date(a.fecha_analisis).toLocaleString('es-MX')}
                </td>
              </tr>
            ))}
            {!analisis.length && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-[var(--c-cream)]/60">
                  Aún no hay análisis registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
