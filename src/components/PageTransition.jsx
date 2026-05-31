import { motion, useReducedMotion } from 'motion/react'
import { revealTransition } from './ui/RevealMotion'

const pageVariants = (reduceMotion) => ({
  initial: {
    opacity: reduceMotion ? 1 : 0,
  },
  animate: {
    opacity: 1,
    transition: revealTransition(reduceMotion, 0.48),
  },
  exit: {
    opacity: reduceMotion ? 1 : 0,
    transition: revealTransition(reduceMotion, 0.36),
  },
})

export default function PageTransition({ children }) {
  const reduceMotion = useReducedMotion()
  const variants = pageVariants(reduceMotion)

  return (
    <motion.div
      className="page-transition"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      style={{ willChange: reduceMotion ? 'auto' : 'opacity' }}
    >
      {children}
    </motion.div>
  )
}
