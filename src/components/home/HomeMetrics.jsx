import { motion, useReducedMotion } from 'motion/react'
import HomeReveal from './HomeReveal'
import { revealLine, revealList } from '../ui/RevealMotion'

const STATS = [
  { value: '1', label: 'Tek panel' },
  { value: '3', label: 'Adımda başlangıç' },
  { value: 'Anlık', label: 'Metrik görünürlüğü' },
  { value: '0', label: 'Kurulum gerekmez' },
]

export default function HomeMetrics() {
  const reduceMotion = useReducedMotion()

  return (
    <HomeReveal className="home-metrics" aria-label="Platform özeti" amount={0.3}>
      <motion.ul
        className="home-metrics__grid"
        variants={revealList(reduceMotion, 0.08, 0.06)}
      >
        {STATS.map((stat) => (
          <motion.li
            key={stat.label}
            className="home-metrics__item"
            variants={revealLine(reduceMotion, 12, 6)}
          >
            <span className="home-metrics__value">{stat.value}</span>
            <span className="home-metrics__label">{stat.label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </HomeReveal>
  )
}
