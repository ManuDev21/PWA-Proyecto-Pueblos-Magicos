// Helper de síntesis de voz (Web Speech API) para que ÍXA "hable".
let enabled = true
let lastText = null
let lastLang = 'es'
let pendingUtterance = null // texto en espera de voces / gesto del usuario

export function setSpeechEnabled(value) {
  enabled = value
  if (!value) window.speechSynthesis?.cancel()
}

export function isSpeechEnabled() {
  return enabled
}

function pickVoice(lang) {
  const voices = window.speechSynthesis?.getVoices() || []
  const prefix = lang === 'en' ? 'en' : 'es'
  // Preferir voces femeninas en el idioma correcto
  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith(prefix) && /female|mujer|paulina|sabina|google/i.test(v.name)) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith(prefix)) ||
    voices[0]
  )
}

// Hace que 'ÍXA' se lea como nombre ('Isha') y no deletreado.
function toSpoken(text) {
  return text.replace(/\b[íi]xa\b/gi, 'Isha')
}

function doSpeak(text, lang) {
  try {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(toSpoken(text))
    utter.lang = lang === 'en' ? 'en-US' : 'es-MX'
    // El inglés se lee más despacio para que se entienda bien
    utter.rate = lang === 'en' ? 0.82 : 0.96
    utter.pitch = 1.08
    const voice = pickVoice(lang)
    if (voice) utter.voice = voice
    window.speechSynthesis.speak(utter)
  } catch (e) {
    /* no-op */
  }
}

export function speak(text, lang = 'es') {
  if (!enabled || !text || !('speechSynthesis' in window)) return
  lastText = text
  lastLang = lang
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) {
    // Voces aún no cargadas: se hablará cuando estén listas
    pendingUtterance = { text, lang }
    return
  }
  doSpeak(text, lang)
}

// Vuelve a decir el último texto (p. ej. al cambiar el idioma de la voz)
export function respeakLast(lang) {
  if (!enabled || !lastText || !('speechSynthesis' in window)) return
  doSpeak(lastText, lang ?? lastLang)
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel()
  pendingUtterance = null
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  // Algunas plataformas cargan las voces de forma asíncrona
  window.speechSynthesis.onvoiceschanged = () => {
    if (pendingUtterance && enabled) {
      const { text, lang } = pendingUtterance
      pendingUtterance = null
      doSpeak(text, lang)
    }
  }
  // Chrome bloquea speak() sin interacción previa: re-intenta tras el primer gesto
  const unlock = () => {
    if (pendingUtterance && enabled) {
      const { text, lang } = pendingUtterance
      pendingUtterance = null
      doSpeak(text, lang)
    } else if (enabled && lastText && !window.speechSynthesis.speaking) {
      doSpeak(lastText, lastLang)
    }
    window.removeEventListener('pointerdown', unlock)
  }
  window.addEventListener('pointerdown', unlock, { once: true })
}
