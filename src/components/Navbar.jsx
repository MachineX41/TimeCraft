import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MegaMenuContent from './MegaMenuContent'
import { IconPlus } from './SidebarIcons'
import { handleCtaPointerEnter, handleCtaPointerLeave } from '../utils/ctaButton'

const HOME_NAV_LINKS = [
  {
    id: 'home',
    label: 'Ana Sayfa',
    href: '/',
    active: true,
    description: 'TimeCraft ile freelancer çalışma alanınızı keşfedin.',
    items: [
      { label: 'Hero', href: '/' },
      { label: 'Hakkında', href: '/#hakkimizda' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    id: 'about',
    label: 'Hakkında',
    href: '/#hakkimizda',
    active: false,
    description: 'TimeCraft\'ın amacı ve freelancer\'lara sunduğu değer.',
    items: [
      { label: 'Misyon', href: '/#hakkimizda' },
      { label: 'Nasıl çalışır', href: '/#ozellikler' },
      { label: 'Başlayın', href: '/dashboard' },
    ],
  },
  {
    id: 'features',
    label: 'Özellikler',
    href: '/#ozellikler',
    active: false,
    description: 'Proje, mesai ve ücret takibini tek panelde birleştirin.',
    items: [
      { label: 'Proje yönetimi', href: '/#ozellikler' },
      { label: 'Zaman takibi', href: '/#ozellikler' },
      { label: 'Ücret hesaplama', href: '/#ozellikler' },
    ],
  },
  {
    id: 'faq',
    label: 'SSS',
    href: '/#sss',
    active: false,
    description: 'Sık sorulan sorular ve hızlı yanıtlar.',
    items: [
      { label: 'Başlangıç', href: '/#sss' },
      { label: 'Veri saklama', href: '/#sss' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    active: false,
    description: 'Çalışma alanınıza geçin ve projelerinizi yönetin.',
    items: [
      { label: 'Genel bakış', href: '/dashboard' },
      { label: 'Projeler', href: '/dashboard' },
      { label: 'Metrikler', href: '/dashboard' },
    ],
  },
]

const DASHBOARD_NAV_LINKS = [
  {
    id: 'home',
    label: 'Ana Sayfa',
    href: '/',
    active: false,
    description: 'Landing sayfasına dönün ve TimeCraft\'ı keşfedin.',
    items: [
      { label: 'Hero', href: '/' },
      { label: 'Hakkında', href: '/#hakkimizda' },
      { label: 'SSS', href: '/#sss' },
    ],
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    active: true,
    description: 'Çalışma alanınıza genel bakış ve canlı metrikler.',
    items: [
      { label: 'Genel bakış', href: '/dashboard' },
      { label: 'Metrikler', href: '/dashboard' },
      { label: 'Son aktiviteler', href: '/dashboard' },
    ],
  },
  {
    id: 'projects',
    label: 'Projeler',
    href: '/dashboard',
    active: false,
    description: 'Tüm projelerinizi yönetin, düzenleyin ve takip edin.',
    items: [
      { label: 'Tüm projeler', href: '/dashboard' },
      { label: 'Yeni proje', href: '/dashboard' },
      { label: 'Durum filtreleri', href: '/dashboard' },
    ],
  },
  {
    id: 'reports',
    label: 'Raporlar',
    href: '/dashboard',
    active: false,
    description: 'Zaman ve gelir raporlarınızı dışa aktarın.',
    items: [
      { label: 'Haftalık özet', href: '/dashboard' },
      { label: 'Aylık rapor', href: '/dashboard' },
      { label: 'Dışa aktar', href: '/dashboard' },
    ],
  },
]

function NavLinkItem({ link, hoveredId, onNavEnter }) {
  const isHovered = hoveredId === link.id

  if (link.href.startsWith('/#')) {
    return (
      <a
        href={link.href}
        className={`app-navbar__link ${link.active ? 'app-navbar__link--active' : ''}${isHovered ? ' app-navbar__link--hovered' : ''}`}
        aria-current={link.active ? 'page' : undefined}
        aria-expanded={isHovered}
        onMouseEnter={() => onNavEnter(link.id)}
        onFocus={() => onNavEnter(link.id)}
      >
        {link.label}
      </a>
    )
  }

  return (
    <Link
      to={link.href}
      className={`app-navbar__link ${link.active ? 'app-navbar__link--active' : ''}${isHovered ? ' app-navbar__link--hovered' : ''}`}
      aria-current={link.active ? 'page' : undefined}
      aria-expanded={isHovered}
      onMouseEnter={() => onNavEnter(link.id)}
      onFocus={() => onNavEnter(link.id)}
    >
      {link.label}
    </Link>
  )
}

export default function Navbar({ page = 'dashboard', onAddProject }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)
  const leaveTimerRef = useRef(null)

  const baseLinks = page === 'home' ? HOME_NAV_LINKS : DASHBOARD_NAV_LINKS
  const navLinks = baseLinks.map((link) => ({
    ...link,
    active:
      page === 'home'
        ? link.id === 'home' && location.pathname === '/'
        : link.id === 'dashboard' && location.pathname.startsWith('/dashboard'),
  }))

  const ctaLabel = page === 'home' ? 'Başla' : 'Yeni proje'

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
        <Link to="/" className="app-navbar__brand" aria-label="TimeCraft ana sayfa">
          <img
            src="/timecraftlogo.svg"
            alt=""
            className="app-navbar__logo-img"
            width={320}
            height={293}
            decoding="async"
          />
        </Link>

        <nav
          id="app-navbar-nav"
          className={`app-navbar__nav ${mobileOpen ? 'app-navbar__nav--open' : ''}`}
          aria-label="Ana menü"
        >
          <ul className="app-navbar__list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLinkItem
                  link={link}
                  hoveredId={hoveredId}
                  onNavEnter={handleNavEnter}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="app-navbar__actions">
          <button
            type="button"
            onClick={onAddProject}
            className="app-navbar__cta"
            aria-label={ctaLabel}
            onPointerEnter={handleCtaPointerEnter}
            onPointerLeave={handleCtaPointerLeave}
          >
            <span className="app-navbar__cta-inner">
              <span className="app-navbar__cta-label">{ctaLabel}</span>
              {page === 'dashboard' ? (
                <IconPlus className="app-navbar__cta-icon h-4 w-4 md:hidden" />
              ) : null}
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
              link={navLinks.find((item) => item.id === hoveredId) ?? navLinks[0]}
            />
          ) : null}
        </div>
      </div>
    </header>
  )
}
