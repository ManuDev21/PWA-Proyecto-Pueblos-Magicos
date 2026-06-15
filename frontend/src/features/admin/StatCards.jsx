import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Users, Brain, Star, MapPinned, Layers } from 'lucide-react'
import { getStats } from '../../lib/api'
import { useT } from '../../i18n/useT'

const ITEMS = [
  { key: 'total_visitantes', icon: Users },
  { key: 'total_analisis', icon: Brain },
  { key: 'total_recomendaciones', icon: Star },
  { key: 'total_experiencias', icon: MapPinned },
  { key: 'total_categorias', icon: Layers },
]

export default function StatCards() {
  const { t } = useT()
  const { data } = useQuery({ queryKey: ['stats'], queryFn: getStats })
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {ITEMS.map((it, i) => {
        const Icon = it.icon
        return (
          <motion.div
            key={it.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-3xl p-5"
          >
            <Icon className="text-[var(--c-secondary)]" />
            <p className="mt-3 font-display text-3xl text-[var(--c-cream)]">
              {data?.[it.key] ?? 0}
            </p>
            <p className="text-sm text-[var(--c-cream)]/70">{t(`admin.stat.${it.key}`)}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
