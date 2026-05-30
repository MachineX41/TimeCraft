export function matchesProjectSearch(project, query) {
  const q = query.trim().toLocaleLowerCase('tr-TR')
  if (!q) return true

  const haystack = [
    project.projectTitle,
    project.clientName,
    project.about,
    project.status,
    String(project.hourlyRate),
    String(project.hoursWorked),
  ]
    .join(' ')
    .toLocaleLowerCase('tr-TR')

  return haystack.includes(q)
}

export const SEARCH_PLACEHOLDER = {
  all: 'Proje veya müşteri ara…',
  pending: 'Beklemedeki projelerde ara…',
  active: 'Aktif projelerde ara…',
  done: 'Tamamlanan projelerde ara…',
}
