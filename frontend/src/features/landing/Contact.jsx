import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone } from 'lucide-react'
import { useT } from '../../i18n/useT'
import { showWarning, showInfo } from '../../lib/alerts'

const NAME_RE = /^[A-Za-zÀ-ÿñÑ\s'.-]{2,}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t } = useT()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const submit = (e) => {
    e.preventDefault()
    if (!NAME_RE.test(form.name.trim())) {
      showWarning(t('contact.name'), t('chat.err.nombre'), t('common.close'))
      return
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      showWarning(t('contact.email'), t('chat.err.correo'), t('common.close'))
      return
    }
    showInfo('ÍXA', t('contact.sent'), t('common.close'))
    setForm({ name: '', email: '', message: '' })
  }

  const field =
    'w-full rounded-2xl border border-[rgba(47,196,178,0.4)] bg-[var(--c-primary-deep)]/60 px-4 py-3 text-[var(--c-cream)] outline-none focus:border-[var(--c-secondary)]'

  return (
    <section id="contacto" className="bg-mayan px-4 py-24">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl text-gradient-gold">{t('contact.title')}</h2>
          <p className="mt-4 text-[var(--c-cream)]/80">{t('contact.subtitle')}</p>

          <ul className="mt-8 space-y-4 text-[var(--c-cream)]/90">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--c-secondary)]/20 text-[var(--c-secondary)]">
                <Mail size={18} />
              </span>
              hola@ixa-islamujeres.mx
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--c-secondary)]/20 text-[var(--c-secondary)]">
                <Phone size={18} />
              </span>
              +52 998 000 0000
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--c-secondary)]/20 text-[var(--c-secondary)]">
                <MapPin size={18} />
              </span>
              Isla Mujeres, Quintana Roo, México
            </li>
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={submit}
          className="glass space-y-4 rounded-3xl p-6 shadow-sea"
        >
          <input
            className={field}
            placeholder={t('contact.name')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            className={field}
            placeholder={t('contact.email')}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            rows={4}
            className={field}
            placeholder={t('contact.message')}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="btn-jelly flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--c-secondary)] py-3 font-bold text-[var(--c-primary-deep)]"
          >
            <Send size={18} /> {t('contact.send')}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
