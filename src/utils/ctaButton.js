export function syncCtaPauseAngle(button) {
  const transform = getComputedStyle(button, '::before').transform
  if (!transform || transform === 'none') {
    button.style.setProperty('--cta-pause-angle', '0deg')
    return
  }
  const matrix = new DOMMatrix(transform)
  let angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI)
  if (angle < 0) angle += 360
  button.style.setProperty('--cta-pause-angle', `${angle}deg`)
}

export function handleCtaPointerEnter(event) {
  const button = event.currentTarget
  button.classList.add('app-navbar__cta--hover')
  syncCtaPauseAngle(button)
  requestAnimationFrame(() => syncCtaPauseAngle(button))
}

export function handleCtaPointerLeave(event) {
  const button = event.currentTarget
  button.classList.remove('app-navbar__cta--hover')
  button.style.removeProperty('--cta-pause-angle')
}
