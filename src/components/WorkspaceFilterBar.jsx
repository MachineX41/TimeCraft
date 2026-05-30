import { motion, useReducedMotion } from 'motion/react'
import { SEARCH_PLACEHOLDER } from '../utils/projectSearch'

const FILTERS = [
  { id: 'all', label: 'Tümü' },
  { id: 'pending', label: 'Beklemede' },
  { id: 'active', label: 'Aktif' },
  { id: 'done', label: 'Tamamlanan' },
]

const pillSpring = { type: 'spring', stiffness: 480, damping: 38, mass: 0.7 }
const barEase = [0.22, 1, 0.36, 1]

function SearchIcon() {
  return (
    <svg
      className="workspace-filter-bar__search-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M16 16l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function WorkspaceFilterBar({
  filter,
  onChange,
  counts = {},
  searchQuery = '',
  onSearchChange,
}) {
  const reduceMotion = useReducedMotion()
  const hasQuery = searchQuery.trim().length > 0

  return (
    <div className="workspace-filter-bar">
      <div className="workspace-filter-bar__row">
        <motion.div
          className="workspace-filter-bar__track"
          role="tablist"
          aria-label="Proje filtresi"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: barEase }}
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

        <motion.div
          className={`workspace-filter-bar__search${hasQuery ? ' workspace-filter-bar__search--active' : ''}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: barEase, delay: reduceMotion ? 0 : 0.06 }}
        >
          <span className="workspace-filter-bar__rim" aria-hidden="true" />
          <SearchIcon />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={SEARCH_PLACEHOLDER[filter] ?? SEARCH_PLACEHOLDER.all}
            className="workspace-filter-bar__search-input"
            aria-label={SEARCH_PLACEHOLDER[filter] ?? 'Projelerde ara'}
            autoComplete="off"
            spellCheck={false}
          />
          {hasQuery && (
            <button
              type="button"
              className="workspace-filter-bar__search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Aramayı temizle"
            >
              ×
            </button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
