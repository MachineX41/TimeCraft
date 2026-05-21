/** @typedef {'Beklemede' | 'Devam Ediyor' | 'Tamamlandı'} ProjectStatus */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} clientName
 * @property {string} projectTitle
 * @property {number} hourlyRate
 * @property {number} hoursWorked
 * @property {ProjectStatus} status
 * @property {string} createdAt ISO 8601 date string
 */

export const PROJECT_STATUSES = ['Beklemede', 'Devam Ediyor', 'Tamamlandı']

export const STATUS_STYLES = {
  Beklemede: {
    badge: 'bg-zinc-800/80 text-zinc-400 border-zinc-700/80',
    dot: 'bg-zinc-500',
  },
  'Devam Ediyor': {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dot: 'bg-amber-400',
  },
  Tamamlandı: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
}

/** @returns {Project} */
export function createEmptyProject() {
  return {
    id: crypto.randomUUID(),
    clientName: '',
    projectTitle: '',
    hourlyRate: 0,
    hoursWorked: 0,
    status: 'Beklemede',
    createdAt: new Date().toISOString(),
  }
}

/** @type {Project[]} */
export const MOCK_PROJECTS = [
  {
    id: 'proj-001',
    clientName: 'Nova Digital',
    projectTitle: 'E-ticaret Arayüz Tasarımı',
    hourlyRate: 850,
    hoursWorked: 24,
    status: 'Devam Ediyor',
    createdAt: '2026-04-12T09:00:00.000Z',
  },
  {
    id: 'proj-002',
    clientName: 'Atlas Medya',
    projectTitle: 'Kurumsal Web Sitesi',
    hourlyRate: 720,
    hoursWorked: 40,
    status: 'Tamamlandı',
    createdAt: '2026-03-05T14:30:00.000Z',
  },
  {
    id: 'proj-003',
    clientName: 'Zenith Labs',
    projectTitle: 'Mobil Uygulama Prototipi',
    hourlyRate: 950,
    hoursWorked: 8,
    status: 'Beklemede',
    createdAt: '2026-05-18T11:15:00.000Z',
  },
]

export const STORAGE_KEY = 'timecraft-projects'
