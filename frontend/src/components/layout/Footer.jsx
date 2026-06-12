export default function Footer() {
  return (
    <footer className="bg-mayan border-t border-[var(--c-secondary)]/30 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center">
        <img
          src="/assets/logo.jpeg"
          alt="ÍXA · Experta en Pueblos Mágicos"
          className="mx-auto mb-3 h-16 w-auto rounded-2xl object-contain shadow-sea"
        />
        <p className="text-xs text-[var(--c-cream)]/70">
          Experiencias auténticas y sostenibles · Pueblos Mágicos de Isla Mujeres
        </p>
        <p className="mt-2 text-[11px] text-[var(--c-cream)]/50">
          © {new Date().getFullYear()} ÍXA · Turismo alternativo impulsado por IA
        </p>
      </div>
    </footer>
  )
}
