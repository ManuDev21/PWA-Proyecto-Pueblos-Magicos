import { useQuery } from '@tanstack/react-query'
import { getAnalisis } from '../../lib/api'
import { useT } from '../../i18n/useT'

export default function AnalisisPanel() {
  const { t, lang } = useT()
  const { data: analisis = [] } = useQuery({ queryKey: ['analisis'], queryFn: getAnalisis })
  const locale = lang === 'en' ? 'en-US' : lang === 'fr' ? 'fr-FR' : 'es-MX'

  return (
    <div>
      <h2 className="mb-4 font-display text-2xl text-gradient-gold">{t('admin.ia.title')}</h2>
      <div className="overflow-x-auto rounded-3xl glass">
        <table className="w-full text-left text-[var(--c-cream)]">
          <thead className="bg-[var(--c-primary-deep)]/60 text-sm">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">{t('admin.ia.perfil')}</th>
              <th className="p-3">{t('admin.ia.confianza')}</th>
              <th className="p-3">{t('admin.ia.modelo')}</th>
              <th className="p-3">{t('admin.ia.explicacion')}</th>
              <th className="p-3">{t('admin.ia.fecha')}</th>
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
                  {new Date(a.fecha_analisis).toLocaleString(locale)}
                </td>
              </tr>
            ))}
            {!analisis.length && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-[var(--c-cream)]/60">
                  {t('admin.ia.empty')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
