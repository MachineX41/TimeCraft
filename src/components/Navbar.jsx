import { useEffect, useRef, useState } from 'react'
import MegaMenuContent from './MegaMenuContent'
import { IconPlus } from './SidebarIcons'
import { handleCtaPointerEnter, handleCtaPointerLeave } from '../utils/ctaButton'

const NAV_LINKS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    active: true,
    description: 'Çalışma alanınıza genel bakış ve canlı metrikler.',
    items: [
      { label: 'Genel bakış', href: '#' },
      { label: 'Metrikler', href: '#' },
      { label: 'Son aktiviteler', href: '#' },
    ],
  },
  {
    id: 'projects',
    label: 'Projeler',
    active: false,
    description: 'Tüm projelerinizi yönetin, düzenleyin ve takip edin.',
    items: [
      { label: 'Tüm projeler', href: '#' },
      { label: 'Yeni proje', href: '#' },
      { label: 'Durum filtreleri', href: '#' },
    ],
  },
  {
    id: 'reports',
    label: 'Raporlar',
    active: false,
    description: 'Zaman ve gelir raporlarınızı dışa aktarın.',
    items: [
      { label: 'Haftalık özet', href: '#' },
      { label: 'Aylık rapor', href: '#' },
      { label: 'Dışa aktar', href: '#' },
    ],
  },
]

export default function Navbar({ onAddProject }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)
  const leaveTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    }
  }, [])

  function clearLeaveTimer() {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
  }

  function handleNavEnter(id) {
    clearLeaveTimer()
    setHoveredId(id)
  }

  function handleMenuLeave() {
    leaveTimerRef.current = window.setTimeout(() => {
      setHoveredId(null)
    }, 180)
  }

  function handleHeaderLeave(e) {
    const next = e.relatedTarget
    if (next instanceof Node && e.currentTarget.contains(next)) return
    handleMenuLeave()
  }

  return (
    <header
      className={`app-navbar${hoveredId ? ' app-navbar--mega-open' : ''}`}
      onMouseLeave={handleHeaderLeave}
    >
      <div className="app-navbar__bar">
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
                  className={`app-navbar__link ${active ? 'app-navbar__link--active' : ''}${hoveredId === id ? ' app-navbar__link--hovered' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  aria-expanded={hoveredId === id}
                  onMouseEnter={() => handleNavEnter(id)}
                  onFocus={() => handleNavEnter(id)}
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
            onPointerEnter={handleCtaPointerEnter}
            onPointerLeave={handleCtaPointerLeave}
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
      </div>

      <div className="app-navbar__mega" aria-hidden={!hoveredId}>
        <div className="app-navbar__mega-panel">
          {hoveredId ? (
            <MegaMenuContent
              key={hoveredId}
              link={NAV_LINKS.find((item) => item.id === hoveredId) ?? NAV_LINKS[0]}
            />
          ) : null}
        </div>
      </div>
    </header>
  )
}
