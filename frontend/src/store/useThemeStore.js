import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { applyTheme } from '../config/theme'
import { setTheme as apiSetTheme, getTheme as apiGetTheme } from '../lib/api'

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'ixa',
      setTheme: async (theme) => {
        const id = applyTheme(theme)
        set({ theme: id })
        try {
          await apiSetTheme(id) // persistencia global en backend
        } catch (e) {
          /* offline: queda persistido localmente */
        }
      },
      syncFromServer: async () => {
        try {
          const { theme } = await apiGetTheme()
          const id = applyTheme(theme)
          set({ theme: id })
        } catch (e) {
          /* usa el valor local */
        }
      },
      init: () => {
        const current = useThemeStore.getState().theme
        applyTheme(current)
      },
    }),
    { name: 'ixa-theme' }
  )
)
