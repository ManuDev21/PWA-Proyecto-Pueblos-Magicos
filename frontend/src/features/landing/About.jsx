import { motion } from 'framer-motion'
import { Landmark, Leaf, Utensils } from 'lucide-react'
import { useT } from '../../i18n/useT'

export default function About() {
  const { t } = useT()

  const cards = [
    { icon: Landmark, title: t('about.card1.title'), text: t('about.card1.text'), color: '#FF6F61' },
    { icon: Leaf, title: t('about.card2.title'), text: t('about.card2.text'), color: '#2FC4B2' },
    { icon: Utensils, title: t('about.card3.title'), text: t('about.card3.text'), color: '#F4B740' },
  ]

  const stats = [
    { value: '7', label: t('about.stat1') },
    { value: '2024', label: t('about.stat2') },
    { value: '17+', label: t('about.stat3') },
    { value: '5', label: t('about.stat4') },
  ]

  return (
    <section id="sobre-nosotros" className="bg-mayan relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-4xl text-gradient-gold md:text-5xl">{t('about.title')}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-[var(--c-cream)]/85">{t('about.intro')}</p>
        </motion.div>

        {/* Tarjetas con hover 3D */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -10, rotateX: 6, rotateY: -6 }}
                style={{ transformStyle: 'preserve-3d', perspective: 800 }}
                className="glass rounded-3xl p-7 shadow-sea"
              >
                <div
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: `${c.color}22`, color: c.color }}
                >
                  <Icon size={30} />
                </div>
                <h3 className="font-display text-2xl text-[var(--c-cream)]">{c.title}</h3>
                <p className="mt-3 text-[var(--c-cream)]/75">{c.text}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Estadísticas */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              className="text-center"
            >
              <p className="font-display text-5xl font-black text-[var(--c-secondary)]">{s.value}</p>
              <p className="mt-2 text-sm text-[var(--c-cream)]/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
