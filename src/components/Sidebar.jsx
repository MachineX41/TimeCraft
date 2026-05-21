import { useEffect } from 'react'

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    active: true,
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projeler',
    active: false,
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    id: 'reports',
    label: 'Raporlar',
    active: false,
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'clients',
    label: 'Müşteriler',
    active: false,
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

function NavItem({ item, collapsed }) {
  return (
    <button
      type="button"
      title={collapsed ? item.label : undefined}
      className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        item.active
          ? 'bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]'
          : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300'
      } ${collapsed ? 'justify-center px-0' : ''}`}
    >
      <span className={item.active ? 'text-violet-400' : 'text-zinc-600 group-hover:text-zinc-400'}>
        {item.icon}
      </span>
      {!collapsed && <span className="truncate">{item.label}</span>}
      {item.active && !collapsed && (
        <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgb(167_139_250/0.8)]" />
      )}
    </button>
  )
}

export default function Sidebar({ collapsed, onToggle, onAddProject, mobileOpen, onMobileClose }) {
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* mobil overlay */}
      <button
        type="button"
        aria-label="Menüyü kapat"
        onClick={onMobileClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl transition-[width,transform] duration-300 ease-in-out lg:translate-x-0 ${
          collapsed ? 'w-[72px]' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* logo */}
        <div
          className={`flex h-16 shrink-0 items-center border-b border-zinc-800/80 ${
            collapsed ? 'justify-center px-0' : 'gap-3 px-5'
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-zinc-800 ring-1 ring-violet-500/20">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {!collapsed && (
            <div className="min-w-0 overflow-hidden">
              <p className="truncate text-sm font-semibold text-white">TimeCraft</p>
              <p className="truncate text-[10px] tracking-widest text-zinc-600 uppercase">Intelligence</p>
            </div>
          )}
        </div>

        {/* nav */}
        <nav className={`flex-1 space-y-1 overflow-y-auto py-5 ${collapsed ? 'px-2' : 'px-3'}`}>
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.id} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* alt aksiyonlar */}
        <div className={`shrink-0 space-y-2 border-t border-zinc-800/80 py-4 ${collapsed ? 'px-2' : 'px-3'}`}>
          <button
            type="button"
            onClick={onAddProject}
            title={collapsed ? 'Yeni Proje' : undefined}
            className={`flex w-full items-center gap-3 rounded-xl bg-white text-zinc-950 transition-all duration-200 hover:shadow-[0_0_24px_rgb(139_92_246/0.3)] ${
              collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5 text-sm font-semibold'
            }`}
          >
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {!collapsed && <span>Yeni Proje</span>}
          </button>

          <button
            type="button"
            onClick={onToggle}
            title={collapsed ? 'Genişlet' : 'Daralt'}
            className={`flex w-full items-center gap-3 rounded-xl border border-zinc-800 text-zinc-500 transition-colors hover:border-zinc-700 hover:bg-white/[0.04] hover:text-zinc-300 ${
              collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5 text-sm'
            }`}
          >
            <svg
              className={`h-5 w-5 shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            {!collapsed && <span>Menüyü daralt</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
