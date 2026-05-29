import { useEffect, useRef, useState } from 'react'
import { PROJECT_STATUSES } from '../interfaces/projectSchema'
import { handleCtaPointerEnter, handleCtaPointerLeave } from '../utils/ctaButton'
import ColourfulText from './ui/ColourfulText'

const FORM_EXIT_MS = 300
const COLLAPSE_MS = 420

function emptyForm() {
  return {
    clientName: '',
    projectTitle: '',
    hourlyRate: '',
    hoursWorked: '',
    status: 'Beklemede',
  }
}

function projectToForm(project) {
  if (!project) {
    return emptyForm()
  }
  return {
    clientName: project.clientName,
    projectTitle: project.projectTitle,
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
            <div className="drawer-glass">
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
            </div>
          </div>

          <div className="drawer-field">
            <label htmlFor="projectTitle" className="drawer-label">
              Proje
            </label>
            <div className="drawer-glass">
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
            </div>
          </div>
        </section>

        <section className="drawer-section">
          <div className="drawer-field-grid">
            <div className="drawer-field">
              <label htmlFor="hourlyRate" className="drawer-label">
                Saatlik ücret
              </label>
              <div className="drawer-glass">
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
              </div>
            </div>
            <div className="drawer-field">
              <label htmlFor="hoursWorked" className="drawer-label">
                Mesai (saat)
              </label>
              <div className="drawer-glass">
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
              </div>
            </div>
          </div>
        </section>

        <section className="drawer-section">
          <div className="drawer-field">
            <label htmlFor="status" className="drawer-label">
              Durum
            </label>
            <div className="drawer-glass">
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
            </div>
          </div>
        </section>
      </div>

      <footer className="drawer-footer">
        <button
          type="button"
          onClick={onClose}
          disabled={isBusy}
          className="drawer-btn drawer-btn--ghost drawer-glass drawer-glass--pill"
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

export default function ProjectDrawer({ isOpen, project, onOpen, onClose, onSave }) {
  const isEditing = Boolean(project)
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

  return (
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
                {isEditing ? project?.projectTitle || 'Proje düzenle' : 'Yeni proje'}
              </h2>
            </div>
          </header>

          <ProjectDrawerForm
            key={`${project?.id ?? 'new'}-${formKey}`}
            project={project}
            onClose={handleClose}
            onSave={handleSave}
            savePhase={savePhase}
          />
        </div>
      </aside>
    </div>
  )
}
