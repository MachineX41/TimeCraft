/** @param {import('../interfaces/projectSchema').Project[]} projects */
export function calculateProjectEarnings(project) {
  return Number(project.hourlyRate || 0) * Number(project.hoursWorked || 0)
}

/** @param {import('../interfaces/projectSchema').Project[]} projects */
export function calculateKPIs(projects) {
  const totalEarned = projects.reduce(
    (sum, project) => sum + calculateProjectEarnings(project),
    0,
  )
  const totalHours = projects.reduce(
    (sum, project) => sum + Number(project.hoursWorked || 0),
    0,
  )
  const activeJobCount = projects.filter(
    (project) => project.status === 'Devam Ediyor',
  ).length

  return { totalEarned, totalHours, activeJobCount }
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(amount)
}
