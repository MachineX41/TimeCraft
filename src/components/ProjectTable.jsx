import { useState } from 'react'
import StatusBadge from './StatusBadge'
import GlassPanel from './GlassPanel'
import { getAvatarColor, getInitials } from '../utils/avatar'
import {
  calculateProjectEarnings,
  formatCurrency,
} from '../utils/projectStats'

const FILTERS = [
  { id: 'all', label: 'Tümü' },
  { id: 'active', label: 'Aktif' },
  { id: 'done', label: 'Tamamlanan' },
]

function formatDate(iso) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

function filterProjects(projects, filter) {
  if (filter === 'active') {
    return projects.filter((p) => p.status === 'Devam Ediyor')
  }
  if (filter === 'done') {
    return projects.filter((p) => p.status === 'Tamamlandı')
  }
  return projects
}

export default function ProjectTable({ projects, onEdit, onDelete, onAddProject }) {
  const [filter, setFilter] = useState('all')
  const filtered = filterProjects(projects, filter)

  return (
    <GlassPanel innerClassName="flex min-h-[520px] flex-col p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="section-label">Projeler</p>
        <div className="segment-track">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`segment-item ${filter === f.id ? 'segment-item-active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-medium text-zinc-400">Kayıt bulunamadı</p>
          <p className="mt-2 text-xs text-zinc-600">Filtreyi değiştirin veya yeni proje ekleyin.</p>
          <button type="button" onClick={onAddProject} className="btn-primary mt-8">
            Yeni Proje
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-zinc-800/80">
                <th className="section-label pb-4 pr-4">Proje</th>
                <th className="section-label pb-4 pr-4">Ücret</th>
                <th className="section-label pb-4 pr-4">Mesai</th>
                <th className="section-label pb-4 pr-4">Kazanç</th>
                <th className="section-label pb-4 pr-4">Durum</th>
                <th className="section-label pb-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => {
                const earnings = calculateProjectEarnings(project)
                const initials = getInitials(project.clientName || project.projectTitle)
                const avatarColor = getAvatarColor(project.clientName)

                return (
                  <tr
                    key={project.id}
                    className="group border-b border-zinc-800/40 transition-colors last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-semibold text-white/90 ${avatarColor}`}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{project.projectTitle}</p>
                          <p className="mt-0.5 text-xs text-zinc-600">
                            {project.clientName} · {formatDate(project.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 pr-4 text-sm tabular-nums text-zinc-400">
                      {formatCurrency(project.hourlyRate)}
                    </td>
                    <td className="py-5 pr-4 text-sm tabular-nums text-zinc-400">
                      {project.hoursWorked} sa
                    </td>
                    <td className="py-5 pr-4 text-sm font-medium tabular-nums text-white">
                      {formatCurrency(earnings)}
                    </td>
                    <td className="py-5 pr-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="py-5 text-right">
                      <div className="inline-flex gap-2 opacity-70 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => onEdit(project)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition-colors hover:border-violet-500/40 hover:text-violet-300"
                          aria-label="Düzenle"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(project.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-300"
                          aria-label="Sil"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </GlassPanel>
  )
}
