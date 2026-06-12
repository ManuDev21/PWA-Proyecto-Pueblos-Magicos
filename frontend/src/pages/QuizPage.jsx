import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuizScreen from '../features/quiz/QuizScreen'
import { useVisitorStore } from '../store/useVisitorStore'

export default function QuizPage() {
  const navigate = useNavigate()
  const nombre = useVisitorStore((s) => s.visitante.nombre)

  useEffect(() => {
    if (!nombre) navigate('/')
  }, [nombre, navigate])

  return <QuizScreen />
}
