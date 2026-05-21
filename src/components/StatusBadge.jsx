import { STATUS_STYLES } from '../interfaces/projectSchema'

export default function StatusBadge({ status }) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.Beklemede

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${styles.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  )
}
