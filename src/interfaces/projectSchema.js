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
    badge: 'border-zinc-700 text-zinc-500 bg-transparent',
    dot: 'bg-zinc-600',
  },
  'Devam Ediyor': {
    badge: 'border-violet-500/30 text-violet-300 bg-violet-500/5',
    dot: 'bg-violet-400 shadow-[0_0_6px_rgb(167_139_250/0.8)]',
  },
  Tamamlandı: {
    badge: 'border-zinc-600 text-zinc-400 bg-transparent',
    dot: 'bg-zinc-400',
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
