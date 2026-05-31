import { motion, useReducedMotion } from 'motion/react'
import {
  RevealChars,
  RevealWords,
  revealBlock,
  revealLine,
  revealList,
} from '../ui/RevealMotion'

const STEPS = [
  {
    id: 'add',
    step: '01',
    title: 'Proje ekle',
    description: 'İş adı, saatlik ücret ve durumu girin; kayıt saniyeler içinde hazır.',
  },
  {
    id: 'track',
    step: '02',
    title: 'Mesai & ücret',
    description: 'Çalışma saatlerini güncelleyin; hak edilen tutar otomatik hesaplanır.',
  },
  {
    id: 'insight',
    step: '03',
    title: 'Metrikleri izle',
    description: 'Dashboard üzerinden KPI, filtreler ve proje listesiyle net görünürlük.',
  },
]

export default function HomeHowItWorks() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className="home-section home-flow"
      aria-label="Nasıl çalışır"
      variants={revealBlock(reduceMotion, 0.08, 0.04)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.header className="home-section__header" variants={revealBlock(reduceMotion, 0.07, 0)}>
        <motion.p className="home-section__eyebrow" variants={revealLine(reduceMotion)}>
          Nasıl çalışır
        </motion.p>
        <motion.h2 className="home-section__title" variants={revealLine(reduceMotion, 10, 8)}>
          <span className="sr-only">Üç adımda başlayın</span>
          <RevealChars text="Üç adımda başlayın" reduceMotion={reduceMotion} />
        </motion.h2>
        <motion.p className="home-section__lead home-section__lead--narrow" variants={revealLine(reduceMotion)}>
          <span className="sr-only">Kurulum yok, karmaşık entegrasyon yok — doğrudan çalışmaya başlayın.</span>
          <RevealWords
            text="Kurulum yok, karmaşık entegrasyon yok — doğrudan çalışmaya başlayın."
            reduceMotion={reduceMotion}
          />
        </motion.p>
      </motion.header>

      <motion.ol className="home-flow__steps" variants={revealList(reduceMotion, 0.08, 0.05)}>
        {STEPS.map((item) => (
          <motion.li key={item.id} className="home-flow__step" variants={revealLine(reduceMotion, 12, 6)}>
            <span className="home-flow__step-num">{item.step}</span>
            <h3 className="home-flow__step-title">{item.title}</h3>
            <p className="home-flow__step-desc">{item.description}</p>
          </motion.li>
        ))}
      </motion.ol>
    </motion.section>
  )
}
