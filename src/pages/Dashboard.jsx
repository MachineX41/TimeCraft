import { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { loadSidebarCollapsed, saveSidebarCollapsed } from '../utils/sidebarStorage'
import InsightsPanel from '../components/InsightsPanel'
import ProjectTable from '../components/ProjectTable'
import ProjectDrawer from '../components/ProjectDrawer'
import DeleteConfirmModal from '../components/DeleteConfirmModal'

export default function Dashboard({
  projects,
  modalOpen,
  editingProject,
  deletingProject,
  onAddProject,
  onEditProject,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
  onCloseModal,
  onSaveProject,
}) {
  const [collapsed, setCollapsed] = useState(loadSidebarCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    saveSidebarCollapsed(collapsed)
  }, [collapsed])

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [])

  const openMobileMenu = useCallback(() => {
    setMobileOpen(true)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false)
  }, [])

  const handleAddProject = useCallback(() => {
    closeMobileMenu()
    onAddProject()
  }, [onAddProject, closeMobileMenu])

  return (
    <div className="app-shell relative min-h-screen bg-[#050505] font-sans antialiased">
      <Sidebar
        collapsed={collapsed}
        onToggle={toggleCollapsed}
        onAddProject={handleAddProject}
        mobileOpen={mobileOpen}
        onMobileClose={closeMobileMenu}
      />

      <div
        className={`relative z-10 flex min-h-screen flex-col transition-[margin] duration-300 ease-in-out ${
          collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
        }`}
      >
        <Navbar onMenuClick={openMobileMenu} onAddProject={handleAddProject} />

        <main className="flex-1 p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <ProjectTable
                projects={projects}
                onEdit={onEditProject}
                onDelete={onRequestDelete}
                onAddProject={handleAddProject}
              />
            </div>
            <div className="xl:col-span-1">
              <InsightsPanel projects={projects} />
            </div>
          </div>
        </main>
      </div>

      <ProjectDrawer
        isOpen={modalOpen}
        project={editingProject}
        onClose={onCloseModal}
        onSave={onSaveProject}
      />

      <DeleteConfirmModal
        project={deletingProject}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />
    </div>
  )
}
