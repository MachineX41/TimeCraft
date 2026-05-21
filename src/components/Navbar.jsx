export default function Navbar({ onAddProject }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/90 ring-1 ring-indigo-400/30">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight text-zinc-50">
              TimeCraft
            </h1>
            <p className="text-xs text-zinc-500">Freelancer workspace</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddProject}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Yeni proje
        </button>
      </div>
    </header>
  )
}
