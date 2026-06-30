import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Landmark, Leaf, Utensils, ChevronDown } from 'lucide-react'
import { useT } from '../../i18n/useT'

/** Tarjeta con inclinación 3D según el cursor + opción de desplegar más texto. */
function AboutCard({ icon: Icon, title, text, more, color, index, t }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [open, setOpen] = useState(false)

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: -py * 12, ry: px * 12 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      className="glass flex h-full flex-col rounded-3xl p-7 shadow-sea transition-transform duration-200"
    >
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{ background: `${color}22`, color, transform: 'translateZ(40px)' }}
      >
        <Icon size={30} />
      </div>
      <h3 className="font-display text-2xl text-[var(--c-cream)]" style={{ transform: 'translateZ(28px)' }}>
        {title}
      </h3>
      <p className="mt-3 text-[var(--c-cream)]/75" style={{ transform: 'translateZ(18px)' }}>
        {text}
      </p>

      {more && (
        <>
          <AnimatePresence initial={false}>
            {open && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="mt-3 overflow-hidden whitespace-pre-line text-sm leading-relaxed text-[var(--c-cream)]/70"
              >
                {more}
              </motion.p>
            )}
          </AnimatePresence>
          <button
            onClick={() => setOpen((v) => !v)}
            className="btn-jelly mt-5 inline-flex w-max items-center gap-2 self-start rounded-2xl bg-[var(--c-secondary)] px-4 py-2 text-sm font-semibold text-[var(--c-primary-deep)]"
          >
            {open ? t('about.readLess') : t('about.readMore')}
            <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </>
      )}
    </motion.div>
  )
}

export default function About() {
  const { t } = useT()

  const cards = [
    { icon: Landmark, title: t('about.card1.title'), text: t('about.card1.text'), more: t('about.card1.more'), color: '#FF6F61' },
    { icon: Leaf, title: t('about.card2.title'), text: t('about.card2.text'), color: '#2FC4B2' },
    { icon: Utensils, title: t('about.card3.title'), text: t('about.card3.text'), color: '#F4B740' },
  ]

  const stats = [
    { value: '7', label: t('about.stat1') },
    { value: '2015', label: t('about.stat2') },
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
          <p className="mt-3 font-display text-xl text-[var(--c-secondary)] md:text-2xl">{t('about.subtitle')}</p>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-[var(--c-cream)]/85">{t('about.intro')}</p>
        </motion.div>

        {/* Tarjetas con inclinación 3D */}
        <div className="mt-14 grid items-start gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <AboutCard key={i} {...c} index={i} t={t} />
          ))}
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
