import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import HomeReveal from './HomeReveal'
import { revealBlock, revealLine, revealList } from '../ui/RevealMotion'

const FAQ = [
  {
    id: 'what',
    question: 'TimeCraft kimler için?',
    answer:
      'Freelancer ve bağımsız çalışanlar için tasarlandı. Proje, mesai ve ücret takibini tek panelde birleştirir.',
  },
  {
    id: 'start',
    question: 'Nasıl başlarım?',
    answer:
      'Dashboard\'a geçin, yeni proje ekleyin, saatlik ücret ve mesai girin. Metrikler anında güncellenir.',
  },
  {
    id: 'data',
    question: 'Verilerim nerede saklanır?',
    answer:
      'Projeleriniz tarayıcınızda yerel olarak saklanır. Hızlı erişim için otomatik kayıt yapılır.',
  },
  {
    id: 'free',
    question: 'Ücretli mi?',
    answer:
      'TimeCraft şu an tamamen ücretsiz kullanılabilir. Çalışma alanına geçip hemen deneyebilirsiniz.',
  },
]

export default function HomeFaq() {
  const reduceMotion = useReducedMotion()
  const [openId, setOpenId] = useState(FAQ[0].id)

  return (
    <HomeReveal id="sss" className="home-section home-faq" aria-label="Sık sorulan sorular">
      <motion.header className="home-section__header" variants={revealBlock(reduceMotion, 0.07, 0)}>
        <motion.p className="home-section__eyebrow" variants={revealLine(reduceMotion)}>
          SSS
        </motion.p>
        <motion.h2 className="home-section__title" variants={revealLine(reduceMotion, 10, 8)}>
          Merak edilenler
        </motion.h2>
        <motion.p
          className="home-section__lead home-section__lead--narrow"
          variants={revealLine(reduceMotion)}
        >
          Kısa cevaplar, net yönlendirme.
        </motion.p>
      </motion.header>

      <motion.div className="home-faq__list" variants={revealList(reduceMotion, 0.06, 0.04)}>
        {FAQ.map((item) => {
          const isOpen = openId === item.id

          return (
            <motion.div key={item.id} className="home-faq__item" variants={revealLine(reduceMotion, 8, 4)}>
              <button
                type="button"
                className={`home-faq__trigger${isOpen ? ' home-faq__trigger--open' : ''}`}
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? '' : item.id)}
              >
                <span>{item.question}</span>
                <span className="home-faq__icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    className="home-faq__panel"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="home-faq__answer">{item.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </HomeReveal>
  )
}
