/**
 * Gradient yalnızca 1px border halkasında (::before mask).
 * İç yüzey her zaman düz siyah.
 */
export default function RimPanel({ children, className = '', variant = 'default', innerClassName = '' }) {
  const variantClass = variant === 'drawer' ? 'rim-panel--drawer' : 'rim-panel--default'

  return (
    <div className={`rim-panel ${variantClass} ${className}`}>
      <div className={`rim-panel__inner ${innerClassName}`}>{children}</div>
    </div>
  )
}
