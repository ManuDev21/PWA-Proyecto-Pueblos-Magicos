import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// ---------- Visitante / Quiz ----------
export const checkAdmin = (nombre) =>
  api.post('/check-admin', { nombre }).then((r) => r.data)

export const getPreguntas = () => api.get('/preguntas').then((r) => r.data)

export const submitQuiz = (payload) =>
  api.post('/quiz/submit', payload).then((r) => r.data)

export const getRecomendaciones = (visitanteId) =>
  api.get(`/recomendaciones/${visitanteId}`).then((r) => r.data)

export const getItinerario = (visitanteId, tipo) =>
  api.get(`/itinerario/${visitanteId}`, { params: { tipo } }).then((r) => r.data)

// ---------- Catálogo (admin) ----------
export const getCategorias = () => api.get('/categorias').then((r) => r.data)
export const createCategoria = (data) => api.post('/categorias', data).then((r) => r.data)
export const updateCategoria = (id, data) => api.put(`/categorias/${id}`, data).then((r) => r.data)
export const deleteCategoria = (id) => api.delete(`/categorias/${id}`)

export const getExperiencias = () => api.get('/experiencias').then((r) => r.data)
export const createExperiencia = (data) => api.post('/experiencias', data).then((r) => r.data)
export const updateExperiencia = (id, data) => api.put(`/experiencias/${id}`, data).then((r) => r.data)
export const deleteExperiencia = (id) => api.delete(`/experiencias/${id}`)

export const getPreguntasAdmin = () => api.get('/preguntas-admin').then((r) => r.data)
export const createPregunta = (data) => api.post('/preguntas', data).then((r) => r.data)
export const updatePregunta = (id, data) => api.put(`/preguntas/${id}`, data).then((r) => r.data)
export const deletePregunta = (id) => api.delete(`/preguntas/${id}`)

// ---------- Admin / Stats ----------
export const getStats = () => api.get('/admin/stats').then((r) => r.data)
export const getCharts = () => api.get('/admin/charts').then((r) => r.data)
export const getAnalisis = () => api.get('/admin/analisis').then((r) => r.data)
export const getVisitantes = () => api.get('/admin/visitantes').then((r) => r.data)
export const getTheme = () => api.get('/admin/theme').then((r) => r.data)
export const setTheme = (theme) => api.put('/admin/theme', { theme }).then((r) => r.data)

export default api
