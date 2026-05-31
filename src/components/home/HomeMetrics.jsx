const STATS = [
  { value: '1', label: 'Tek panel' },
  { value: '3', label: 'Adımda başlangıç' },
  { value: 'Anlık', label: 'Metrik görünürlüğü' },
  { value: '0', label: 'Kurulum gerekmez' },
]

export default function HomeMetrics() {
  return (
    <section className="home-metrics" aria-label="Platform özeti">
      <ul className="home-metrics__grid">
        {STATS.map((stat) => (
          <li key={stat.label} className="home-metrics__item">
            <span className="home-metrics__value">{stat.value}</span>
            <span className="home-metrics__label">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
