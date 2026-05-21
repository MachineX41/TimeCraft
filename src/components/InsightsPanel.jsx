import { calculateKPIs, formatCurrency } from '../utils/projectStats'
import GlassPanel from './GlassPanel'

export default function InsightsPanel({ projects }) {
  const { totalEarned, totalHours, activeJobCount } = calculateKPIs(projects)

  const items = [
    { label: 'Toplam Hak Edilen', value: formatCurrency(totalEarned) },
    { label: 'Toplam Mesai', value: `${totalHours} saat` },
    { label: 'Aktif İş Sayısı', value: String(activeJobCount), highlight: activeJobCount > 0 },
  ]

  return (
    <GlassPanel className="h-full" innerClassName="flex h-full flex-col p-8">
      <p className="section-label mb-8">Özet Sonuçlar</p>

      <div className="flex flex-1 flex-col justify-center gap-10">
        {items.map((item) => (
          <div key={item.label} className="border-b border-zinc-800/60 pb-8 last:border-0 last:pb-0">
            <p className="section-label mb-3">{item.label}</p>
            <p
              className={`text-3xl font-semibold tracking-tight tabular-nums ${
                item.highlight ? 'text-white' : 'text-zinc-100'
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[11px] leading-relaxed text-zinc-600">
        Tüm metrikler kayıtlı projelerinizden anlık hesaplanır.
      </p>
    </GlassPanel>
  )
}
