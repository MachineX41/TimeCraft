import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function ColourfulText({ text, className = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`colourful-text ${className}`.trim()}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{ color: '#054DEA', y: 0 }}
          animate={{
            color: '#ffffff',
            y: [0, -3, 0],
            scale: [1, 1.01, 1],
            filter: ['blur(0px)', 'blur(5px)', 'blur(0px)'],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          className="colourful-text__char"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}
