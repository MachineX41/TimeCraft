import { motion, useReducedMotion } from 'motion/react'
import { revealTransition } from './ui/RevealMotion'

const pageVariants = (reduceMotion) => ({
  initial: {
    opacity: reduceMotion ? 1 : 0,
    y: reduceMotion ? 0 : 14,
    filter: reduceMotion ? 'blur(0px)' : 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: revealTransition(reduceMotion, 0.5),
  },
  exit: {
    opacity: reduceMotion ? 1 : 0,
    y: reduceMotion ? 0 : -10,
    filter: reduceMotion ? 'blur(0px)' : 'blur(4px)',
    transition: revealTransition(reduceMotion, 0.38),
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
      style={{ willChange: reduceMotion ? 'auto' : 'opacity, transform, filter' }}
    >
      {children}
    </motion.div>
  )
}
