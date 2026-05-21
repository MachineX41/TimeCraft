import StatusBadge from './StatusBadge'
import {
  calculateProjectEarnings,
  formatCurrency,
} from '../utils/projectStats'

function formatDate(iso) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))
}

export default function ProjectCard({ project, onEdit, onDelete, isLast }) {
  const earnings = calculateProjectEarnings(project)

  return (
    <article
      className={`group grid grid-cols-1 gap-4 px-5 py-5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[1fr_auto_auto_auto] sm:items-center sm:gap-6 sm:px-6 ${
        !isLast ? 'border-b border-white/[0.06]' : ''
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="truncate text-[15px] font-semibold text-zinc-100">
            {project.projectTitle}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-0.5 text-sm text-zinc-500">
          {project.clientName}
          <span className="mx-2 text-zinc-700">·</span>
          {formatDate(project.createdAt)}
        </p>
      </div>

      <dl className="flex gap-8 sm:gap-10">
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-zinc-600">Ücret</dt>
          <dd className="mt-0.5 text-sm font-medium tabular-nums text-zinc-300">
            {formatCurrency(project.hourlyRate)}/sa
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-zinc-600">Mesai</dt>
          <dd className="mt-0.5 text-sm font-medium tabular-nums text-zinc-300">
            {project.hoursWorked} sa
          </dd>
        </div>
      </dl>

      <p className="text-right text-sm font-semibold tabular-nums text-emerald-400/90 sm:min-w-[7rem]">
        {formatCurrency(earnings)}
      </p>

      <div className="flex items-center justify-end gap-1 sm:opacity-60 sm:transition-opacity sm:group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onEdit(project)}
          className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-100"
        >
          Düzenle
        </button>
        <button
          type="button"
          onClick={() => onDelete(project.id)}
          className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
          aria-label={`${project.projectTitle} sil`}
        >
          Sil
        </button>
      </div>
    </article>
  )
}
