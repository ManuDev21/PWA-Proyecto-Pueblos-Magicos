import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Layers, MapPinned, HelpCircle, Brain, Palette, LogOut, Home,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import StatCards from './StatCards'
import ChartsPanel from './ChartsPanel'
import CrudCategorias from './CrudCategorias'
import CrudExperiencias from './CrudExperiencias'
import CrudPreguntas from './CrudPreguntas'
import AnalisisPanel from './AnalisisPanel'
import { useThemeStore } from '../../store/useThemeStore'
import LanguageToggle from '../../components/ui/LanguageToggle'
import VoiceToggle from '../../components/ui/VoiceToggle'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'categorias', label: 'Categorías', icon: Layers },
  { id: 'experiencias', label: 'Experiencias', icon: MapPinned },
  { id: 'preguntas', label: 'Preguntas', icon: HelpCircle },
  { id: 'ia', label: 'Estadísticas IA', icon: Brain },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('dashboard')
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)

  const toggleTheme = async () => {
    const next = theme === '4t' ? 'ixa' : '4t'
    await setTheme(next)
    Swal.fire({
      icon: 'success',
      title: next === '4t' ? 'Tema 4T activado' : 'Tema ÍXA restaurado',
      text:
        next === '4t'
          ? 'La plataforma ahora usa los colores gubernamentales de la 4T de forma global y permanente.'
          : 'Se restauraron los colores predeterminados de ÍXA.',
      confirmButtonColor: 'var(--c-secondary)',
      timer: 2200,
    })
  }

  return (
    <div className="bg-mayan min-h-screen">
      {/* Topbar */}
      <header className="bg-mayan sticky top-0 z-20 border-b border-[var(--c-secondary)]/30 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.jpeg" alt="ÍXA" className="h-12 w-auto rounded-xl object-contain shadow-sea" />
            <div>
              <p className="font-display text-xl text-gradient-gold">ÍXA · Panel Admin</p>
              <p className="text-xs text-[var(--c-cream)]/60">Gestión de la plataforma</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <VoiceToggle />
            <LanguageToggle />
            <button
              onClick={toggleTheme}
              className={`btn-jelly flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ${
                theme === '4t'
                  ? 'bg-[var(--c-secondary)] text-[var(--c-primary-deep)]'
                  : 'border-2 border-[var(--c-secondary)] text-[var(--c-secondary)]'
              }`}
              title="Cambiar entre tema ÍXA y 4T (global y permanente)"
            >
              <Palette size={16} /> {theme === '4t' ? 'Tema: 4T' : 'Activar 4T'}
            </button>
            <button onClick={() => navigate('/')} className="rounded-2xl p-2 text-[var(--c-cream)] hover:text-[var(--c-secondary)]">
              <Home size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-56 md:shrink-0">
          <nav className="flex gap-2 overflow-x-auto md:flex-col">
            {TABS.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all ${
                    tab === t.id
                      ? 'bg-[var(--c-secondary)] text-[var(--c-primary-deep)]'
                      : 'text-[var(--c-cream)]/80 hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} /> {t.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Content */}
        <motion.main
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          {tab === 'dashboard' && (
            <>
              <StatCards />
              <ChartsPanel />
            </>
          )}
          {tab === 'categorias' && <CrudCategorias />}
          {tab === 'experiencias' && <CrudExperiencias />}
          {tab === 'preguntas' && <CrudPreguntas />}
          {tab === 'ia' && <AnalisisPanel />}
        </motion.main>
      </div>
    </div>
  )
}
