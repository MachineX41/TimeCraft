import RimPanel from './RimPanel'

export default function DeleteConfirmModal({ project, onCancel, onConfirm }) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0A0A0A]/60 p-6 backdrop-blur-md"
      role="alertdialog"
      aria-modal="true"
    >
      <RimPanel className="w-full max-w-md" innerClassName="p-8 text-center">
        <h2 className="text-xl font-medium tracking-tight text-white">Projeyi sil</h2>
        <p className="text-caption mt-3">
          <span className="text-white">{project.projectTitle}</span> kalıcı olarak silinecek.
        </p>
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={onCancel} className="btn-ghost flex-1">
            Vazgeç
          </button>
          <button type="button" onClick={onConfirm} className="btn-primary flex-1">
            Sil
          </button>
        </div>
      </RimPanel>
    </div>
  )
}
