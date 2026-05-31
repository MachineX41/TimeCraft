import { motion, useReducedMotion } from 'motion/react'
import HomeReveal from './HomeReveal'
import { revealBlock, revealLine, revealList } from '../ui/RevealMotion'

const FEATURES = [
  {
    id: 'projects',
    title: 'Proje yönetimi',
    description: 'Tüm işlerinizi tek listede tutun; durum, ücret ve mesai tek bakışta.',
  },
  {
    id: 'time',
    title: 'Zaman takibi',
    description: 'Saat bazlı çalışmalarınızı kaydedin, toplam mesaiyi anında görün.',
  },
  {
    id: 'earnings',
    title: 'Ücret hesaplama',
    description: 'Saatlik ücret ve mesai otomatik birleşir; hak edilen tutar net çıkar.',
  },
  {
    id: 'filters',
    title: 'Akıllı filtreler',
    description: 'Durum, arama ve sekmelerle kayıtlar arasında saniyeler içinde gezinin.',
  },
]

export default function HomeFeatures() {
  const reduceMotion = useReducedMotion()

  return (
    <HomeReveal id="ozellikler" className="home-section home-features" aria-label="Özellikler">
      <motion.header
        className="home-section__header home-features__intro"
        variants={revealBlock(reduceMotion, 0.07, 0)}
      >
        <motion.p className="home-section__eyebrow" variants={revealLine(reduceMotion)}>
          Özellikler
        </motion.p>
        <motion.h2 className="home-section__title" variants={revealLine(reduceMotion, 10, 8)}>
          Neden TimeCraft?
        </motion.h2>
        <motion.p className="home-section__lead" variants={revealLine(reduceMotion)}>
          Net, hızlı ve odaklı bir çalışma alanı.
        </motion.p>
      </motion.header>

      <motion.ul className="home-features-list" variants={revealList(reduceMotion, 0.07, 0.04)}>
        {FEATURES.map((feature, index) => (
          <motion.li
            key={feature.id}
            className="home-features-item"
            variants={revealLine(reduceMotion, 10, 6)}
          >
            <span className="home-features-item__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="home-features-item__body">
              <h3 className="home-features-item__title">{feature.title}</h3>
              <p className="home-features-item__desc">{feature.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </HomeReveal>
  )
}
