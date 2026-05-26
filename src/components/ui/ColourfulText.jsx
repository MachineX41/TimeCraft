import { motion } from 'motion/react'

export default function ColourfulText({ text, className = '' }) {
  return (
    <span className={`colourful-text ${className}`.trim()}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          animate={{
            color: ['#ffffff', 'rgb(255 255 255 / 0.72)', '#ffffff'],
            scale: [1, 1.04, 1],
            filter: ['blur(0px)', 'blur(1.5px)', 'blur(0px)'],
          }}
          transition={{
            duration: 0.55,
            delay: index * 0.04,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 4,
          }}
          className="colourful-text__char"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}
