import { calculateKPIs, formatCurrency } from '../utils/projectStats'

export default function MetricsRow({ projects }) {
  const { totalEarned, totalHours, activeJobCount } = calculateKPIs(projects)

  const metrics = [
    { id: 'earned', label: 'Hak edilen ücret', value: formatCurrency(totalEarned) },
    { id: 'hours', label: 'Toplam mesai', value: `${totalHours} saat` },
    { id: 'active', label: 'Aktif iş', value: String(activeJobCount) },
  ]

  return (
    <div className="x-stats" aria-label="Özet metrikler">
      {metrics.map((metric, index) => (
        <article
          key={metric.id}
          className="x-stat-card"
          style={{ '--stat-index': index }}
        >
          <span className="x-stat-card__rim" aria-hidden="true" />
          <span className="x-stat-card__shine" aria-hidden="true" />
          <p className="x-stat-card__value tabular-nums">{metric.value}</p>
          <p className="x-stat-card__label">{metric.label}</p>
        </article>
      ))}
    </div>
  )
}
