import { calculateKPIs, formatCurrency } from '../utils/projectStats'

export default function MetricsRow({ projects }) {
  const { totalEarned, totalHours, activeJobCount } = calculateKPIs(projects)

  const metrics = [
    { label: 'Hak edilen ücret', value: formatCurrency(totalEarned) },
    { label: 'Toplam mesai', value: `${totalHours} saat` },
    { label: 'Aktif iş', value: String(activeJobCount) },
  ]

  return (
    <div className="mb-12 grid grid-cols-1 gap-10 border-b border-white/[0.05] pb-12 sm:grid-cols-3 sm:gap-8">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <p className="text-overline mb-2">{metric.label}</p>
          <p className="text-2xl font-medium tracking-tight text-white tabular-nums sm:text-3xl">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  )
}
