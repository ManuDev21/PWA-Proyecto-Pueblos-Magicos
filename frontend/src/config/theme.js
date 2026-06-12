// Definición de temas globales de ÍXA
export const THEMES = {
  ixa: {
    id: 'ixa',
    name: 'ÍXA · Pueblos Mágicos',
    primary: '#0F3D2E',
    secondary: '#C9A227',
    accent: '#B5462F',
  },
  '4t': {
    id: '4t',
    name: '4T · Gobierno de México',
    primary: '#611232',
    secondary: '#B38E5D',
    accent: '#9F2241',
  },
}

export function applyTheme(themeId) {
  const id = THEMES[themeId] ? themeId : 'ixa'
  document.documentElement.setAttribute('data-theme', id)
  return id
}
