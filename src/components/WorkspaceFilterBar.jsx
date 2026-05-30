import { motion, useReducedMotion } from 'motion/react'

const FILTERS = [
  { id: 'all', label: 'Tümü' },
  { id: 'active', label: 'Aktif' },
  { id: 'done', label: 'Tamamlanan' },
]

const pillSpring = { type: 'spring', stiffness: 480, damping: 38, mass: 0.7 }

export default function WorkspaceFilterBar({ filter, onChange, counts = {} }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="workspace-filter-bar">
      <motion.div
        className="workspace-filter-bar__track"
        role="tablist"
        aria-label="Proje filtresi"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="workspace-filter-bar__rim" aria-hidden="true" />
        {FILTERS.map((f) => {
          const isActive = filter === f.id
          const count = counts[f.id]

          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(f.id)}
              className={`workspace-filter-bar__tab${isActive ? ' workspace-filter-bar__tab--active' : ''}`}
            >
              {isActive && (
                <motion.span
                  layoutId="workspace-filter-pill"
                  className="workspace-filter-bar__pill"
                  transition={reduceMotion ? { duration: 0 } : pillSpring}
                  aria-hidden="true"
                />
              )}
              <span className="workspace-filter-bar__label">{f.label}</span>
              {count !== undefined && (
                <span className="workspace-filter-bar__count tabular-nums">{count}</span>
              )}
            </button>
          )
        })}
      </motion.div>
    </div>
  )
}
