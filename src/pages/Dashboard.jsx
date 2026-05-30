import Navbar from '../components/Navbar'
import PageHero from '../components/PageHero'
import MetricsRow from '../components/MetricsRow'
import ProjectTable from '../components/ProjectTable'
import ProjectDrawer from '../components/ProjectDrawer'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import Footer from '../components/Footer'
import GradualBlur from '../components/GradualBlur'

export default function Dashboard({
  projects,
  modalOpen,
  drawerMode,
  drawerProject,
  deletingProject,
  onAddProject,
  onSelectProject,
  onEditProject,
  onDrawerModeChange,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
  onCloseModal,
  onSaveProject,
}) {
  return (
    <div className="app-bg flex min-h-screen flex-col font-sans text-white antialiased">
      <Navbar onAddProject={onAddProject} />

      <div className="dashboard-shell flex flex-1 flex-col">
        <section className="x-page-header" aria-label="Sayfa başlığı">
          <div className="x-page-header__media" aria-hidden="true">
            <div className="x-page-header__bg" />
            <div className="x-page-header__overlay" />
          </div>
          <div className="x-page-header__body x-main__container">
            <PageHero projectCount={projects.length} />
            <MetricsRow projects={projects} />
          </div>
        </section>

        <main className="x-main">
          <div className="x-main__container">
            <ProjectTable
              projects={projects}
              onSelect={onSelectProject}
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
        mode={drawerMode}
        project={drawerProject}
        onModeChange={onDrawerModeChange}
        onOpen={onAddProject}
        onClose={onCloseModal}
        onSave={onSaveProject}
        onRequestDelete={onRequestDelete}
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
