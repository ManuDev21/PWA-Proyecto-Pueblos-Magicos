import Swal from 'sweetalert2'

// Lee un color del tema activo (variables CSS) para que los alerts
// se adapten automáticamente al cambiar entre ÍXA y 4T.
function cssVar(name, fallback) {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

function themeBase() {
  return {
    background: cssVar('--c-primary-deep', '#053C4C'),
    color: cssVar('--c-cream', '#FBF4E4'),
  }
}

// Alerta de error que permanece hasta que el usuario pulsa "Cerrar".
export function showError(title, text, closeLabel = 'Cerrar') {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonText: closeLabel,
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonColor: cssVar('--c-accent', '#FF6F61'),
    ...themeBase(),
  })
}

export function showWarning(title, text, closeLabel = 'Cerrar') {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonText: closeLabel,
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonColor: cssVar('--c-secondary', '#F4B740'),
    ...themeBase(),
  })
}

export function showInfo(title, text, closeLabel = 'Cerrar') {
  return Swal.fire({
    icon: 'info',
    title,
    text,
    confirmButtonText: closeLabel,
    confirmButtonColor: cssVar('--c-primary-light', '#14A7C4'),
    ...themeBase(),
  })
}

export function showComingSoon(title, text, closeLabel = 'Cerrar') {
  return Swal.fire({
    icon: 'info',
    title,
    text,
    confirmButtonText: closeLabel,
    confirmButtonColor: cssVar('--c-secondary', '#F4B740'),
    ...themeBase(),
  })
}
