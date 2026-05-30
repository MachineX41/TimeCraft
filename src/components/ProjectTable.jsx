import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import StatusBadge from './StatusBadge'
import {
  RevealChars,
  RevealWords,
  revealBlock,
  revealLine,
  revealList,
  revealRow,
  revealTransition,
} from './ui/RevealMotion'
import {
  calculateProjectEarnings,
  formatCurrency,
} from '../utils/projectStats'

const FILTERS = [
  { id: 'all', label: 'Tümü' },
  { id: 'active', label: 'Aktif' },
  { id: 'done', label: 'Tamamlanan' },
]

const INTRO_LEAD = 'Ücret, mesai ve durumu filtreleyerek görüntüleyin.'

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
  const reduceMotion = useReducedMotion()
  const [filter, setFilter] = useState('all')
  const filtered = filterProjects(projects, filter)

  return (
    <motion.section
      className="workspace"
      aria-label="Proje listesi"
      variants={revealBlock(reduceMotion, 0.08, 0.04)}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="workspace__intro" variants={revealBlock(reduceMotion, 0.07, 0)}>
        <div className="workspace__intro-text">
          <motion.h2 className="workspace__title" variants={revealLine(reduceMotion, 10, 8)}>
            <span className="sr-only">Proje listesi</span>
            <RevealChars text="Proje listesi" reduceMotion={reduceMotion} />
          </motion.h2>
          <motion.p className="workspace__lead" variants={revealLine(reduceMotion)}>
            <span className="sr-only">{INTRO_LEAD}</span>
            <RevealWords text={INTRO_LEAD} reduceMotion={reduceMotion} />
          </motion.p>
        </div>
        <motion.p
          className="workspace__count tabular-nums"
          variants={revealLine(reduceMotion, 8, 6)}
        >
          <span className="sr-only">{filtered.length} kayıt</span>
          <span className="workspace__count-value" aria-hidden="true">
            <RevealChars
              text={String(filtered.length)}
              reduceMotion={reduceMotion}
              duration={0.32}
            />
          </span>
          <span className="workspace__count-label">kayıt</span>
        </motion.p>
      </motion.header>

      <motion.div className="workspace__panel" variants={revealLine(reduceMotion, 16, 10)}>
        <div className="workspace-toolbar">
          <motion.div
            className="workspace-toolbar__track"
            role="tablist"
            aria-label="Proje filtresi"
            variants={revealList(reduceMotion, 0.06, 0.12)}
            initial="hidden"
            animate="visible"
          >
            {FILTERS.map((f) => (
              <motion.button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                variants={revealLine(reduceMotion, 6, 4)}
                className={`workspace-filter${filter === f.id ? ' workspace-filter--active' : ''}`}
              >
                {f.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key={`empty-${filter}`}
              className="workspace-empty"
              variants={revealBlock(reduceMotion, 0.08, 0.06)}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                y: reduceMotion ? 0 : -8,
                transition: revealTransition(reduceMotion, 0.25),
              }}
            >
              <motion.p className="workspace-empty__title" variants={revealLine(reduceMotion)}>
                <span className="sr-only">Proje bulunamadı</span>
                <RevealWords text="Proje bulunamadı" reduceMotion={reduceMotion} />
              </motion.p>
              <motion.p className="workspace-empty__text" variants={revealLine(reduceMotion)}>
                <span className="sr-only">Yeni bir proje ekleyerek başlayın.</span>
                <RevealWords text="Yeni bir proje ekleyerek başlayın." reduceMotion={reduceMotion} />
              </motion.p>
              <motion.button
                type="button"
                onClick={onAddProject}
                variants={revealLine(reduceMotion)}
                className="btn-primary workspace-empty__cta"
              >
                Yeni proje
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={`table-${filter}`}
              className="workspace-table-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={revealTransition(reduceMotion, 0.28)}
            >
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
                <motion.tbody
                  variants={revealList(reduceMotion, 0.05, 0.04)}
                  initial="hidden"
                  animate="visible"
                >
                  {filtered.map((project) => {
                    const earnings = calculateProjectEarnings(project)

                    return (
                      <motion.tr
                        key={project.id}
                        className="workspace-table__row"
                        variants={revealRow(reduceMotion)}
                      >
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
                              className="workspace-table__action workspace-table__action--edit"
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
                      </motion.tr>
                    )
                  })}
                </motion.tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}
