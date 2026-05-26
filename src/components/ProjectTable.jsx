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
    <section className="x-section" aria-label="Proje listesi">
      <header className="x-section__head">
        <h2 className="x-section__title">Proje listesi</h2>
        <p className="x-section__lead">
          Ücret, mesai ve durumu filtreleyerek görüntüleyin.
        </p>
      </header>

      <div className="workspace-toolbar">
        <div className="workspace-toolbar__filters" role="tablist" aria-label="Proje filtresi">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`workspace-filter ${filter === f.id ? 'workspace-filter--active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="workspace-toolbar__count tabular-nums">{filtered.length} kayıt</p>
      </div>

      {filtered.length === 0 ? (
        <div className="x-surface workspace-empty">
          <p className="workspace-empty__title">Proje bulunamadı</p>
          <p className="workspace-empty__text">Yeni bir proje ekleyerek başlayın.</p>
          <button type="button" onClick={onAddProject} className="btn-primary workspace-empty__cta">
            Yeni proje
          </button>
        </div>
      ) : (
        <div className="x-surface">
          <div className="workspace-table-wrap">
          <table className="workspace-table">
            <thead>
              <tr>
                <th className="workspace-table__head">Proje</th>
                <th className="workspace-table__head">Ücret</th>
                <th className="workspace-table__head">Mesai</th>
                <th className="workspace-table__head">Kazanç</th>
                <th className="workspace-table__head">Durum</th>
                <th className="workspace-table__head workspace-table__head--actions">
                  <span className="sr-only">İşlemler</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => {
                const earnings = calculateProjectEarnings(project)

                return (
                  <tr key={project.id} className="workspace-table__row">
                    <td className="workspace-table__cell workspace-table__cell--primary">
                      <p className="workspace-table__title">{project.projectTitle}</p>
                      <p className="workspace-table__sub">
                        {project.clientName} · {formatDate(project.createdAt)}
                      </p>
                    </td>
                    <td className="workspace-table__cell workspace-table__cell--num">
                      {formatCurrency(project.hourlyRate)}
                    </td>
                    <td className="workspace-table__cell workspace-table__cell--num">
                      {project.hoursWorked} sa
                    </td>
                    <td className="workspace-table__cell workspace-table__cell--num workspace-table__cell--earnings">
                      {formatCurrency(earnings)}
                    </td>
                    <td className="workspace-table__cell">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="workspace-table__cell workspace-table__cell--actions">
                      <div className="workspace-table__actions">
                        <button
                          type="button"
                          onClick={() => onEdit(project)}
                          className="workspace-table__action"
                        >
                          Düzenle
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(project.id)}
                          className="workspace-table__action workspace-table__action--danger"
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
        </div>
      )}
    </section>
  )
}
