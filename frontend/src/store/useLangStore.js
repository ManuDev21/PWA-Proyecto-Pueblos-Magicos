import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLangStore = create(
  persist(
    (set) => ({
      lang: 'es',
      setLang: (lang) => set({ lang }),
      toggle: () => set((s) => ({ lang: s.lang === 'es' ? 'en' : 'es' })),
    }),
    { name: 'ixa-lang' }
  )
)
