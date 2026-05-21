export default function DeleteConfirmModal({ project, onCancel, onConfirm }) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-label="İptal"
      />

      <div className="relative w-full max-w-sm rounded-xl border border-white/[0.08] bg-zinc-900 p-6 shadow-2xl shadow-black/50">
        <h2 id="delete-dialog-title" className="text-base font-semibold text-zinc-50">
          Projeyi sil
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          <span className="text-zinc-300">{project.projectTitle}</span> kalıcı olarak
          kaldırılacak.
        </p>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.04]"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600/90 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}
