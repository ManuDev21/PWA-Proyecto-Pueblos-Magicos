import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { getVisitantes } from '../../lib/api'
import { useT } from '../../i18n/useT'

export default function CrudVisitantes() {
  const { t, lang } = useT()
  const { data: visitantes = [] } = useQuery({ queryKey: ['visitantes'], queryFn: getVisitantes })
  const locale = lang === 'en' ? 'en-US' : lang === 'fr' ? 'fr-FR' : 'es-MX'

  return (
    <div>
      <h2 className="mb-4 font-display text-2xl text-gradient-gold">{t('admin.visitantes.title')}</h2>
      <div className="overflow-x-auto rounded-3xl glass">
        <table className="w-full text-left text-[var(--c-cream)]">
          <thead className="bg-[var(--c-primary-deep)]/60 text-sm">
            <tr>
              <th className="p-3">{t('admin.visitantes.id')}</th>
              <th className="p-3">{t('admin.visitantes.nombre')}</th>
              <th className="p-3">{t('admin.visitantes.email')}</th>
              <th className="p-3">{t('admin.visitantes.perfil')}</th>
              <th className="p-3">{t('admin.visitantes.fecha')}</th>
            </tr>
          </thead>
          <tbody>
            {visitantes.map((v, i) => (
              <motion.tr
                key={v.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22, delay: i * 0.04 }}
                className="border-t border-white/10 align-top hover:bg-white/5"
              >
                <td className="p-3">
                  <span className="rounded-full bg-[var(--c-accent)]/20 px-2 py-1 text-xs font-semibold text-[var(--c-accent)]">
                    #{v.id}
                  </span>
                </td>
                <td className="p-3 font-medium">{v.nombre}</td>
                <td className="p-3 text-sm text-[var(--c-cream)]/80">{v.correo_electronico}</td>
                <td className="p-3 text-sm">
                  {v.perfil_nombre ? (
                    <span className="rounded-full bg-[var(--c-secondary)]/20 px-2 py-1 text-xs font-semibold text-[var(--c-secondary)]">
                      {v.perfil_nombre}
                    </span>
                  ) : (
                    <span className="text-[var(--c-cream)]/50">—</span>
                  )}
                </td>
                <td className="p-3 text-xs text-[var(--c-cream)]/60">
                  {new Date(v.fecha_registro).toLocaleString(locale)}
                </td>
              </motion.tr>
            ))}
            {!visitantes.length && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-[var(--c-cream)]/60">
                  {t('admin.visitantes.empty')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
