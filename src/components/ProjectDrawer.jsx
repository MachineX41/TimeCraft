import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  DRAWER_DETAIL_STAT_GLOW,
  DRAWER_FIELD_BORDER_GLOW,
} from '../constants/workspaceBorderGlow'
import { PROJECT_STATUSES } from '../interfaces/projectSchema'
import { handleCtaPointerEnter, handleCtaPointerLeave } from '../utils/ctaButton'
import {
  calculateProjectEarnings,
  formatCurrency,
} from '../utils/projectStats'
import BorderGlow from './BorderGlow'
import StatusBadge from './StatusBadge'
import ColourfulText from './ui/ColourfulText'

const DRAWER_TABS = [
  { id: 'detail', label: 'Detay' },
  { id: 'edit', label: 'Düzenle' },
]

const filterPillSpring = { type: 'spring', stiffness: 480, damping: 38, mass: 0.7 }

function formatDate(iso) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

function DrawerFieldGlow({ children }) {
  return (
    <BorderGlow {...DRAWER_FIELD_BORDER_GLOW} className="drawer-field-glow">
      {children}
    </BorderGlow>
  )
}

const FORM_EXIT_MS = 300
const COLLAPSE_MS = 420

function emptyForm() {
  return {
    clientName: '',
    projectTitle: '',
    about: '',
    hourlyRate: '',
    hoursWorked: '',
    status: 'Beklemede',
  }
}

function DrawerTabs({ active, onChange }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="workspace-filter-bar workspace-filter-bar--drawer">
      <div className="workspace-filter-bar__row">
        <div
          className="workspace-filter-bar__track"
          role="tablist"
          aria-label="Proje görünümü"
        >
          <span className="workspace-filter-bar__rim" aria-hidden="true" />
          {DRAWER_TABS.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(tab.id)}
                className={`workspace-filter-bar__tab${isActive ? ' workspace-filter-bar__tab--active' : ''}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="drawer-view-pill"
                    className="workspace-filter-bar__pill"
                    transition={reduceMotion ? { duration: 0 } : filterPillSpring}
                    aria-hidden="true"
                  />
                )}
                <span className="workspace-filter-bar__label">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ProjectDrawerDetail({ project, onClose, onEdit, onRequestDelete, isBusy }) {
  const earnings = calculateProjectEarnings(project)
  const aboutText = project.about?.trim()

  return (
    <div className="drawer-detail">
      <div className="drawer-scroll drawer-body drawer-body--detail">
        <section
          className="drawer-detail__section drawer-detail__section--lead"
          aria-label="Proje özeti ve bilgiler"
        >
          <BorderGlow {...DRAWER_DETAIL_STAT_GLOW} className="drawer-detail-card">
            <div className="drawer-detail-card__inner">
              <div className="drawer-detail-card__metrics">
                <div className="drawer-detail-metric">
                  <span className="drawer-detail-metric__value tabular-nums">
                    {formatCurrency(project.hourlyRate)}
                  </span>
                  <span className="drawer-detail-metric__label">Saatlik ücret</span>
                </div>
                <div className="drawer-detail-metric">
                  <span className="drawer-detail-metric__value tabular-nums">
                    {project.hoursWorked} sa
                  </span>
                  <span className="drawer-detail-metric__label">Mesai</span>
                </div>
                <div className="drawer-detail-metric drawer-detail-metric--wide">
                  <span className="drawer-detail-metric__value drawer-detail-metric__value--accent tabular-nums">
                    {formatCurrency(earnings)}
                  </span>
                  <span className="drawer-detail-metric__label">Toplam kazanç</span>
                </div>
              </div>

              <div className="drawer-detail-card__divider" aria-hidden="true" />

              <dl className="drawer-detail-card__meta">
                <div className="drawer-detail-card__row">
                  <dt>Durum</dt>
                  <dd>
                    <StatusBadge status={project.status} />
                  </dd>
                </div>
                <div className="drawer-detail-card__row">
                  <dt>Müşteri</dt>
                  <dd>{project.clientName}</dd>
                </div>
                <div className="drawer-detail-card__row">
                  <dt>Oluşturulma</dt>
                  <dd>{formatDate(project.createdAt)}</dd>
                </div>
              </dl>
            </div>
          </BorderGlow>
        </section>

        <section
          className="drawer-detail__section drawer-detail__section--about"
          aria-label="Proje hakkında"
        >
          <h4 className="drawer-detail__section-title">Hakkında</h4>
          <div className="drawer-detail-prose">
            {aboutText ? (
              <p className="drawer-detail-prose__body">{aboutText}</p>
            ) : (
              <p className="drawer-detail-prose__placeholder">
                Bu proje için henüz bir açıklama eklenmemiş. Düzenle sekmesinden
                kapsam ve notlarınızı yazabilirsiniz.
              </p>
            )}
          </div>
        </section>
      </div>

      <footer className="drawer-footer">
        <button
          type="button"
          onClick={onClose}
          disabled={isBusy}
          className="btn-ghost flex-1"
        >
          İptal
        </button>
        <button
          type="button"
          onClick={() => onRequestDelete(project.id)}
          disabled={isBusy}
          className="btn-ghost drawer-detail__danger flex-1"
        >
          Sil
        </button>
        <button
          type="button"
          onClick={onEdit}
          disabled={isBusy}
          className="app-navbar__cta drawer-footer__cta flex-1"
          onPointerEnter={isBusy ? undefined : handleCtaPointerEnter}
          onPointerLeave={isBusy ? undefined : handleCtaPointerLeave}
        >
          <span className="app-navbar__cta-inner">
            <span className="app-navbar__cta-label">Düzenle</span>
          </span>
        </button>
      </footer>
    </div>
  )
}

function projectToForm(project) {
  if (!project) {
    return emptyForm()
  }
  return {
    clientName: project.clientName,
    projectTitle: project.projectTitle,
    about: project.about ?? '',
    hourlyRate: String(project.hourlyRate),
    hoursWorked: String(project.hoursWorked),
    status: project.status,
  }
}

function ProjectDrawerForm({ project, onClose, onSave, savePhase }) {
  const [form, setForm] = useState(() => projectToForm(project))
  const isEditing = Boolean(project)
  const isBusy = savePhase !== 'idle'
  const isExiting = savePhase === 'exiting' || savePhase === 'collapsing'
  const showSaved = savePhase === 'exiting' || savePhase === 'collapsing'

  useEffect(() => {
    setForm(projectToForm(project))
  }, [project])

  useEffect(() => {
    if (savePhase === 'exiting' && !isEditing) {
      setForm(emptyForm())
    }
  }, [savePhase, isEditing])

  function handleChange(e) {
    if (isBusy) return
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (isBusy) return
    onSave({
      clientName: form.clientName.trim(),
      projectTitle: form.projectTitle.trim(),
      about: form.about.trim(),
      hourlyRate: Number(form.hourlyRate) || 0,
      hoursWorked: Number(form.hoursWorked) || 0,
      status: form.status,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`drawer-form${isExiting ? ' drawer-form--exiting' : ''}`}
    >
      <div className="drawer-scroll drawer-body">
        <section className="drawer-section">
          <div className="drawer-field">
            <label htmlFor="clientName" className="drawer-label">
              Müşteri
            </label>
            <DrawerFieldGlow>
              <input
                id="clientName"
                name="clientName"
                type="text"
                required
                value={form.clientName}
                onChange={handleChange}
                placeholder="Şirket veya kişi adı"
                className="drawer-input"
              />
            </DrawerFieldGlow>
          </div>

          <div className="drawer-field">
            <label htmlFor="projectTitle" className="drawer-label">
              Proje
            </label>
            <DrawerFieldGlow>
              <input
                id="projectTitle"
                name="projectTitle"
                type="text"
                required
                value={form.projectTitle}
                onChange={handleChange}
                placeholder="Proje adı"
                className="drawer-input"
              />
            </DrawerFieldGlow>
          </div>

          <div className="drawer-field">
            <label htmlFor="about" className="drawer-label">
              Proje hakkında
            </label>
            <DrawerFieldGlow>
              <textarea
                id="about"
                name="about"
                rows={4}
                value={form.about}
                onChange={handleChange}
                placeholder="Kapsam, notlar veya önemli detaylar…"
                className="drawer-input drawer-textarea"
              />
            </DrawerFieldGlow>
          </div>
        </section>

        <section className="drawer-section">
          <div className="drawer-field-grid">
            <div className="drawer-field">
              <label htmlFor="hourlyRate" className="drawer-label">
                Saatlik ücret
              </label>
              <DrawerFieldGlow>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={form.hourlyRate}
                  onChange={handleChange}
                  className="drawer-input"
                  placeholder="0"
                />
              </DrawerFieldGlow>
            </div>
            <div className="drawer-field">
              <label htmlFor="hoursWorked" className="drawer-label">
                Mesai (saat)
              </label>
              <DrawerFieldGlow>
                <input
                  id="hoursWorked"
                  name="hoursWorked"
                  type="number"
                  min="0"
                  step="0.5"
                  required
                  value={form.hoursWorked}
                  onChange={handleChange}
                  className="drawer-input"
                  placeholder="0"
                />
              </DrawerFieldGlow>
            </div>
          </div>
        </section>

        <section className="drawer-section">
          <div className="drawer-field">
            <label htmlFor="status" className="drawer-label">
              Durum
            </label>
            <DrawerFieldGlow>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="drawer-input drawer-select"
              >
                {PROJECT_STATUSES.map((status) => (
                  <option key={status} value={status} className="bg-[#030305]">
                    {status}
                  </option>
                ))}
              </select>
            </DrawerFieldGlow>
          </div>
        </section>
      </div>

      <footer className="drawer-footer">
        <button
          type="button"
          onClick={onClose}
          disabled={isBusy}
          className="btn-ghost flex-1"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isBusy}
          className={`app-navbar__cta drawer-footer__cta${showSaved ? ' drawer-footer__cta--saved' : ''}`}
          onPointerEnter={isBusy ? undefined : handleCtaPointerEnter}
          onPointerLeave={isBusy ? undefined : handleCtaPointerLeave}
        >
          <span className="app-navbar__cta-inner">
            {showSaved ? (
              <>
                <span className="drawer-footer__check" aria-hidden="true">
                  ✓
                </span>
                {isEditing ? 'Kaydedildi' : 'Oluşturuldu'}
              </>
            ) : isEditing ? (
              'Kaydet'
            ) : (
              'Oluştur'
            )}
          </span>
        </button>
      </footer>
    </form>
  )
}

export default function ProjectDrawer({
  isOpen,
  mode,
  project,
  onModeChange,
  onOpen,
  onClose,
  onSave,
  onRequestDelete,
}) {
  const isCreate = mode === 'create'
  const isDetail = mode === 'detail'
  const showTabs = !isCreate && Boolean(project)
  const [forceCollapsed, setForceCollapsed] = useState(false)
  const [savePhase, setSavePhase] = useState('idle')
  const [formKey, setFormKey] = useState(0)
  const saveTimersRef = useRef([])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setForceCollapsed(false)
      setSavePhase('idle')
    } else {
      setFormKey((k) => k + 1)
      setForceCollapsed(false)
      setSavePhase('idle')
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      saveTimersRef.current.forEach(clearTimeout)
      saveTimersRef.current = []
    }
  }, [])

  function clearTimers() {
    saveTimersRef.current.forEach(clearTimeout)
    saveTimersRef.current = []
  }

  function schedule(fn, delay) {
    const id = window.setTimeout(fn, delay)
    saveTimersRef.current.push(id)
    return id
  }

  function collapseThenClose() {
    setForceCollapsed(true)
    setSavePhase('collapsing')

    schedule(() => {
      clearTimers()
      setSavePhase('idle')
      setForceCollapsed(false)
      onClose()
    }, COLLAPSE_MS)
  }

  function handleClose() {
    if (savePhase !== 'idle') return
    clearTimers()
    collapseThenClose()
  }

  function handleSave(formData) {
    if (savePhase !== 'idle') return
    setSavePhase('exiting')

    schedule(() => {
      onSave(formData)
      collapseThenClose()
    }, FORM_EXIT_MS)
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && isOpen && savePhase === 'idle') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, savePhase])

  function handleMouseLeave() {
    if (forceCollapsed) setForceCollapsed(false)
  }

  const isCollapsing = savePhase === 'collapsing' || forceCollapsed
  const panelClassName = [
    'drawer-panel',
    isOpen && savePhase !== 'collapsing' ? 'drawer-panel--open' : '',
    isCollapsing ? 'drawer-panel--force-collapsed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return createPortal(
    <div
      className={`drawer-root${isOpen ? ' drawer-root--open' : ''}${savePhase === 'collapsing' ? ' drawer-root--closing' : ''}`}
    >
      <button
        type="button"
        className="drawer-backdrop"
        onClick={handleClose}
        aria-label="Kapat"
        tabIndex={isOpen ? 0 : -1}
      />

      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-labelledby="drawer-title"
        className={panelClassName}
        onMouseLeave={handleMouseLeave}
      >
        <span className="drawer-panel__handle" aria-hidden="true" />
        <span className="drawer-panel__texture" aria-hidden="true" />

        <button
          type="button"
          className="drawer-rail"
          aria-label="Yeni proje ekle"
          onClick={onOpen}
        >
          <span className="drawer-rail__label">
            <ColourfulText text="Yeni proje ekle" />
          </span>
        </button>

        <div className="drawer-panel__body">
          <header className="drawer-header">
            <div className="drawer-header__row">
              <h2 id="drawer-title" className="drawer-title">
                {isCreate ? 'Yeni proje' : project?.projectTitle || 'Proje'}
              </h2>
            </div>
            {showTabs && (
              <DrawerTabs
                active={isDetail ? 'detail' : 'edit'}
                onChange={onModeChange}
              />
            )}
          </header>

          {isDetail && project ? (
            <ProjectDrawerDetail
              key={`detail-${project.id}-${formKey}`}
              project={project}
              onClose={handleClose}
              onEdit={() => onModeChange('edit')}
              onRequestDelete={onRequestDelete}
              isBusy={savePhase !== 'idle'}
            />
          ) : (
            <ProjectDrawerForm
              key={`${project?.id ?? 'new'}-${formKey}`}
              project={isCreate ? null : project}
              onClose={handleClose}
              onSave={handleSave}
              savePhase={savePhase}
            />
          )}
        </div>
      </aside>
    </div>,
    document.body,
  )
}
