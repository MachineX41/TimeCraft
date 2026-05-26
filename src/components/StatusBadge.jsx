import { STATUS_STYLES } from '../interfaces/projectSchema'

export default function StatusBadge({ status }) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.Beklemede

  return (
    <span className={`status-badge ${styles.text}`}>
      <span className={`status-badge__dot ${styles.dot}`} aria-hidden />
      {status}
    </span>
  )
}
