import { motion, useReducedMotion } from 'motion/react'
import CtaButton from '../ui/CtaButton'
import SparklesCore from '../ui/SparklesCore'
import HomeReveal from './HomeReveal'
import { revealBlock, revealLine } from '../ui/RevealMotion'

export default function HomeCta() {
  const reduceMotion = useReducedMotion()

  return (
    <HomeReveal className="home-cta" aria-label="Başlangıç çağrısı" amount={0.2}>
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

      <motion.div className="home-cta__content" variants={revealBlock(reduceMotion, 0.08, 0.06)}>
        <motion.h2 className="home-cta__title" variants={revealLine(reduceMotion, 10, 8)}>
          Hemen başlayın
        </motion.h2>
        <motion.p className="home-cta__lead" variants={revealLine(reduceMotion)}>
          Projelerinizi ekleyin, metrikleri izleyin, sonuçları tek panelden takip edin.
        </motion.p>
        <motion.div className="home-cta__actions" variants={revealLine(reduceMotion, 12, 6)}>
          <CtaButton to="/dashboard" label="Çalışma alanına geç" />
          <a href="#hakkimizda" className="home-hero__btn-secondary">
            Daha fazla bilgi
          </a>
        </motion.div>
      </motion.div>
    </HomeReveal>
  )
}
