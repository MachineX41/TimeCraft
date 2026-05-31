import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  RevealChars,
  RevealWords,
  revealBlock,
  revealLine,
  revealList,
} from './ui/RevealMotion'

export default function MegaMenuContent({ link }) {
  const reduceMotion = useReducedMotion()

  if (!link) return null

  return (
    <motion.div
      className="app-navbar__mega-content"
      variants={revealBlock(reduceMotion)}
      initial="hidden"
      animate="visible"
    >
      <div className="app-navbar__mega-intro">
        <div className="app-navbar__mega-title-wrap">
          <span className="app-navbar__mega-label-blur" aria-hidden="true">
            {link.label}
          </span>
          <motion.p className="app-navbar__mega-label" variants={revealLine(reduceMotion)}>
            <span className="sr-only">{link.label}</span>
            <RevealChars text={link.label} reduceMotion={reduceMotion} />
          </motion.p>
        </div>
        <motion.p className="app-navbar__mega-desc" variants={revealLine(reduceMotion)}>
          <span className="sr-only">{link.description}</span>
          <RevealWords text={link.description} reduceMotion={reduceMotion} />
        </motion.p>
      </div>

      <motion.ul
        className="app-navbar__mega-links"
        variants={revealList(reduceMotion)}
      >
        {link.items.map((item) => (
          <motion.li key={item.label} variants={revealLine(reduceMotion)}>
            {item.href.startsWith('/#') || item.href.startsWith('http') ? (
              <a href={item.href} className="app-navbar__mega-link">
                <span>{item.label}</span>
                <span className="app-navbar__mega-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <Link to={item.href} className="app-navbar__mega-link">
                <span>{item.label}</span>
                <span className="app-navbar__mega-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
