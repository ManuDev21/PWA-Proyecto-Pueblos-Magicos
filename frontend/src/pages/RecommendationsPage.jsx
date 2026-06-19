import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecommendationsScreen from '../features/results/RecommendationsScreen'
import { useVisitorStore } from '../store/useVisitorStore'

export default function RecommendationsPage() {
  const navigate = useNavigate()
  const result = useVisitorStore((s) => s.result)

  useEffect(() => {
    if (!result) navigate('/')
  }, [result, navigate])

  if (!result) return null
  return <RecommendationsScreen result={result} />
}
