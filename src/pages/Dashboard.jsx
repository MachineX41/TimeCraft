import Navbar from '../components/Navbar'
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
    <div className="app-bg flex min-h-screen flex-col font-sans text-white antialiased">
      <Navbar onAddProject={onAddProject} />

      <div className="flex flex-1 flex-col">
        <section className="x-page-header" aria-label="Sayfa başlığı">
          <img
            src="/header.png"
            alt=""
            className="x-page-header__bg"
            width={1643}
            height={957}
            decoding="async"
          />
          <div className="x-page-header__overlay" aria-hidden="true" />
          <div className="x-page-header__inner x-main__container">
            <header className="x-hero">
              <p className="x-hero__overline">Freelancer workspace</p>
              <h1 className="x-hero__title">Projeler</h1>
              <p className="x-hero__lead">
                Zaman, ücret ve durum takibini tek bir panelden yönetin.
                {projects.length > 0 && (
                  <span className="x-hero__meta"> {projects.length} kayıt</span>
                )}
              </p>
            </header>
            <MetricsRow projects={projects} />
          </div>
        </section>

        <main className="x-main flex-1">
          <div className="x-main__container">
            <ProjectTable
              projects={projects}
              onEdit={onEditProject}
              onDelete={onRequestDelete}
              onAddProject={onAddProject}
            />
          </div>
        </main>

        <Footer />
      </div>

      <ProjectDrawer
        isOpen={modalOpen}
        project={editingProject}
        onOpen={onAddProject}
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
