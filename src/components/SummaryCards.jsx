import { calculateKPIs, formatCurrency } from '../utils/projectStats'

function Metric({ label, value, hint }) {
  return (
    <div className="min-w-0 flex-1 px-6 py-5 first:pl-0 last:pr-0 sm:px-8">
      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-1.5 truncate text-2xl font-semibold tracking-tight text-zinc-50 tabular-nums">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-zinc-600">{hint}</p>}
    </div>
  )
}

export default function SummaryCards({ projects }) {
  const { totalEarned, totalHours, activeJobCount } = calculateKPIs(projects)

  return (
    <section
      className="flex flex-col divide-y divide-white/[0.06] sm:flex-row sm:divide-x sm:divide-y-0"
      aria-label="Özet metrikler"
    >
      <Metric
        label="Hak edilen"
        value={formatCurrency(totalEarned)}
        hint="Ücret × saat"
      />
      <Metric label="Mesai" value={`${totalHours} sa`} hint="Toplam saat" />
      <Metric
        label="Aktif iş"
        value={activeJobCount}
        hint={activeJobCount ? 'Devam ediyor' : 'Boşta'}
      />
    </section>
  )
}
