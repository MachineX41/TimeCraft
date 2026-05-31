import { Link } from 'react-router-dom'
import { handleCtaPointerEnter, handleCtaPointerLeave } from '../../utils/ctaButton'

const pointerHandlers = {
  onPointerEnter: handleCtaPointerEnter,
  onPointerLeave: handleCtaPointerLeave,
}

export default function CtaButton({
  to,
  href,
  label,
  className = '',
  variant = 'default',
  ...props
}) {
  const variantClass = variant === 'static' ? 'app-navbar__cta--static' : ''
  const classes = ['app-navbar__cta', variantClass, className].filter(Boolean).join(' ')
  const inner = (
    <span className="app-navbar__cta-inner">
      <span className="app-navbar__cta-label">{label}</span>
    </span>
  )
  const handlers = variant === 'static' ? {} : pointerHandlers

  if (to) {
    return (
      <Link to={to} className={classes} {...handlers} {...props}>
        {inner}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} {...handlers} {...props}>
      {inner}
    </a>
  )
}
