import { useQuery } from '@tanstack/react-query'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { getCharts } from '../../lib/api'

const COLORS = ['#C9A227', '#B5462F', '#7FA88B', '#1B4332', '#8B5A2B', '#D4AF37']

function Panel({ title, children }) {
  return (
    <div className="glass rounded-3xl p-5">
      <h3 className="mb-4 font-display text-lg text-[var(--c-secondary)]">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  )
}

export default function ChartsPanel() {
  const { data } = useQuery({ queryKey: ['charts'], queryFn: getCharts })
  const perfiles = data?.perfiles_detectados || []
  const categorias = data?.categorias_elegidas || []
  const distribucion = data?.distribucion_visitantes || []
  const afinidad = data?.afinidad_turistica || []

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-2">
      <Panel title="Perfiles más detectados">
        <ResponsiveContainer>
          <BarChart data={perfiles}>
            <XAxis dataKey="label" tick={{ fill: '#F5F0E1', fontSize: 10 }} />
            <YAxis tick={{ fill: '#F5F0E1' }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {perfiles.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Distribución de visitantes">
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
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Categorías con más experiencias">
        <ResponsiveContainer>
          <BarChart data={categorias} layout="vertical">
            <XAxis type="number" tick={{ fill: '#F5F0E1' }} allowDecimals={false} />
            <YAxis dataKey="label" type="category" tick={{ fill: '#F5F0E1', fontSize: 10 }} width={90} />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {categorias.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Afinidad turística (respuestas top)">
        <ResponsiveContainer>
          <BarChart data={afinidad}>
            <XAxis dataKey="label" tick={{ fill: '#F5F0E1', fontSize: 9 }} />
            <YAxis tick={{ fill: '#F5F0E1' }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
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
