import { useCallback, useState } from 'react'
import { IconPlus } from './SidebarIcons'

function syncCtaPauseAngle(button) {
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

const NAV_LINKS = [
  { id: 'dashboard', label: 'Dashboard', active: true },
  { id: 'projects', label: 'Projeler', active: false },
  { id: 'reports', label: 'Raporlar', active: false },
]

export default function Navbar({ onAddProject }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleCtaEnter = useCallback((event) => {
    const button = event.currentTarget
    button.classList.add('app-navbar__cta--hover')
    syncCtaPauseAngle(button)
    requestAnimationFrame(() => syncCtaPauseAngle(button))
  }, [])

  const handleCtaLeave = useCallback((event) => {
    const button = event.currentTarget
    button.classList.remove('app-navbar__cta--hover')
    button.style.removeProperty('--cta-pause-angle')
  }, [])

  return (
    <header className="app-navbar">
      <a href="#" className="app-navbar__brand" aria-label="TimeCraft ana sayfa">
        <img
          src="/timecraftlogo.svg"
          alt=""
          className="app-navbar__logo-img"
          width={320}
          height={293}
          decoding="async"
        />
      </a>

      <nav
        id="app-navbar-nav"
        className={`app-navbar__nav ${mobileOpen ? 'app-navbar__nav--open' : ''}`}
        aria-label="Ana menü"
      >
        <ul className="app-navbar__list">
          {NAV_LINKS.map(({ id, label, active }) => (
            <li key={id}>
              <a
                href="#"
                className={`app-navbar__link ${active ? 'app-navbar__link--active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="app-navbar__actions">
        <button
          type="button"
          onClick={onAddProject}
          className="app-navbar__cta"
          aria-label="Yeni proje"
          onPointerEnter={handleCtaEnter}
          onPointerLeave={handleCtaLeave}
        >
          <span className="app-navbar__cta-inner">
            <span className="app-navbar__cta-label">Yeni proje</span>
            <IconPlus className="app-navbar__cta-icon h-4 w-4 md:hidden" />
          </span>
        </button>

        <button
          type="button"
          className="app-navbar__menu-btn"
          aria-expanded={mobileOpen}
          aria-controls="app-navbar-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">Menü</span>
          <span className={`app-navbar__menu-bar ${mobileOpen ? 'is-open' : ''}`} />
        </button>
      </div>
    </header>
  )
}
