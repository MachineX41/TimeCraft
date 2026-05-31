import { Link } from 'react-router-dom'
import { handleCtaPointerEnter, handleCtaPointerLeave } from '../../utils/ctaButton'

const pointerHandlers = {
  onPointerEnter: handleCtaPointerEnter,
  onPointerLeave: handleCtaPointerLeave,
}

export default function CtaButton({ to, href, label, className = '', ...props }) {
  const classes = ['app-navbar__cta', className].filter(Boolean).join(' ')
  const inner = (
    <span className="app-navbar__cta-inner">
      <span className="app-navbar__cta-label">{label}</span>
    </span>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...pointerHandlers} {...props}>
        {inner}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} {...pointerHandlers} {...props}>
      {inner}
    </a>
  )
}
