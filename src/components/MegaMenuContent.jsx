import { motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

function motionTransition(reduceMotion, duration = 0.48) {
  return reduceMotion ? { duration: 0 } : { duration, ease }
}

function blockVariants(reduceMotion) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.07, delayChildren: 0.06 },
    },
  }
}

function lineVariants(reduceMotion) {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10, filter: reduceMotion ? 'blur(0px)' : 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: motionTransition(reduceMotion),
    },
  }
}

function charGroupVariants(reduceMotion) {
  return {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.02, delayChildren: 0.02 },
    },
  }
}

function charVariants(reduceMotion) {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 6, filter: reduceMotion ? 'blur(0px)' : 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: motionTransition(reduceMotion, 0.38),
    },
  }
}

function listVariants(reduceMotion) {
  return {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }
}

function RevealChars({ text, className, reduceMotion }) {
  return (
    <motion.span
      className={className}
      variants={charGroupVariants(reduceMotion)}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {text.split('').map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          variants={charVariants(reduceMotion)}
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

function RevealWords({ text, className, reduceMotion }) {
  const parts = text.split(/(\s+)/)

  return (
    <motion.span
      className={className}
      variants={charGroupVariants(reduceMotion)}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {parts.map((part, index) => (
        <motion.span
          key={`${index}-${part}`}
          variants={charVariants(reduceMotion)}
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

export default function MegaMenuContent({ link }) {
  const reduceMotion = useReducedMotion()

  if (!link) return null

  return (
    <motion.div
      className="app-navbar__mega-content"
      variants={blockVariants(reduceMotion)}
      initial="hidden"
      animate="visible"
    >
      <div className="app-navbar__mega-intro">
        <motion.p className="app-navbar__mega-label" variants={lineVariants(reduceMotion)}>
          <span className="sr-only">{link.label}</span>
          <RevealChars text={link.label} reduceMotion={reduceMotion} />
        </motion.p>
        <motion.p className="app-navbar__mega-desc" variants={lineVariants(reduceMotion)}>
          <span className="sr-only">{link.description}</span>
          <RevealWords text={link.description} reduceMotion={reduceMotion} />
        </motion.p>
      </div>

      <motion.ul
        className="app-navbar__mega-links"
        variants={listVariants(reduceMotion)}
      >
        {link.items.map((item) => (
          <motion.li key={item.label} variants={lineVariants(reduceMotion)}>
            <a href={item.href} className="app-navbar__mega-link">
              <span>{item.label}</span>
              <span className="app-navbar__mega-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
