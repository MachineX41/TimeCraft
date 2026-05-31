import CtaButton from '../ui/CtaButton'
import BorderGlow from '../BorderGlow'
import { WORKSPACE_BORDER_GLOW } from '../../constants/workspaceBorderGlow'

const POINTS = [
  'Freelancer ve bağımsız çalışanlar için tasarlandı.',
  'Proje, mesai ve ücret verisi tek kaynakta birleşir.',
  'Dashboard ile anlık metrikler ve net görünürlük.',
]

export default function HomeAbout() {
  return (
    <section id="hakkimizda" className="home-section home-about" aria-label="Hakkında">
      <div className="home-about__grid">
        <div className="home-about__copy">
          <p className="home-section__eyebrow">Hakkında</p>
          <h2 className="home-section__title">Zaman takibini sadeleştirdik.</h2>
          <p className="home-section__lead">
            TimeCraft, dağınık tablolar ve notlar yerine tek bir çalışma alanı sunar.
            Projelerinizi ekleyin, mesai ve ücretleri girin, sonuçları anında görün.
          </p>

          <ul className="home-about__points">
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="home-section__actions">
            <CtaButton to="/dashboard" label="Çalışma alanına geç" />
          </div>
        </div>

        <div className="home-about__visual">
          <BorderGlow {...WORKSPACE_BORDER_GLOW} className="home-about-glow">
            <div className="home-about-glow__content">
              <blockquote className="home-about__quote">
                <p>
                  &ldquo;Ne kadar çalıştım, ne kadar hak ettim?&rdquo; sorusuna tek ekrandan cevap.
                </p>
                <footer>TimeCraft manifestosu</footer>
              </blockquote>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  )
}
