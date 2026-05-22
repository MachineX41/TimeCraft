import { useEffect, useState } from 'react'
import { PROJECT_STATUSES } from '../interfaces/projectSchema'
import RimPanel from './RimPanel'

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
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="drawer-scroll space-y-10 px-8 py-8">
        <div>
          <label htmlFor="clientName" className="text-overline mb-2 block">
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
            className="field"
          />
        </div>

        <div>
          <label htmlFor="projectTitle" className="text-overline mb-2 block">
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
            className="field"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label htmlFor="hourlyRate" className="text-overline mb-2 block">
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
              className="field"
            />
          </div>
          <div>
            <label htmlFor="hoursWorked" className="text-overline mb-2 block">
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
              className="field"
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="text-overline mb-2 block">
            Durum
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="field-select"
          >
            {PROJECT_STATUSES.map((status) => (
              <option key={status} value={status} className="bg-[#0A0A0A]">
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="shrink-0 flex gap-3 border-t border-white/[0.06] px-8 py-6">
        <button type="button" onClick={onClose} className="btn-ghost flex-1">
          İptal
        </button>
        <button type="submit" className="btn-primary flex-1">
          {isEditing ? 'Kaydet' : 'Oluştur'}
        </button>
      </div>
    </form>
  )
}

export default function ProjectDrawer({ isOpen, project, onClose, onSave }) {
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
    <div className={`drawer-root fixed inset-0 z-[70] ${isOpen ? 'drawer-root--open' : ''}`}>
      <button type="button" className="drawer-backdrop" onClick={onClose} aria-label="Kapat" />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`drawer-panel ${isOpen ? 'drawer-panel--open' : ''}`}
      >
        <RimPanel variant="drawer" className="h-full" innerClassName="flex min-h-full flex-col">
          <header className="shrink-0 border-b border-white/[0.06] px-8 py-8">
            <button
              type="button"
              onClick={onClose}
              className="btn-text mb-6"
              aria-label="Kapat"
            >
              Kapat
            </button>
            <p className="text-overline mb-2">{isEditing ? 'Düzenle' : 'Yeni kayıt'}</p>
            <h2 id="drawer-title" className="text-2xl font-medium tracking-tight text-white">
              {isEditing ? project?.projectTitle || 'Proje' : 'Proje ekle'}
            </h2>
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
