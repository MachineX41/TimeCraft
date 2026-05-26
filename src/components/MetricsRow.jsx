import { calculateKPIs, formatCurrency } from '../utils/projectStats'

export default function MetricsRow({ projects }) {
  const { totalEarned, totalHours, activeJobCount } = calculateKPIs(projects)

  const metrics = [
    { label: 'Hak edilen ücret', value: formatCurrency(totalEarned) },
    { label: 'Toplam mesai', value: `${totalHours} saat` },
    { label: 'Aktif iş', value: String(activeJobCount) },
  ]

  return (
    <div className="x-stats" aria-label="Özet metrikler">
      {metrics.map((metric) => (
        <div key={metric.label} className="x-stat">
          <p className="x-stat__value">{metric.value}</p>
          <p className="x-stat__label">{metric.label}</p>
        </div>
      ))}
    </div>
  )
}
