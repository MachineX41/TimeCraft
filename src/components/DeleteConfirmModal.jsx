export default function DeleteConfirmModal({ project, onCancel, onConfirm }) {
  if (!project) return null

  return (
    <div
      className="x-modal-backdrop"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="x-modal x-surface">
        <h2 id="delete-modal-title" className="x-modal__title">
          Projeyi sil
        </h2>
        <p className="x-modal__text">
          <span className="text-white">{project.projectTitle}</span> kalıcı olarak silinecek.
        </p>
        <div className="x-modal__actions">
          <button type="button" onClick={onCancel} className="btn-ghost flex-1">
            Vazgeç
          </button>
          <button type="button" onClick={onConfirm} className="btn-primary flex-1">
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}
