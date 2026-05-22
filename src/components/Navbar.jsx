export default function Navbar({ onMenuClick, onAddProject }) {
  return (
    <header className="rim-line-top sticky top-0 z-30 flex h-14 items-center justify-between bg-[#0A0A0A]/80 px-6 backdrop-blur-md lg:px-10">
      <button
        type="button"
        onClick={onMenuClick}
        className="btn-text lg:hidden"
        aria-label="Menü"
      >
        Menü
      </button>

      <div className="hidden flex-1 lg:block" />

      <button type="button" onClick={onAddProject} className="btn-primary">
        Yeni proje
      </button>
    </header>
  )
}
