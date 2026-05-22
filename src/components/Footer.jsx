const FOOTER_COLUMNS = [
  {
    title: 'TimeCraft',
    links: [
      { label: 'Dashboard', href: '#' },
      { label: 'Projeler', href: '#' },
      { label: 'Raporlar', href: '#' },
    ],
  },
  {
    title: 'Ürün',
    links: [
      { label: 'Yeni proje', href: '#' },
      { label: 'Metrikler', href: '#' },
      { label: 'Durum takibi', href: '#' },
    ],
  },
  {
    title: 'Kaynaklar',
    links: [
      { label: 'Dokümantasyon', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Yardım merkezi', href: '#' },
    ],
  },
  {
    title: 'Şirket',
    links: [
      { label: 'Hakkında', href: '#' },
      { label: 'Kariyer', href: '#' },
      { label: 'İletişim', href: '#' },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { label: 'Gizlilik', href: '#' },
      { label: 'Güvenlik', href: '#' },
      { label: 'Kullanım şartları', href: '#' },
    ],
  },
]

export default function Footer({ collapsed = false }) {
  const innerClass = collapsed
    ? 'site-footer__inner site-footer__inner--collapsed'
    : 'site-footer__inner site-footer__inner--expanded'

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
      <div className={innerClass}>
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
      </div>
    </footer>
  )
}
