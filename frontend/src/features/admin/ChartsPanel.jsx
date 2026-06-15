import { useQuery } from '@tanstack/react-query'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { getCharts } from '../../lib/api'
import { useT } from '../../i18n/useT'

import { motion } from 'framer-motion'

// Paleta playa: turquesa, coral, sol, mar profundo, arena, orquídea
const COLORS = ['#2FC4B2', '#FF6F61', '#F4B740', '#0A7C95', '#F6D6A8', '#9B59B6']

const tooltipStyle = {
  background: 'rgba(5,40,50,0.95)',
  border: '1px solid rgba(47,196,178,0.5)',
  borderRadius: 14,
  color: '#F5F0E1',
}

function Panel({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="glass rounded-3xl p-5 shadow-sea transition-shadow hover:shadow-sea-lg"
    >
      <h3 className="mb-4 font-display text-lg text-[var(--c-secondary)]">{title}</h3>
      <div className="h-64">{children}</div>
    </motion.div>
  )
}

export default function ChartsPanel() {
  const { t } = useT()
  const { data } = useQuery({ queryKey: ['charts'], queryFn: getCharts })
  const perfiles = data?.perfiles_detectados || []
  const categorias = data?.categorias_elegidas || []
  const distribucion = data?.distribucion_visitantes || []
  const afinidad = data?.afinidad_turistica || []

  return (
    <div className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2">
      <Panel title={t('admin.chart.perfiles')} delay={0}>
        <ResponsiveContainer>
          <BarChart data={perfiles}>
            <XAxis dataKey="label" tick={{ fill: '#F5F0E1', fontSize: 10 }} />
            <YAxis tick={{ fill: '#F5F0E1' }} allowDecimals={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(47,196,178,0.1)' }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={900}>
              {perfiles.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title={t('admin.chart.distribucion')} delay={0.1}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={distribucion}
              dataKey="value"
              nameKey="label"
              outerRadius={90}
              label
            >
              {distribucion.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Legend wrapperStyle={{ color: '#F5F0E1', fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title={t('admin.chart.categorias')} delay={0.2}>
        <ResponsiveContainer>
          <BarChart data={categorias} layout="vertical">
            <XAxis type="number" tick={{ fill: '#F5F0E1' }} allowDecimals={false} />
            <YAxis dataKey="label" type="category" tick={{ fill: '#F5F0E1', fontSize: 10 }} width={90} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(47,196,178,0.1)' }} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} animationDuration={900}>
              {categorias.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title={t('admin.chart.afinidad')} delay={0.3}>
        <ResponsiveContainer>
          <BarChart data={afinidad}>
            <XAxis dataKey="label" tick={{ fill: '#F5F0E1', fontSize: 9 }} />
            <YAxis tick={{ fill: '#F5F0E1' }} allowDecimals={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(47,196,178,0.1)' }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={900}>
              {afinidad.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  )
}
