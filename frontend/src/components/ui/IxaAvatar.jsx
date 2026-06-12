import { motion } from 'framer-motion'

/**
 * Avatar de ÍXA: video del personaje en círculo, sin controles ni
 * interacción del usuario (no se puede mover/pausar). Recortado para
 * mostrar solo al personaje con borde turquesa.
 */
export default function IxaAvatar({ size = 96, speaking = false, className = '' }) {
  return (
    <motion.div
      animate={
        speaking
          ? { scale: [1, 1.05, 1], boxShadow: ['0 0 0 rgba(47,196,178,0.4)', '0 0 30px rgba(47,196,178,0.8)', '0 0 0 rgba(47,196,178,0.4)'] }
          : {}
      }
      transition={{ duration: 1.1, repeat: speaking ? Infinity : 0 }}
      className={`relative shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size, border: '2px solid rgba(47,196,178,0.85)' }}
    >
      <video
        src="/assets/chatbot.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        onContextMenu={(e) => e.preventDefault()}
        className="pointer-events-none h-full w-full select-none object-cover"
        style={{ transform: 'scale(1.18)' }}
      />
    </motion.div>
  )
}
