import { motion, useReducedMotion } from 'motion/react'
import CtaButton from '../ui/CtaButton'
import BorderGlow from '../BorderGlow'
import { WORKSPACE_BORDER_GLOW } from '../../constants/workspaceBorderGlow'
import HomeReveal from './HomeReveal'
import { revealBlock, revealLine, revealList } from '../ui/RevealMotion'

const POINTS = [
  'Freelancer ve bağımsız çalışanlar için tasarlandı.',
  'Proje, mesai ve ücret verisi tek kaynakta birleşir.',
  'Dashboard ile anlık metrikler ve net görünürlük.',
]

export default function HomeAbout() {
  const reduceMotion = useReducedMotion()

  return (
    <HomeReveal
      id="hakkimizda"
      className="home-section home-about"
      aria-label="Hakkında"
    >
      <motion.div className="home-about__grid" variants={revealBlock(reduceMotion, 0.07, 0)}>
        <motion.div className="home-about__copy" variants={revealLine(reduceMotion, 14, 8)}>
          <motion.p className="home-section__eyebrow" variants={revealLine(reduceMotion)}>
            Hakkında
          </motion.p>
          <motion.h2 className="home-section__title" variants={revealLine(reduceMotion, 10, 8)}>
            Zaman takibini sadeleştirdik.
          </motion.h2>
          <motion.p className="home-section__lead" variants={revealLine(reduceMotion)}>
            TimeCraft, dağınık tablolar ve notlar yerine tek bir çalışma alanı sunar.
            Projelerinizi ekleyin, mesai ve ücretleri girin, sonuçları anında görün.
          </motion.p>

          <motion.ul className="home-about__points" variants={revealList(reduceMotion, 0.06, 0.04)}>
            {POINTS.map((point) => (
              <motion.li key={point} variants={revealLine(reduceMotion, 8, 4)}>
                {point}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div className="home-section__actions" variants={revealLine(reduceMotion, 10, 4)}>
            <CtaButton to="/dashboard" label="Çalışma alanına geç" />
          </motion.div>
        </motion.div>

        <motion.div className="home-about__visual" variants={revealLine(reduceMotion, 16, 10)}>
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
        </motion.div>
      </motion.div>
    </HomeReveal>
  )
}
