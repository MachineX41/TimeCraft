import { useState } from 'react'
import { PROJECT_STATUSES } from '../interfaces/projectSchema'

const inputClass =
  'w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-indigo-500/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-indigo-500/30'

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
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 id="modal-title" className="text-base font-semibold text-zinc-50">
            {isEditing ? 'Projeyi düzenle' : 'Yeni proje'}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {isEditing ? 'Durum ve mesai güncellemesi' : 'Freelance iş kaydı'}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
          aria-label="Kapat"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clientName" className="mb-1.5 block text-xs font-medium text-zinc-400">
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
          <label htmlFor="projectTitle" className="mb-1.5 block text-xs font-medium text-zinc-400">
            Proje
          </label>
          <input
            id="projectTitle"
            name="projectTitle"
            type="text"
            required
            value={form.projectTitle}
            onChange={handleChange}
            placeholder="Kurumsal web sitesi"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hourlyRate" className="mb-1.5 block text-xs font-medium text-zinc-400">
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
            <label htmlFor="hoursWorked" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Saat
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
          <label htmlFor="status" className="mb-1.5 block text-xs font-medium text-zinc-400">
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

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-200"
          >
            İptal
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
          >
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Kapat"
      />

      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-zinc-900 p-6 shadow-2xl shadow-black/50">
        <ProjectModalForm
          key={project?.id ?? 'new'}
          project={project}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  )
}
