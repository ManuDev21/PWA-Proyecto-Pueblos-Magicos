import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ResultsScreen from '../features/results/ResultsScreen'
import { useVisitorStore } from '../store/useVisitorStore'

export default function ResultsPage() {
  const navigate = useNavigate()
  const result = useVisitorStore((s) => s.result)

  useEffect(() => {
    if (!result) navigate('/')
  }, [result, navigate])

  if (!result) return null
  return <ResultsScreen result={result} />
}
