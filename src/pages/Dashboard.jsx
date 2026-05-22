import Navbar from '../components/Navbar'
import RimPanel from '../components/RimPanel'
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
  return (
    <div className="app-bg min-h-screen font-sans text-white antialiased">
      <Navbar onAddProject={onAddProject} />

      <div className="flex min-h-screen flex-col pt-[4.25rem]">
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
                onAddProject={onAddProject}
              />
            </RimPanel>
          </div>
        </main>
      </div>

      <Footer />

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
