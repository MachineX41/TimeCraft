import { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import RimPanel from '../components/RimPanel'
import { loadSidebarCollapsed, saveSidebarCollapsed } from '../utils/sidebarStorage'
import MetricsRow from '../components/MetricsRow'
import ProjectTable from '../components/ProjectTable'
import ProjectDrawer from '../components/ProjectDrawer'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import Footer from '../components/Footer'

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

  const toggleCollapsed = useCallback(() => setCollapsed((p) => !p), [])
  const openMobileMenu = useCallback(() => setMobileOpen(true), [])
  const closeMobileMenu = useCallback(() => setMobileOpen(false), [])

  const handleAddProject = useCallback(() => {
    closeMobileMenu()
    onAddProject()
  }, [onAddProject, closeMobileMenu])

  return (
    <div className="app-bg min-h-screen font-sans text-white antialiased">
      <Sidebar
        collapsed={collapsed}
        onToggle={toggleCollapsed}
        onAddProject={handleAddProject}
        mobileOpen={mobileOpen}
        onMobileClose={closeMobileMenu}
      />

      <div
        className={`flex min-h-screen flex-col transition-[margin] duration-300 ease-out ${
          collapsed ? 'lg:ml-[72px]' : 'lg:ml-60'
        }`}
      >
        <Navbar onMenuClick={openMobileMenu} onAddProject={handleAddProject} />

        <main className="flex-1 px-6 py-10 lg:px-12 lg:py-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-overline mb-3">Freelancer workspace</p>
            <h1 className="text-display mb-4">Projeler</h1>
            <p className="text-caption mb-10 max-w-xl">
              Zaman, ücret ve durum takibini tek bir minimal panelden yönetin.
            </p>

            <RimPanel innerClassName="px-6 py-8 lg:px-8 lg:py-10">
              <MetricsRow projects={projects} />
              <ProjectTable
                projects={projects}
                onEdit={onEditProject}
                onDelete={onRequestDelete}
                onAddProject={handleAddProject}
              />
            </RimPanel>
          </div>
        </main>
      </div>

      <Footer collapsed={collapsed} />

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
