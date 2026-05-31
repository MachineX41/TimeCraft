const STEPS = [
  {
    id: 'add',
    step: '01',
    title: 'Proje ekle',
    description: 'İş adı, saatlik ücret ve durumu girin; kayıt saniyeler içinde hazır.',
  },
  {
    id: 'track',
    step: '02',
    title: 'Mesai ve ücret',
    description: 'Çalışma saatlerini güncelleyin; hak edilen tutar otomatik hesaplanır.',
  },
  {
    id: 'insight',
    step: '03',
    title: 'Metrikleri izle',
    description: 'Dashboard üzerinden KPI, filtreler ve proje listesiyle net görünürlük.',
  },
]

export default function HomeHowItWorks() {
  return (
    <section id="nasil-calisir" className="home-section home-flow" aria-label="Nasıl çalışır">
      <header className="home-section__header">
        <p className="home-section__eyebrow">Nasıl çalışır</p>
        <h2 className="home-section__title">Üç adımda başlayın</h2>
        <p className="home-section__lead home-section__lead--narrow">
          Kurulum yok, karmaşık entegrasyon yok — doğrudan çalışmaya başlayın.
        </p>
      </header>

      <ol className="home-flow__steps">
        {STEPS.map((item) => (
          <li key={item.id} className="home-flow__step">
            <span className="home-flow__step-num">{item.step}</span>
            <h3 className="home-flow__step-title">{item.title}</h3>
            <p className="home-flow__step-desc">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
