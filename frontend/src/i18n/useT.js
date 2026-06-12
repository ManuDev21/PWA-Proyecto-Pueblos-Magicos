import { useLangStore } from '../store/useLangStore'
import { translations } from './translations'

/**
 * Hook de traducción. Uso: const { t, lang } = useT()
 * t('hero.title') · t('chat.q.edad', { name: 'Ana' })
 */
export function useT() {
  const lang = useLangStore((s) => s.lang)
  const dict = translations[lang] || translations.es

  const t = (key, vars) => {
    let str = dict[key] ?? translations.es[key] ?? key
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v)
      })
    }
    return str
  }

  return { t, lang }
}
