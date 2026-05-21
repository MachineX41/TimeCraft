import Navbar from '../components/Navbar'
import SummaryCards from '../components/SummaryCards'
import ProjectCard from '../components/ProjectCard'
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
    <div className="app-shell relative min-h-screen bg-zinc-950 font-sans antialiased">
      <div className="relative z-10">
        <Navbar onAddProject={onAddProject} />

        <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-14">
          <header className="mb-10">
            <p className="text-sm text-zinc-500">Genel bakış</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-50">
              Dashboard
            </h2>
          </header>

          <div className="mb-14 border-y border-white/[0.06]">
            <SummaryCards projects={projects} />
          </div>

          <section aria-label="Proje listesi">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">Projeler</h3>
                <p className="mt-0.5 text-sm text-zinc-500">
                  {projects.length} kayıt
                </p>
              </div>
              <button
                type="button"
                onClick={onAddProject}
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-300 sm:hidden"
              >
                + Ekle
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-semibold text-zinc-300">Henüz proje yok</p>
                <p className="mt-2 text-sm text-zinc-500">
                  İlk işinizi ekleyerek başlayın.
                </p>
                <button
                  type="button"
                  onClick={onAddProject}
                  className="mt-8 rounded-lg bg-zinc-50 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
                >
                  Yeni proje
                </button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="hidden border-b border-white/[0.06] px-6 py-3 sm:grid sm:grid-cols-[1fr_auto_auto_auto] sm:gap-6">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                    Proje
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                    Detay
                  </span>
                  <span className="min-w-[7rem] text-right text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                    Kazanç
                  </span>
                  <span className="w-[8.5rem]" />
                </div>
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={onEditProject}
                    onDelete={onRequestDelete}
                    isLast={index === projects.length - 1}
                  />
                ))}
              </div>
            )}
          </section>
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
