import { Link } from 'react-router-dom'

const FOOTER_COLUMNS = [
  {
    title: 'Ürün',
    links: [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Özellikler', href: '/#ozellikler' },
      { label: 'SSS', href: '/#sss' },
    ],
  },
  {
    title: 'Keşfet',
    links: [
      { label: 'Hakkında', href: '/#hakkimizda' },
      { label: 'Nasıl çalışır', href: '/#nasil-calisir' },
      { label: 'Özellikler', href: '/#ozellikler' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

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
        <div className="site-footer__container">
          <div className="site-footer__main">
            <div className="site-footer__brand">
              <Link to="/" className="site-footer__logo-link" aria-label="TimeCraft ana sayfa">
                <img
                  src="/timecraftlogo.svg"
                  alt=""
                  className="site-footer__logo"
                  width={320}
                  height={293}
                  decoding="async"
                />
              </Link>
              <p className="site-footer__tagline">
                Freelancer&apos;lar için zaman, ücret ve proje takibi. Tek panelde net
                görünürlük.
              </p>
            </div>

            <nav className="site-footer__nav" aria-label="Alt bilgi menüsü">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.title} className="site-footer__col">
                  <h3 className="site-footer__heading">{column.title}</h3>
                  <ul className="site-footer__list">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.label}`}>
                        {link.href.startsWith('/#') ? (
                          <a href={link.href} className="site-footer__link">
                            {link.label}
                          </a>
                        ) : (
                          <Link to={link.href} className="site-footer__link">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="site-footer__bottom">
            <p className="site-footer__copy">© {year} TimeCraft. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
