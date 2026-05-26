import { useEffect, useState } from 'react'
import { PROJECT_STATUSES } from '../interfaces/projectSchema'
import { handleCtaPointerEnter, handleCtaPointerLeave } from '../utils/ctaButton'
import ColourfulText from './ui/ColourfulText'

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
          className="drawer-btn drawer-btn--ghost drawer-glass drawer-glass--pill"
        >
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

export default function ProjectDrawer({ isOpen, project, onOpen, onClose, onSave }) {
  const isEditing = Boolean(project)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <div className={`drawer-root ${isOpen ? 'drawer-root--open' : ''}`}>
      <button
        type="button"
        className="drawer-backdrop"
        onClick={onClose}
        aria-label="Kapat"
        tabIndex={isOpen ? 0 : -1}
      />

      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-labelledby="drawer-title"
        className={`drawer-panel ${isOpen ? 'drawer-panel--open' : ''}`}
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
              <button
                type="button"
                onClick={onClose}
                className="drawer-close"
                aria-label="Kapat"
              >
                <span aria-hidden>×</span>
              </button>
            </div>
          </header>

          <ProjectDrawerForm
            key={project?.id ?? 'new'}
            project={project}
            onClose={onClose}
            onSave={onSave}
          />
        </div>
      </aside>
    </div>
  )
}
