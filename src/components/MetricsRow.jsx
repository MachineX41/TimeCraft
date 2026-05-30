import { motion, useReducedMotion } from 'motion/react'
import { calculateKPIs, formatCurrency } from '../utils/projectStats'
import {
  RevealChars,
  RevealWords,
  revealBlock,
  revealLine,
} from './ui/RevealMotion'

export default function MetricsRow({ projects }) {
  const reduceMotion = useReducedMotion()
  const { totalEarned, totalHours, activeJobCount } = calculateKPIs(projects)

  const metrics = [
    { id: 'earned', label: 'Hak edilen ücret', value: formatCurrency(totalEarned) },
    { id: 'hours', label: 'Toplam mesai', value: `${totalHours} saat` },
    { id: 'active', label: 'Aktif iş', value: String(activeJobCount) },
  ]

  return (
    <motion.div
      className="x-stats"
      aria-label="Özet metrikler"
      variants={revealBlock(reduceMotion, 0.1, 0.22)}
      initial="hidden"
      animate="visible"
    >
      {metrics.map((metric) => (
        <motion.article key={metric.id} className="x-stat-card" variants={revealLine(reduceMotion, 14, 8)}>
          <span className="x-stat-card__rim" aria-hidden="true" />
          <span className="x-stat-card__shine" aria-hidden="true" />
          <p className="x-stat-card__value tabular-nums">
            <span className="sr-only">{metric.value}</span>
            <RevealChars text={metric.value} reduceMotion={reduceMotion} duration={0.36} />
          </p>
          <p className="x-stat-card__label">
            <span className="sr-only">{metric.label}</span>
            <RevealWords text={metric.label} reduceMotion={reduceMotion} duration={0.34} />
          </p>
        </motion.article>
      ))}
    </motion.div>
  )
}
