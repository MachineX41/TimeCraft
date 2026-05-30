import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import BorderGlow from './BorderGlow'
import StatusBadge from './StatusBadge'
import WorkspaceFilterBar from './WorkspaceFilterBar'
import { WORKSPACE_BORDER_GLOW } from '../constants/workspaceBorderGlow'
import {
  RevealChars,
  RevealWords,
  revealBlock,
  revealLine,
  revealList,
  revealTransition,
  tableRowVariants,
} from './ui/RevealMotion'
import { matchesProjectSearch } from '../utils/projectSearch'
import {
  calculateProjectEarnings,
  formatCurrency,
} from '../utils/projectStats'

const INTRO_LEAD = 'Ücret, mesai ve durumu filtreleyerek görüntüleyin.'
const MAX_VISIBLE_ROWS = 7

function TableColGroup() {
  return (
    <colgroup>
      <col className="workspace-table__col workspace-table__col--project" />
      <col className="workspace-table__col workspace-table__col--rate" />
      <col className="workspace-table__col workspace-table__col--hours" />
      <col className="workspace-table__col workspace-table__col--earnings" />
      <col className="workspace-table__col workspace-table__col--status" />
      <col className="workspace-table__col workspace-table__col--actions" />
    </colgroup>
  )
}

function formatDate(iso) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

function filterProjects(projects, filter) {
  if (filter === 'pending') return projects.filter((p) => p.status === 'Beklemede')
  if (filter === 'active') return projects.filter((p) => p.status === 'Devam Ediyor')
  if (filter === 'done') return projects.filter((p) => p.status === 'Tamamlandı')
  return projects
}

export default function ProjectTable({ projects, onEdit, onDelete, onAddProject }) {
  const reduceMotion = useReducedMotion()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const tabFiltered = filterProjects(projects, filter)
  const filtered = tabFiltered.filter((p) => matchesProjectSearch(p, searchQuery))
  const filterCounts = {
    all: projects.length,
    pending: projects.filter((p) => p.status === 'Beklemede').length,
    active: projects.filter((p) => p.status === 'Devam Ediyor').length,
    done: projects.filter((p) => p.status === 'Tamamlandı').length,
  }

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
        <motion.div
          className="workspace__count-slot"
          variants={revealLine(reduceMotion, 8, 6)}
        >
          <BorderGlow
            {...WORKSPACE_BORDER_GLOW}
            borderRadius={9999}
            glowRadius={28}
            className="workspace-count-glow"
          >
            <p className="workspace-count-glow__content tabular-nums">
              <span className="sr-only">{filtered.length} kayıt</span>
              <span className="workspace-count-glow__value" aria-hidden="true">
                <RevealChars
                  text={String(filtered.length)}
                  reduceMotion={reduceMotion}
                  duration={0.32}
                />
              </span>
              <span className="workspace-count-glow__label">kayıt</span>
            </p>
          </BorderGlow>
        </motion.div>
      </motion.header>

      <BorderGlow {...WORKSPACE_BORDER_GLOW} className="workspace-panel-glow">
        <motion.div
          className="workspace-panel-glow__content"
          variants={revealLine(reduceMotion, 16, 10)}
        >
        <WorkspaceFilterBar
          filter={filter}
          onChange={(id) => {
            setFilter(id)
            setSearchQuery('')
          }}
          counts={filterCounts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key={`empty-${filter}-${searchQuery}`}
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
                <span className="sr-only">
                  {searchQuery.trim() ? 'Arama sonucu bulunamadı' : 'Proje bulunamadı'}
                </span>
                <RevealWords
                  text={searchQuery.trim() ? 'Arama sonucu bulunamadı' : 'Proje bulunamadı'}
                  reduceMotion={reduceMotion}
                />
              </motion.p>
              <motion.p className="workspace-empty__text" variants={revealLine(reduceMotion)}>
                <span className="sr-only">
                  {searchQuery.trim()
                    ? 'Farklı bir anahtar kelime deneyin.'
                    : 'Yeni bir proje ekleyerek başlayın.'}
                </span>
                <RevealWords
                  text={
                    searchQuery.trim()
                      ? 'Farklı bir anahtar kelime deneyin.'
                      : 'Yeni bir proje ekleyerek başlayın.'
                  }
                  reduceMotion={reduceMotion}
                />
              </motion.p>
              {searchQuery.trim() ? (
                <motion.button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  variants={revealLine(reduceMotion)}
                  className="btn-primary workspace-empty__cta"
                >
                  Aramayı temizle
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={onAddProject}
                  variants={revealLine(reduceMotion)}
                  className="btn-primary workspace-empty__cta"
                >
                  Yeni proje
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`table-${filter}-${searchQuery}`}
              className="workspace-table-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={revealTransition(reduceMotion, 0.28)}
              aria-label={
                filtered.length > MAX_VISIBLE_ROWS
                  ? `Proje tablosu, ${filtered.length} kayıt, kaydırarak görüntüleyin`
                  : undefined
              }
            >
              <div className="workspace-table-shell">
                <table className="workspace-table workspace-table--head">
                  <TableColGroup />
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
                </table>
                <div
                  className={`workspace-table-body${filtered.length > MAX_VISIBLE_ROWS ? ' workspace-table-body--scroll' : ''}`}
                >
                  <table className="workspace-table workspace-table--body">
                    <TableColGroup />
                    <tbody>
                      <AnimatePresence initial={false} mode="popLayout">
                      {filtered.map((project, rowIndex) => {
                        const earnings = calculateProjectEarnings(project)

                        return (
                          <motion.tr
                            key={project.id}
                            layout
                            className="workspace-table__row"
                            variants={tableRowVariants(
                              reduceMotion,
                              rowIndex < MAX_VISIBLE_ROWS,
                            )}
                            initial={rowIndex < MAX_VISIBLE_ROWS ? 'hidden' : false}
                            animate="visible"
                            exit="exit"
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
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
      </BorderGlow>
    </motion.section>
  )
}
