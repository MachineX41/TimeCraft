import { motion, useReducedMotion } from 'motion/react'
import BorderGlow from './BorderGlow'
import { calculateKPIs, formatCurrency } from '../utils/projectStats'
import { WORKSPACE_BORDER_GLOW } from '../constants/workspaceBorderGlow'
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
        <motion.div key={metric.id} variants={revealLine(reduceMotion, 14, 8)} className="x-stat-slot">
          <BorderGlow {...WORKSPACE_BORDER_GLOW} className="x-stat-glow">
            <div className="x-stat-glow__content">
              <p className="x-stat-glow__value tabular-nums">
                <span className="sr-only">{metric.value}</span>
                <RevealChars text={metric.value} reduceMotion={reduceMotion} duration={0.36} />
              </p>
              <p className="x-stat-glow__label">
                <span className="sr-only">{metric.label}</span>
                <RevealWords text={metric.label} reduceMotion={reduceMotion} duration={0.34} />
              </p>
            </div>
          </BorderGlow>
        </motion.div>
      ))}
    </motion.div>
  )
}
