import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Layers, MapPinned, HelpCircle, Brain, Palette, LogOut, Home, Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import StatCards from './StatCards'
import ChartsPanel from './ChartsPanel'
import CrudCategorias from './CrudCategorias'
import CrudExperiencias from './CrudExperiencias'
import CrudPreguntas from './CrudPreguntas'
import AnalisisPanel from './AnalisisPanel'
import CrudVisitantes from './CrudVisitantes'
import { useThemeStore } from '../../store/useThemeStore'
import LanguageToggle from '../../components/ui/LanguageToggle'
import VoiceToggle from '../../components/ui/VoiceToggle'
import { useT } from '../../i18n/useT'

const TABS = [
  { id: 'dashboard', labelKey: 'admin.tab.dashboard', icon: LayoutDashboard },
  { id: 'categorias', labelKey: 'admin.tab.categorias', icon: Layers },
  { id: 'experiencias', labelKey: 'admin.tab.experiencias', icon: MapPinned },
  { id: 'preguntas', labelKey: 'admin.tab.preguntas', icon: HelpCircle },
  { id: 'ia', labelKey: 'admin.tab.ia', icon: Brain },
  { id: 'visitantes', labelKey: 'admin.tab.visitantes', icon: Users },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { t } = useT()
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
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-3 py-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/assets/logo.jpeg" alt="ÍXA" className="h-9 w-auto rounded-xl object-contain shadow-sea sm:h-12" />
            <div>
              <p className="font-display text-base text-gradient-gold sm:text-xl">{t('admin.title')}</p>
              <p className="hidden text-xs text-[var(--c-cream)]/60 sm:block">{t('admin.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <VoiceToggle />
            <LanguageToggle />
            <button
              onClick={toggleTheme}
              className={`btn-jelly flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold sm:px-4 ${
                theme === '4t'
                  ? 'bg-[var(--c-secondary)] text-[var(--c-primary-deep)]'
                  : 'border-2 border-[var(--c-secondary)] text-[var(--c-secondary)]'
              }`}
              title={t('admin.themeTitle')}
            >
              <Palette size={16} /> <span className="hidden sm:inline">{theme === '4t' ? t('admin.theme4t') : t('admin.activate4t')}</span>
            </button>
            <button onClick={() => navigate('/')} className="rounded-2xl p-2 text-[var(--c-cream)] hover:text-[var(--c-secondary)]">
              <Home size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-4 sm:px-4 sm:py-6 md:flex-row md:gap-6">
        {/* Sidebar / nav móvil */}
        <aside className="md:w-56 md:shrink-0">
          <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0">
            {TABS.map((tabItem, i) => {
              const Icon = tabItem.icon
              return (
                <motion.button
                  key={tabItem.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setTab(tabItem.id)}
                  className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all md:gap-3 ${
                    tab === tabItem.id
                      ? 'bg-[var(--c-secondary)] text-[var(--c-primary-deep)] shadow-sea'
                      : 'text-[var(--c-cream)]/80 hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} /> {t(tabItem.labelKey)}
                </motion.button>
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
          {tab === 'visitantes' && <CrudVisitantes />}
        </motion.main>
      </div>
    </div>
  )
}
