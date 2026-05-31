import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  RevealChars,
  RevealWords,
  revealBlock,
  revealLine,
} from '../ui/RevealMotion'

const LEAD =
  'Proje, mesai ve ücret takibini tek bir çalışma alanında birleştirin.'

const TAGS = ['Tek panel', 'Canlı metrikler', 'Şeffaf rapor']

export default function HomeHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="home-hero-section" aria-label="Ana sayfa başlığı">
      <div className="x-page-header__media" aria-hidden="true">
        <div className="x-page-header__bg home-hero-section__bg" />
        <div className="home-hero-section__overlay" />
      </div>

      <motion.header
        className="home-hero"
        variants={revealBlock(reduceMotion, 0.09, 0.05)}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="home-hero__overline" variants={revealLine(reduceMotion)}>
          <span className="home-hero__overline-dot" aria-hidden="true" />
          <span className="sr-only">Freelancer platformu</span>
          <RevealWords text="Freelancer platformu" reduceMotion={reduceMotion} />
        </motion.p>

        <motion.h1 className="home-hero__title" variants={revealLine(reduceMotion, 12, 10)}>
          <span className="sr-only">Zamanınızı craft edin.</span>
          <RevealChars text="Zamanınızı craft edin." reduceMotion={reduceMotion} />
        </motion.h1>

        <motion.p className="home-hero__lead" variants={revealLine(reduceMotion)}>
          <span className="sr-only">{LEAD}</span>
          <RevealWords text={LEAD} reduceMotion={reduceMotion} />
        </motion.p>

        <motion.div className="home-hero__actions" variants={revealLine(reduceMotion, 14, 6)}>
          <Link to="/dashboard" className="home-pill home-pill--primary">
            Dashboard&apos;a git
          </Link>
          <a href="#hakkimizda" className="home-pill home-pill--ghost">
            Hakkında
          </a>
        </motion.div>

        <motion.ul
          className="home-hero__tags"
          aria-label="Öne çıkan özellikler"
          variants={revealLine(reduceMotion, 10, 4)}
        >
          {TAGS.map((tag) => (
            <li key={tag}>
              <span className="home-hero__tag">{tag}</span>
            </li>
          ))}
        </motion.ul>
      </motion.header>
    </section>
  )
}
