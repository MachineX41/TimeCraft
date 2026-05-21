import GlassPanel from './GlassPanel'

export default function DeleteConfirmModal({ project, onCancel, onConfirm }) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-6"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onCancel}
        aria-label="İptal"
      />

      <div className="relative w-full max-w-sm">
        <GlassPanel innerClassName="p-8 text-center">
          <p className="section-label mb-4">Onay</p>
          <h2 id="delete-dialog-title" className="text-lg font-medium text-white">
            Projeyi sil
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            <span className="text-zinc-300">{project.projectTitle}</span> kalıcı olarak
            kaldırılacak.
          </p>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-full border border-zinc-700 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-full border border-zinc-600 bg-white/10 py-3 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/15"
            >
              Sil
            </button>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
