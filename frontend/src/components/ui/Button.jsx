import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-[var(--c-secondary)] text-[var(--c-primary-deep)] hover:shadow-glow font-semibold',
  outline:
    'border-2 border-[var(--c-secondary)] text-[var(--c-secondary)] hover:bg-[var(--c-secondary)] hover:text-[var(--c-primary-deep)]',
  ghost: 'text-[var(--c-text)] hover:text-[var(--c-secondary)]',
  danger: 'bg-[var(--c-accent)] text-white hover:opacity-90',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      className={`btn-jelly rounded-2xl px-6 py-3 transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
