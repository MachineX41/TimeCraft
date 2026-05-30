import { motion } from 'motion/react'

export const revealEase = [0.22, 1, 0.36, 1]

export function revealTransition(reduceMotion, duration = 0.48) {
  return reduceMotion ? { duration: 0 } : { duration, ease: revealEase }
}

export function revealBlock(reduceMotion, staggerChildren = 0.07, delayChildren = 0.06) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren, delayChildren },
    },
  }
}

export function revealLine(reduceMotion, y = 10, blur = 8) {
  return {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : y,
      filter: reduceMotion ? 'blur(0px)' : `blur(${blur}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: revealTransition(reduceMotion),
    },
  }
}

export function revealCharGroup(reduceMotion, staggerChildren = 0.02, delayChildren = 0.02) {
  return {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren, delayChildren },
    },
  }
}

export function revealChar(reduceMotion, duration = 0.38) {
  return {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 6,
      filter: reduceMotion ? 'blur(0px)' : 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: revealTransition(reduceMotion, duration),
    },
  }
}

export function revealRow(reduceMotion, x = -6) {
  return {
    hidden: { opacity: 0, x: reduceMotion ? 0 : x },
    visible: {
      opacity: 1,
      x: 0,
      transition: revealTransition(reduceMotion, 0.42),
    },
  }
}

export function tableRowVariants(reduceMotion, animateIn = true) {
  const row = revealRow(reduceMotion, -8)

  return {
    hidden: animateIn ? row.hidden : { opacity: 1, x: 0 },
    visible: row.visible,
    exit: {
      opacity: 0,
      x: reduceMotion ? 0 : -28,
      filter: reduceMotion ? 'blur(0px)' : 'blur(6px)',
      transition: revealTransition(reduceMotion, 0.42),
    },
  }
}

export function revealList(reduceMotion, staggerChildren = 0.08, delayChildren = 0.1) {
  return {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren, delayChildren },
    },
  }
}

export function RevealChars({ text, className, reduceMotion, duration }) {
  return (
    <motion.span
      className={className}
      variants={revealCharGroup(reduceMotion)}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {text.split('').map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          variants={revealChar(reduceMotion, duration)}
          style={{
            display: 'inline-block',
            whiteSpace: segment === ' ' ? 'pre' : 'normal',
          }}
        >
          {segment}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function RevealWords({ text, className, reduceMotion, duration }) {
  const parts = text.split(/(\s+)/)

  return (
    <motion.span
      className={className}
      variants={revealCharGroup(reduceMotion)}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {parts.map((part, index) => (
        <motion.span
          key={`${index}-${part}`}
          variants={revealChar(reduceMotion, duration)}
          style={{
            display: 'inline-block',
            whiteSpace: /^\s+$/.test(part) ? 'pre' : 'normal',
          }}
        >
          {part}
        </motion.span>
      ))}
    </motion.span>
  )
}
