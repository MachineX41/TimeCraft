import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import BorderGlow from './BorderGlow'
import { WORKSPACE_BORDER_GLOW } from '../constants/workspaceBorderGlow'
import { handleCtaPointerEnter, handleCtaPointerLeave } from '../utils/ctaButton'
import { revealLine, revealTransition } from './ui/RevealMotion'

export default function DeleteConfirmModal({ project, onCancel, onConfirm }) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!project) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onCancel()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [project, onCancel])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="delete-modal-backdrop"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={revealTransition(reduceMotion, 0.28)}
          onClick={onCancel}
        >
          <motion.div
            className="delete-modal__stage"
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={revealTransition(reduceMotion, 0.36)}
            onClick={(event) => event.stopPropagation()}
          >
            <BorderGlow {...WORKSPACE_BORDER_GLOW} className="delete-modal-glow">
              <motion.div
                className="delete-modal__content"
                variants={revealLine(reduceMotion, 10, 6)}
                initial="hidden"
                animate="visible"
              >
                <h2 id="delete-modal-title" className="x-modal__title">
                  Projeyi sil
                </h2>
                <p className="x-modal__text">
                  <span className="text-white">{project.projectTitle}</span> kalıcı olarak
                  silinecek.
                </p>
                <div className="delete-modal__actions">
                  <button type="button" onClick={onCancel} className="btn-ghost flex-1">
                    Vazgeç
                  </button>
                  <button
                    type="button"
                    onClick={onConfirm}
                    className="app-navbar__cta delete-modal__cta flex-1"
                    aria-label="Projeyi sil"
                    onPointerEnter={handleCtaPointerEnter}
                    onPointerLeave={handleCtaPointerLeave}
                  >
                    <span className="app-navbar__cta-inner">
                      <span className="app-navbar__cta-label">Sil</span>
                    </span>
                  </button>
                </div>
              </motion.div>
            </BorderGlow>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
