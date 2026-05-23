import { useEffect, useState } from 'react'
import { PROJECT_STATUSES } from '../interfaces/projectSchema'
import { handleCtaPointerEnter, handleCtaPointerLeave } from '../utils/ctaButton'
import RimPanel from './RimPanel'

const DRAWER_CLOSE_MS = 680

function projectToForm(project) {
  if (!project) {
    return {
      clientName: '',
      projectTitle: '',
      hourlyRate: '',
      hoursWorked: '',
      status: 'Beklemede',
    }
  }
  return {
    clientName: project.clientName,
    projectTitle: project.projectTitle,
    hourlyRate: String(project.hourlyRate),
    hoursWorked: String(project.hoursWorked),
    status: project.status,
  }
}

function ProjectDrawerForm({ project, onClose, onSave }) {
  const [form, setForm] = useState(() => projectToForm(project))
  const isEditing = Boolean(project)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      clientName: form.clientName.trim(),
      projectTitle: form.projectTitle.trim(),
      hourlyRate: Number(form.hourlyRate) || 0,
      hoursWorked: Number(form.hoursWorked) || 0,
      status: form.status,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="drawer-form">
      <div className="drawer-scroll drawer-body">
        <section className="drawer-section drawer-surface">
          <div className="drawer-field">
            <label htmlFor="clientName" className="drawer-label">
              Müşteri
            </label>
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

          <div className="drawer-field">
            <label htmlFor="projectTitle" className="drawer-label">
              Proje
            </label>
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
        </section>

        <section className="drawer-section drawer-surface">
          <p className="drawer-section-title">Ücret ve süre</p>
          <div className="drawer-field-grid">
            <div className="drawer-field">
              <label htmlFor="hourlyRate" className="drawer-label">
                Saatlik ücret
              </label>
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
            <div className="drawer-field">
              <label htmlFor="hoursWorked" className="drawer-label">
                Mesai (saat)
              </label>
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
        </section>

        <section className="drawer-section drawer-surface">
          <div className="drawer-field">
            <label htmlFor="status" className="drawer-label">
              Durum
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="drawer-input drawer-select"
            >
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status} className="bg-[#0A0A0A]">
                  {status}
                </option>
              ))}
            </select>
          </div>
        </section>
      </div>

      <footer className="drawer-footer">
        <button type="button" onClick={onClose} className="drawer-btn drawer-btn--ghost">
          İptal
        </button>
        <button
          type="submit"
          className="app-navbar__cta drawer-footer__cta"
          onPointerEnter={handleCtaPointerEnter}
          onPointerLeave={handleCtaPointerLeave}
        >
          <span className="app-navbar__cta-inner">
            {isEditing ? 'Kaydet' : 'Oluştur'}
          </span>
        </button>
      </footer>
    </form>
  )
}

export default function ProjectDrawer({ isOpen, project, onClose, onSave }) {
  const isEditing = Boolean(project)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(frame)
    }

    setVisible(false)
    const timer = window.setTimeout(() => setMounted(false), DRAWER_CLOSE_MS)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = mounted ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mounted, visible])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && visible) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [visible, onClose])

  if (!mounted) return null

  return (
    <div
      className={`drawer-root drawer-root--mounted ${visible ? 'drawer-root--open' : ''}`}
      aria-hidden={!visible}
    >
      <button type="button" className="drawer-backdrop" onClick={onClose} aria-label="Kapat" />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`drawer-panel ${visible ? 'drawer-panel--open' : ''}`}
      >
        <RimPanel variant="drawer" className="drawer-panel__rim h-full" innerClassName="drawer-panel__inner">
          <header className="drawer-header">
            <div className="drawer-header__row">
              <span className="drawer-badge">{isEditing ? 'Düzenleme' : 'Yeni'}</span>
              <button
                type="button"
                onClick={onClose}
                className="drawer-close"
                aria-label="Kapat"
              >
                <span aria-hidden>×</span>
              </button>
            </div>
            <p className="drawer-eyebrow">{isEditing ? 'Proje kaydı' : 'Yeni kayıt'}</p>
            <h2 id="drawer-title" className="drawer-title">
              {isEditing ? project?.projectTitle || 'Proje' : 'Proje ekle'}
            </h2>
            <p className="drawer-caption">
              {isEditing
                ? 'Alanları güncelleyip kaydedin.'
                : 'Temel bilgileri doldurarak projeyi oluşturun.'}
            </p>
          </header>

          <ProjectDrawerForm
            key={project?.id ?? 'new'}
            project={project}
            onClose={onClose}
            onSave={onSave}
          />
        </RimPanel>
      </aside>
    </div>
  )
}
