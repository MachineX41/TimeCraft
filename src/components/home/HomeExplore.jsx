import { motion, useReducedMotion } from 'motion/react'
import { revealBlock, revealLine } from '../ui/RevealMotion'

const LINKS = [
  { href: '#hakkimizda', label: 'Hakkında' },
  { href: '#nasil-calisir', label: 'Nasıl çalışır' },
  { href: '#ozellikler', label: 'Özellikler' },
  { href: '#sss', label: 'SSS' },
]

export default function HomeExplore() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.nav
      id="kesfet"
      className="home-explore"
      aria-label="Sayfa bölümleri"
      variants={revealBlock(reduceMotion, 0.06, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.p className="home-explore__label" variants={revealLine(reduceMotion, 8, 4)}>
        Keşfet
      </motion.p>
      <motion.ul className="home-explore__list" variants={revealBlock(reduceMotion, 0.05, 0.08)}>
        {LINKS.map((link) => (
          <motion.li key={link.href} variants={revealLine(reduceMotion, 8, 4)}>
            <a href={link.href} className="home-explore__link">
              {link.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  )
}
