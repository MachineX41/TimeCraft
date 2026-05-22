import { useState } from 'react'
import StatusBadge from './StatusBadge'
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
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

function filterProjects(projects, filter) {
  if (filter === 'active') return projects.filter((p) => p.status === 'Devam Ediyor')
  if (filter === 'done') return projects.filter((p) => p.status === 'Tamamlandı')
  return projects
}

export default function ProjectTable({ projects, onEdit, onDelete, onAddProject }) {
  const [filter, setFilter] = useState('all')
  const filtered = filterProjects(projects, filter)

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="flex gap-8">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`filter-tab ${filter === f.id ? 'filter-tab-active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-caption tabular-nums">{filtered.length} kayıt</p>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg font-medium text-white">Proje bulunamadı</p>
          <p className="text-caption mt-2">Yeni bir proje ekleyerek başlayın.</p>
          <button type="button" onClick={onAddProject} className="btn-primary mt-8">
            Yeni proje
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-overline pb-4 pr-6 font-medium">Proje</th>
                <th className="text-overline pb-4 pr-6 font-medium">Ücret</th>
                <th className="text-overline pb-4 pr-6 font-medium">Mesai</th>
                <th className="text-overline pb-4 pr-6 font-medium">Kazanç</th>
                <th className="text-overline pb-4 pr-6 font-medium">Durum</th>
                <th className="text-overline pb-4 text-right font-medium"> </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => {
                const earnings = calculateProjectEarnings(project)

                return (
                  <tr
                    key={project.id}
                    className="group border-b border-white/[0.06] transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-5 pr-6">
                      <p className="font-medium text-white">{project.projectTitle}</p>
                      <p className="text-caption mt-1">
                        {project.clientName} · {formatDate(project.createdAt)}
                      </p>
                    </td>
                    <td className="py-5 pr-6 text-sm tabular-nums text-neutral-400">
                      {formatCurrency(project.hourlyRate)}
                    </td>
                    <td className="py-5 pr-6 text-sm tabular-nums text-neutral-400">
                      {project.hoursWorked} sa
                    </td>
                    <td className="py-5 pr-6 text-sm font-medium tabular-nums text-white">
                      {formatCurrency(earnings)}
                    </td>
                    <td className="py-5 pr-6">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="py-5 text-right">
                      <div className="inline-flex gap-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => onEdit(project)}
                          className="btn-text"
                        >
                          Düzenle
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(project.id)}
                          className="btn-text"
                        >
                          Sil
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
    </section>
  )
}
