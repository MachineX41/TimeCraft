import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import BorderGlow from '../BorderGlow'
import { WORKSPACE_BORDER_GLOW } from '../../constants/workspaceBorderGlow'
import {
  RevealChars,
  RevealWords,
  revealBlock,
  revealLine,
  revealList,
} from '../ui/RevealMotion'

const POINTS = [
  'Freelancer ve bağımsız çalışanlar için tasarlandı.',
  'Proje, mesai ve ücret verisi tek kaynakta birleşir.',
  'Dashboard ile anlık metrikler ve net görünürlük.',
]

export default function HomeAbout() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id="hakkimizda"
      className="home-section home-about"
      aria-label="Hakkında"
      variants={revealBlock(reduceMotion, 0.08, 0.04)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="home-about__grid">
        <motion.div className="home-about__copy" variants={revealBlock(reduceMotion, 0.07, 0)}>
          <motion.p className="home-section__eyebrow" variants={revealLine(reduceMotion)}>
            Hakkında
          </motion.p>
          <motion.h2 className="home-section__title" variants={revealLine(reduceMotion, 10, 8)}>
            <span className="sr-only">Zaman takibini sadeleştirdik.</span>
            <RevealChars text="Zaman takibini sadeleştirdik." reduceMotion={reduceMotion} />
          </motion.h2>
          <motion.p className="home-section__lead" variants={revealLine(reduceMotion)}>
            <span className="sr-only">
              TimeCraft, dağınık tablolar ve notlar yerine tek bir çalışma alanı sunar.
              Projelerinizi ekleyin, mesai ve ücretleri girin, sonuçları anında görün.
            </span>
            <RevealWords
              text="TimeCraft, dağınık tablolar ve notlar yerine tek bir çalışma alanı sunar. Projelerinizi ekleyin, mesai ve ücretleri girin, sonuçları anında görün."
              reduceMotion={reduceMotion}
            />
          </motion.p>

          <motion.ul className="home-about__points" variants={revealList(reduceMotion, 0.06, 0.04)}>
            {POINTS.map((point) => (
              <motion.li key={point} variants={revealLine(reduceMotion, 8, 4)}>
                {point}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={revealLine(reduceMotion, 10, 4)}>
            <Link to="/dashboard" className="home-pill home-pill--ghost home-about__link">
              Çalışma alanını dene
            </Link>
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
      </div>
    </motion.section>
  )
}
