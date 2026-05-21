import { STATUS_STYLES } from '../interfaces/projectSchema'

export default function StatusBadge({ status }) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.Beklemede

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${styles.badge}`}
    >
      <span className={`h-1 w-1 rounded-full ${styles.dot}`} />
      {status}
    </span>
  )
}
