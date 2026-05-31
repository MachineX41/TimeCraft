import { motion, useReducedMotion } from 'motion/react'
import { revealBlock } from '../ui/RevealMotion'

export default function HomeReveal({
  children,
  className = '',
  as: Tag = motion.section,
  amount = 0.15,
  delay = 0.04,
  ...props
}) {
  const reduceMotion = useReducedMotion()

  return (
    <Tag
      className={className}
      variants={revealBlock(reduceMotion, 0.06, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...props}
    >
      {children}
    </Tag>
  )
}
