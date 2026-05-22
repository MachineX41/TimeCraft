import { useEffect } from 'react'
import {
  IconChevronLeft,
  IconChevronRight,
  IconDashboard,
  IconLogo,
  IconPlus,
  IconProjects,
  IconReports,
} from './SidebarIcons'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', Icon: IconDashboard, active: true },
  { id: 'projects', label: 'Projeler', Icon: IconProjects, active: false },
  { id: 'reports', label: 'Raporlar', Icon: IconReports, active: false },
]

export default function Sidebar({ collapsed, onToggle, onAddProject, mobileOpen, onMobileClose }) {
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <button
        type="button"
        aria-label="Menüyü kapat"
        onClick={onMobileClose}
        className={`fixed inset-0 z-40 bg-[#0A0A0A]/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`sidebar-rim sidebar-glass fixed inset-y-0 left-0 z-50 flex flex-col transition-[width,transform] duration-300 ease-out lg:translate-x-0 ${
          collapsed ? 'sidebar-glass--collapsed w-[72px]' : 'w-60'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* logo */}
        <div
          className={`flex h-[60px] shrink-0 items-center border-b border-white/[0.06] ${
            collapsed ? 'justify-center px-0' : 'gap-3 px-4'
          }`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[var(--color-rim-1)]">
            <IconLogo />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium tracking-tight text-white">TimeCraft</p>
              <p className="text-[11px] text-[var(--color-x-muted)]">Workspace</p>
            </div>
          )}
        </div>

        {/* nav */}
        <nav className={`flex-1 overflow-y-auto py-4 ${collapsed ? 'px-2.5' : 'px-3'}`}>
          {!collapsed && (
            <p className="sidebar-section-label mb-2 px-3">Menü</p>
          )}
          <ul className={`space-y-1 ${collapsed ? 'flex flex-col items-center' : ''}`}>
            {NAV_ITEMS.map(({ id, label, Icon, active }) => (
              <li key={id} className={collapsed ? 'w-full' : ''}>
                <button
                  type="button"
                  title={collapsed ? label : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={`sidebar-nav-item group ${collapsed ? 'sidebar-nav-item--collapsed' : ''} ${
                    active ? 'sidebar-nav-item--active' : ''
                  }`}
                >
                  <span className="sidebar-nav-icon">
                    <Icon />
                  </span>
                  {!collapsed && <span className="truncate">{label}</span>}
                  {collapsed && (
                    <span className="sidebar-tooltip" role="tooltip">
                      {label}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* footer */}
        <div
          className={`shrink-0 space-y-2 border-t border-white/[0.06] py-4 ${
            collapsed ? 'flex flex-col items-center px-2.5' : 'px-3'
          }`}
        >
          <button
            type="button"
            onClick={onAddProject}
            title={collapsed ? 'Yeni proje' : undefined}
            className={
              collapsed
                ? 'sidebar-nav-item sidebar-nav-item--collapsed sidebar-nav-item--accent'
                : 'btn-primary w-full !rounded-xl !py-2.5'
            }
          >
            {collapsed ? (
              <>
                <span className="sidebar-nav-icon">
                  <IconPlus />
                </span>
                <span className="sidebar-tooltip" role="tooltip">
                  Yeni proje
                </span>
              </>
            ) : (
              <>
                <IconPlus className="h-4 w-4" />
                Yeni proje
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onToggle}
            title={collapsed ? 'Genişlet' : 'Daralt'}
            className={`sidebar-nav-item sidebar-toggle ${collapsed ? 'sidebar-nav-item--collapsed' : ''}`}
          >
            <span className="sidebar-nav-icon text-[var(--color-x-muted)] group-hover:text-white">
              {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
            </span>
            {!collapsed && <span className="text-[var(--color-x-muted)] group-hover:text-white">Daralt</span>}
            {collapsed && (
              <span className="sidebar-tooltip" role="tooltip">
                Genişlet
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
