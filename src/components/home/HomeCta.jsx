import CtaButton from '../ui/CtaButton'
import SparklesCore from '../ui/SparklesCore'

export default function HomeCta() {
  return (
    <section className="home-cta" aria-label="Başlangıç çağrısı">
      <div className="home-cta__sparkles" aria-hidden="true">
        <SparklesCore
          id="tsparticles-cta"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="home-cta__sparkles-core"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="home-cta__content">
        <h2 className="home-cta__title">Hemen başlayın</h2>
        <p className="home-cta__lead">
          Projelerinizi ekleyin, metrikleri izleyin, sonuçları tek panelden takip edin.
        </p>
        <div className="home-cta__actions">
          <CtaButton to="/dashboard" label="Çalışma alanına geç" />
          <a href="#hakkimizda" className="home-hero__btn-secondary">
            Daha fazla bilgi
          </a>
        </div>
      </div>
    </section>
  )
}
