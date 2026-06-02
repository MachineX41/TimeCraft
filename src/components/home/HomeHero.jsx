import CtaButton from '../ui/CtaButton'
import ShinyText from '../ui/ShinyText'
import SparklesCore from '../ui/SparklesCore'

const LEAD =
  'Freelancer ve bağımsız çalışanlar için proje, mesai ve ücret takibini tek bir çalışma alanında birleştirin. Dağınık tablolar ve notlar yerine net metrikler, anlık görünürlük ve sade bir dashboard deneyimi sunar.'

export default function HomeHero() {
  return (
    <section className="home-hero-section" aria-label="Ana sayfa başlığı">
      <div className="x-page-header__media" aria-hidden="true">
        <div className="x-page-header__bg home-hero-section__bg" />
        <div className="home-hero-section__overlay" />
      </div>

      <div className="home-hero">
        <h1 className="home-hero__brand">
          <ShinyText
            text="TimeCraft"
            speed={2}
            delay={0}
            color="#ffffff"
            shineColor="#bfbfbf"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </h1>

        <div className="home-hero__sparkles">
          <div className="home-hero__sparkles-line home-hero__sparkles-line--wide home-hero__sparkles-line--blur" />
          <div className="home-hero__sparkles-line home-hero__sparkles-line--wide" />
          <div className="home-hero__sparkles-line home-hero__sparkles-line--narrow home-hero__sparkles-line--blur" />
          <div className="home-hero__sparkles-line home-hero__sparkles-line--narrow" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="home-hero__sparkles-core"
            particleColor="#FFFFFF"
          />
        </div>

        <p className="home-hero__lead">{LEAD}</p>

        <div className="home-hero__actions">
          <CtaButton to="/dashboard" label="Dashboard'a git" />
          <a href="#hakkimizda" className="home-hero__btn-secondary">
            Daha fazla bilgi
          </a>
        </div>

        <a href="#home-content" className="home-hero__scroll">
          Aşağıya kaydır
        </a>
      </div>
    </section>
  )
}
