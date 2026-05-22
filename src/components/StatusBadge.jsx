import { STATUS_STYLES } from '../interfaces/projectSchema'

export default function StatusBadge({ status }) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.Beklemede

  return (
    <span className={`inline-flex items-center gap-2 text-xs text-neutral-400 ${styles.text}`}>
      <span className={`h-1 w-1 rounded-full ${styles.dot}`} />
      {status}
    </span>
  )
}
