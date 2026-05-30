import Navbar from '../components/Navbar'
import MetricsRow from '../components/MetricsRow'
import ProjectTable from '../components/ProjectTable'
import ProjectDrawer from '../components/ProjectDrawer'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import Footer from '../components/Footer'
import GradualBlur from '../components/GradualBlur'

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
          <div className="x-page-header__media" aria-hidden="true">
            <div className="x-page-header__bg" />
            <div className="x-page-header__overlay" />
          </div>
          <div className="x-page-header__body x-main__container">
            <header className="x-hero">
              <p className="x-hero__overline">
                <span className="x-hero__overline-dot" aria-hidden="true" />
                Freelancer workspace
              </p>
              <h1 className="x-hero__title">Projeler</h1>
              <p className="x-hero__lead">
                Zaman, ücret ve durum takibini tek bir panelden yönetin.
                {projects.length > 0 && (
                  <span className="x-hero__meta">
                    <span className="x-hero__meta-sep" aria-hidden="true">
                      ·
                    </span>
                    {projects.length} kayıt
                  </span>
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

      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        style={{ zIndex: 45 }}
      />
    </div>
  )
}
