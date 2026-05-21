export default function Navbar({ onAddProject }) {
  return (
    <header className="relative z-20 border-b border-zinc-800/80 bg-zinc-950/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium tracking-tight text-white">TimeCraft</span>
          <span className="hidden text-sm font-light text-zinc-600 sm:inline">Intelligence</span>
        </div>

        <nav className="flex items-center gap-2">
          <button type="button" className="nav-pill nav-pill-outline" onClick={onAddProject}>
            + Yeni
          </button>
          <button type="button" className="nav-pill nav-pill-active">
            Projeler
          </button>
          <button type="button" className="nav-pill">
            Özet
          </button>
          <button type="button" className="nav-pill">
            Ana Sayfa
          </button>
        </nav>
      </div>
    </header>
  )
}
