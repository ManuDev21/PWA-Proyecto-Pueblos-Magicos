import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useVisitorStore = create(
  persist(
    (set) => ({
      visitante: { nombre: '', edad: '', correo_electronico: '', telefono: '' },
      pueblo: 'Isla Mujeres',
      result: null,
      setVisitante: (data) =>
        set((s) => ({ visitante: { ...s.visitante, ...data } })),
      setPueblo: (pueblo) => set({ pueblo }),
      setResult: (result) => set({ result }),
      reset: () =>
        set({
          visitante: { nombre: '', edad: '', correo_electronico: '', telefono: '' },
          result: null,
        }),
    }),
    { name: 'ixa-visitor' }
  )
)
