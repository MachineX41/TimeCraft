const STORAGE_KEY = 'timecraft-sidebar-collapsed'

export function loadSidebarCollapsed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function saveSidebarCollapsed(collapsed) {
  try {
    localStorage.setItem(STORAGE_KEY, String(collapsed))
  } catch {
    /* ignore */
  }
}
