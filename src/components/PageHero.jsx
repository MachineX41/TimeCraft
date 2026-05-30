import { motion, useReducedMotion } from 'motion/react'
import {
  RevealChars,
  RevealWords,
  revealBlock,
  revealLine,
} from './ui/RevealMotion'

const LEAD =
  'Zaman, ücret ve durum takibini tek bir panelden yönetin.'

export default function PageHero({ projectCount = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.header
      className="x-hero"
      variants={revealBlock(reduceMotion, 0.09, 0.05)}
      initial="hidden"
      animate="visible"
    >
      <motion.p className="x-hero__overline" variants={revealLine(reduceMotion)}>
        <span className="x-hero__overline-dot" aria-hidden="true" />
        <span className="sr-only">Freelancer workspace</span>
        <RevealWords text="Freelancer workspace" reduceMotion={reduceMotion} />
      </motion.p>

      <motion.h1 className="x-hero__title" variants={revealLine(reduceMotion, 12, 10)}>
        <span className="sr-only">Projeler</span>
        <RevealChars text="Projeler" reduceMotion={reduceMotion} />
      </motion.h1>

      <motion.p className="x-hero__lead" variants={revealLine(reduceMotion)}>
        <span className="sr-only">
          {LEAD}
          {projectCount > 0 ? ` ${projectCount} kayıt` : ''}
        </span>
        <RevealWords text={LEAD} reduceMotion={reduceMotion} />
        {projectCount > 0 && (
          <span className="x-hero__meta">
            <span className="x-hero__meta-sep" aria-hidden="true">
              ·
            </span>
            <RevealChars
              text={`${projectCount} kayıt`}
              reduceMotion={reduceMotion}
              duration={0.32}
            />
          </span>
        )}
      </motion.p>
    </motion.header>
  )
}
