import { useState } from 'react'
import { PROJECT_STATUSES } from '../interfaces/projectSchema'
import GlassPanel from './GlassPanel'

const inputClass =
  'w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 outline-none backdrop-blur-sm transition-colors placeholder:text-zinc-600 focus:border-violet-500/30 focus:ring-1 focus:ring-violet-500/20'

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

function ProjectModalForm({ project, onClose, onSave }) {
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
    <>
      <p className="section-label mb-2">
        {isEditing ? 'Projeyi Güncelle' : 'Yeni Proje'}
      </p>
      <h2 id="modal-title" className="mb-6 text-xl font-medium text-white">
        {isEditing ? form.projectTitle || 'Düzenleme' : 'Kayıt oluştur'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="clientName" className="section-label mb-2 block">
            Müşteri
          </label>
          <input
            id="clientName"
            name="clientName"
            type="text"
            required
            value={form.clientName}
            onChange={handleChange}
            placeholder="Nova Digital"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="projectTitle" className="section-label mb-2 block">
            Proje
          </label>
          <input
            id="projectTitle"
            name="projectTitle"
            type="text"
            required
            value={form.projectTitle}
            onChange={handleChange}
            placeholder="Kurumsal Web Sitesi"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hourlyRate" className="section-label mb-2 block">
              Saatlik (₺)
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
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="hoursWorked" className="section-label mb-2 block">
              Mesai (sa)
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
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="section-label mb-2 block">
            Durum
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            {PROJECT_STATUSES.map((status) => (
              <option key={status} value={status} className="bg-zinc-900">
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-zinc-700 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-300"
          >
            İptal
          </button>
          <button type="submit" className="btn-primary flex-1">
            {isEditing ? 'Kaydet' : 'Oluştur'}
          </button>
        </div>
      </form>
    </>
  )
}

export default function ProjectModal({ isOpen, project, onClose, onSave }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
        aria-label="Kapat"
      />

      <div className="relative w-full max-w-md">
        <GlassPanel innerClassName="p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 text-zinc-600 transition-colors hover:text-zinc-400"
            aria-label="Kapat"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ProjectModalForm
            key={project?.id ?? 'new'}
            project={project}
            onClose={onClose}
            onSave={onSave}
          />
        </GlassPanel>
      </div>
    </div>
  )
}
