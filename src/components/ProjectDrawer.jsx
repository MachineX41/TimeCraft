import { useEffect, useState } from 'react'
import { PROJECT_STATUSES } from '../interfaces/projectSchema'

const inputClass =
  'w-full rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 outline-none backdrop-blur-sm transition-colors placeholder:text-zinc-600 focus:border-violet-500/40 focus:bg-zinc-900/60 focus:ring-1 focus:ring-violet-500/25'

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
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
        <section>
          <p className="section-label mb-4">Genel bilgiler</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="clientName" className="mb-2 block text-xs text-zinc-500">
                Müşteri adı
              </label>
              <input
                id="clientName"
                name="clientName"
                type="text"
                required
                value={form.clientName}
                onChange={handleChange}
                placeholder="Örn. Nova Digital"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="projectTitle" className="mb-2 block text-xs text-zinc-500">
                Proje başlığı
              </label>
              <input
                id="projectTitle"
                name="projectTitle"
                type="text"
                required
                value={form.projectTitle}
                onChange={handleChange}
                placeholder="Örn. Kurumsal Web Sitesi"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-800/60 pt-6">
          <p className="section-label mb-4">Zaman & ücret</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="hourlyRate" className="mb-2 block text-xs text-zinc-500">
                Saatlik ücret (₺)
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
              <label htmlFor="hoursWorked" className="mb-2 block text-xs text-zinc-500">
                Çalışılan saat
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
        </section>

        <section className="border-t border-zinc-800/60 pt-6">
          <p className="section-label mb-4">Durum</p>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            {PROJECT_STATUSES.map((status) => (
              <option key={status} value={status} className="bg-zinc-950">
                {status}
              </option>
            ))}
          </select>
        </section>
      </div>

      <div className="drawer-footer shrink-0 border-t border-zinc-800/80 px-6 py-5">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-zinc-700/80 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase transition-colors hover:border-zinc-600 hover:text-zinc-300"
          >
            İptal
          </button>
          <button type="submit" className="btn-primary flex-1">
            {isEditing ? 'Kaydet' : 'Oluştur'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default function ProjectDrawer({ isOpen, project, onClose, onSave }) {
  const isEditing = Boolean(project)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
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
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role="presentation"
    >
      {/* blur backdrop */}
      <button
        type="button"
        aria-label="Paneli kapat"
        onClick={onClose}
        className={`drawer-backdrop absolute inset-0 transition-all duration-300 ${
          isOpen ? 'backdrop-blur-[12px] bg-black/50' : 'backdrop-blur-none bg-black/0'
        }`}
      />

      {/* sağ panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`drawer-panel absolute top-0 right-0 flex h-full w-full max-w-[420px] flex-col border-l border-zinc-800/50 bg-zinc-950/75 shadow-[-24px_0_80px_rgb(0_0_0/0.5)] backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* sol gradient rim */}
        <div
          className="pointer-events-none absolute top-0 left-0 h-full w-px bg-gradient-to-b from-violet-500/50 via-white/20 to-violet-500/30"
          aria-hidden
        />

        {/* header */}
        <header className="relative shrink-0 border-b border-zinc-800/80 px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 transition-colors hover:border-zinc-700 hover:bg-white/[0.04] hover:text-white"
            aria-label="Kapat"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="section-label mb-2 pr-12">
            {isEditing ? 'Proje düzenle' : 'Yeni proje'}
          </p>
          <h2 id="drawer-title" className="pr-12 text-xl font-medium text-white">
            {isEditing ? project?.projectTitle || 'Güncelleme' : 'Kayıt oluştur'}
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600">
            {isEditing
              ? 'Değişiklikler anında kaydedilir.'
              : 'Freelance işinizi panele ekleyin.'}
          </p>
        </header>

        <ProjectDrawerForm
          key={project?.id ?? 'new'}
          project={project}
          onClose={onClose}
          onSave={onSave}
        />
      </aside>
    </div>
  )
}
