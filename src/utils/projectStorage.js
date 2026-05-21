import { MOCK_PROJECTS, STORAGE_KEY } from '../interfaces/projectSchema'

/** @param {unknown} raw */
function normalizeProject(raw) {
  if (!raw || typeof raw !== 'object') return null

  const project = /** @type {Record<string, unknown>} */ (raw)
  const status = project.status

  if (
    typeof project.id !== 'string' ||
    typeof project.clientName !== 'string' ||
    typeof project.projectTitle !== 'string' ||
    !['Beklemede', 'Devam Ediyor', 'Tamamlandı'].includes(status)
  ) {
    return null
  }

  return {
    id: project.id,
    clientName: project.clientName,
    projectTitle: project.projectTitle,
    hourlyRate: Number(project.hourlyRate) || 0,
    hoursWorked: Number(project.hoursWorked) || 0,
    status,
    createdAt:
      typeof project.createdAt === 'string'
        ? project.createdAt
        : new Date().toISOString(),
  }
}

/** @returns {import('../interfaces/projectSchema').Project[]} */
export function loadProjectsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return [...MOCK_PROJECTS]

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return [...MOCK_PROJECTS]

    const normalized = parsed
      .map(normalizeProject)
      .filter((project) => project !== null)

    return normalized
  } catch {
    return [...MOCK_PROJECTS]
  }
}

/** @param {import('../interfaces/projectSchema').Project[]} projects */
export function saveProjectsToStorage(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}
