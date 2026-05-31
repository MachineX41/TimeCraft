import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  RevealChars,
  RevealWords,
  revealBlock,
  revealLine,
} from '../ui/RevealMotion'

const LEAD = 'Projelerinizi ekleyin, metrikleri izleyin, raporlarınızı hazırlayın.'

export default function HomeCta() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className="home-cta"
      aria-label="Başlangıç çağrısı"
      variants={revealBlock(reduceMotion, 0.08, 0.04)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2 className="home-cta__title" variants={revealLine(reduceMotion, 10, 8)}>
        <span className="sr-only">Hemen başlayın</span>
        <RevealChars text="Hemen başlayın" reduceMotion={reduceMotion} />
      </motion.h2>
      <motion.p className="home-cta__lead" variants={revealLine(reduceMotion)}>
        <span className="sr-only">{LEAD}</span>
        <RevealWords text={LEAD} reduceMotion={reduceMotion} />
      </motion.p>
      <motion.div variants={revealLine(reduceMotion, 12, 6)}>
        <Link to="/dashboard" className="home-pill home-pill--primary">
          Çalışma alanına geç
        </Link>
      </motion.div>
    </motion.section>
  )
}
