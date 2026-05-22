const FOOTER_COLUMNS = [
  {
    title: 'TimeCraft',
    links: [
      { label: 'Dashboard', href: '#' },
      { label: 'Projeler', href: '#' },
      { label: 'Raporlar', href: '#' },
      { label: 'Takvim', href: '#' },
      { label: 'Ekip', href: '#' },
      { label: 'Ayarlar', href: '#' },
    ],
  },
  {
    title: 'Ürün',
    links: [
      { label: 'Yeni proje', href: '#' },
      { label: 'Metrikler', href: '#' },
      { label: 'Durum takibi', href: '#' },
      { label: 'Zaman çizelgesi', href: '#' },
      { label: 'Bütçe', href: '#' },
      { label: 'Entegrasyonlar', href: '#' },
    ],
  },
  {
    title: 'Kaynaklar',
    links: [
      { label: 'Dokümantasyon', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Yardım merkezi', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'SSS', href: '#' },
      { label: 'Topluluk', href: '#' },
    ],
  },
  {
    title: 'Şirket',
    links: [
      { label: 'Hakkında', href: '#' },
      { label: 'Kariyer', href: '#' },
      { label: 'İletişim', href: '#' },
      { label: 'Basın', href: '#' },
      { label: 'Ortaklar', href: '#' },
      { label: 'Sürdürülebilirlik', href: '#' },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { label: 'Gizlilik', href: '#' },
      { label: 'Güvenlik', href: '#' },
      { label: 'Kullanım şartları', href: '#' },
      { label: 'Çerez politikası', href: '#' },
      { label: 'KVKK', href: '#' },
      { label: 'Lisanslar', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <img
        src="/footer.png"
        alt=""
        className="site-footer__bg"
        width={1351}
        height={768}
        decoding="async"
      />
      <div className="site-footer__inner">
        <div className="site-footer__content">
          <p className="site-footer__tagline">
            Proje ve zaman yönetimi — ekipleriniz için tek merkez.
          </p>
          <div className="site-footer__grid">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="site-footer__col">
                <h3 className="site-footer__heading">{column.title}</h3>
                <ul className="site-footer__list">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="site-footer__link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="site-footer__bottom">
            <p className="site-footer__copy">© 2026 TimeCraft. Tüm hakları saklıdır.</p>
            <nav className="site-footer__meta" aria-label="Footer ek bağlantılar">
              <a href="#" className="site-footer__meta-link">
                Durum
              </a>
              <a href="#" className="site-footer__meta-link">
                Sürüm notları
              </a>
              <a href="#" className="site-footer__meta-link">
                Destek
              </a>
              <a href="#" className="site-footer__meta-link">
                Türkçe
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
