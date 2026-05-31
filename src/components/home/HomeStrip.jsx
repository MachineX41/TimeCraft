import { motion, useReducedMotion } from 'motion/react'
import { revealBlock, revealLine } from '../ui/RevealMotion'

const ITEMS = [
  'Proje takibi',
  'Mesai kaydı',
  'Ücret hesaplama',
  'Canlı KPI',
  'Durum filtreleri',
  'Raporlama',
]

export default function HomeStrip() {
  const reduceMotion = useReducedMotion()
  const loop = [...ITEMS, ...ITEMS]

  return (
    <motion.section
      className="home-strip"
      aria-label="Platform yetenekleri"
      variants={revealBlock(reduceMotion, 0.06, 0)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div className="home-strip__track" variants={revealLine(reduceMotion, 10, 4)}>
        <div className="home-strip__row">
          {loop.map((item, index) => (
            <span key={`${item}-${index}`} className="home-strip__item">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}
