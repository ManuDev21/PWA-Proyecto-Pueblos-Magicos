import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Header({ compact = false }) {
  return (
    <header className="bg-mayan border-b border-[rgba(47,196,178,0.3)] shadow-sea">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4">
        <Link to="/" className="flex items-center gap-4">
          <motion.img
            src="/assets/logo.jpeg"
            alt="ÍXA · Experta en Pueblos Mágicos"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`w-auto rounded-2xl object-contain shadow-sea ${compact ? 'h-16' : 'h-24 md:h-28'}`}
          />
        </Link>
      </div>
    </header>
  )
}
