export default function GlassPanel({ children, className = '', innerClassName = '' }) {
  return (
    <div className={`premium-panel ${className}`}>
      <div className={`premium-panel-inner ${innerClassName}`}>{children}</div>
    </div>
  )
}
