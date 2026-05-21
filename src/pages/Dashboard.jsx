import Navbar from '../components/Navbar'
import InsightsPanel from '../components/InsightsPanel'
import ProjectTable from '../components/ProjectTable'
import ProjectModal from '../components/ProjectModal'
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
  return (
    <div className="app-shell relative min-h-screen bg-[#050505] font-sans antialiased">
      <div className="relative z-10">
        <Navbar onAddProject={onAddProject} />

        <main className="mx-auto max-w-7xl px-8 py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProjectTable
                projects={projects}
                onEdit={onEditProject}
                onDelete={onRequestDelete}
                onAddProject={onAddProject}
              />
            </div>
            <div className="lg:col-span-1">
              <InsightsPanel projects={projects} />
            </div>
          </div>
        </main>
      </div>

      <ProjectModal
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
