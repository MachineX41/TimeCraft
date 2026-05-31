const FEATURES = [
  {
    id: 'projects',
    title: 'Proje yönetimi',
    description: 'Tüm işlerinizi tek listede tutun; durum, ücret ve mesai tek bakışta.',
  },
  {
    id: 'time',
    title: 'Zaman takibi',
    description: 'Saat bazlı çalışmalarınızı kaydedin, toplam mesaiyi anında görün.',
  },
  {
    id: 'earnings',
    title: 'Ücret hesaplama',
    description: 'Saatlik ücret ve mesai otomatik birleşir; hak edilen tutar net çıkar.',
  },
  {
    id: 'filters',
    title: 'Akıllı filtreler',
    description: 'Durum, arama ve sekmelerle kayıtlar arasında saniyeler içinde gezinin.',
  },
]

export default function HomeFeatures() {
  return (
    <section id="ozellikler" className="home-section home-features" aria-label="Özellikler">
      <header className="home-section__header home-features__intro">
        <p className="home-section__eyebrow">Özellikler</p>
        <h2 className="home-section__title">Neden TimeCraft?</h2>
        <p className="home-section__lead">Net, hızlı ve odaklı bir çalışma alanı.</p>
      </header>

      <ul className="home-features-list">
        {FEATURES.map((feature, index) => (
          <li key={feature.id} className="home-features-item">
            <span className="home-features-item__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="home-features-item__body">
              <h3 className="home-features-item__title">{feature.title}</h3>
              <p className="home-features-item__desc">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
