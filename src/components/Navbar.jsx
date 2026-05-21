export default function Navbar({ onMenuClick, onAddProject, pageTitle = 'Projeler' }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-zinc-800/80 bg-zinc-950/40 px-6 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-white/[0.04] hover:text-white lg:hidden"
          aria-label="Menüyü aç"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="min-w-0">
          <nav className="mb-0.5 flex items-center gap-1.5 text-[10px] tracking-widest text-zinc-600 uppercase">
            <span>Ana Sayfa</span>
            <span>/</span>
            <span className="text-zinc-500">{pageTitle}</span>
          </nav>
          <h1 className="truncate text-lg font-medium text-white">{pageTitle}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={onAddProject} className="btn-primary hidden sm:inline-flex">
          + Yeni Proje
        </button>
        <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-zinc-800 text-xs font-semibold text-white ring-1 ring-zinc-800 sm:flex">
          TC
        </div>
      </div>
    </header>
  )
}
