import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useThemeStore } from './store/useThemeStore'

import LandingPage from './pages/LandingPage'
import ExperiencePage from './pages/ExperiencePage'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  const syncFromServer = useThemeStore((s) => s.syncFromServer)

  useEffect(() => {
    syncFromServer()
  }, [syncFromServer])

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/experiencia" element={<ExperiencePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultados" element={<ResultsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </AnimatePresence>
  )
}
