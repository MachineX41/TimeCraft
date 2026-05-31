const ITEMS = [
  'Proje takibi',
  'Mesai kaydı',
  'Ücret hesaplama',
  'Canlı KPI',
  'Durum filtreleri',
  'Raporlama',
]

export default function HomeStrip() {
  const loop = [...ITEMS, ...ITEMS]

  return (
    <section className="home-strip" aria-label="Platform yetenekleri">
      <div className="home-strip__track" aria-hidden="true">
        <div className="home-strip__row">
          {loop.map((item, index) => (
            <span key={`${item}-${index}`} className="home-strip__item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
