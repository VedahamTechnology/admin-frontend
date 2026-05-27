import { ArrowRight, Loader2 } from "lucide-react"

/* ── PageShell ──────────────────────────────────────────────── */
export function PageShell({ title, description, actions, children }) {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">HOMSTER Admin</p>
          <h1 className="page-header__title">{title}</h1>
          <p className="page-header__desc">{description}</p>
        </div>
        {actions ? (
          <div className="page-header__actions">{actions}</div>
        ) : null}
      </div>

      {children}
    </div>
  )
}

/* ── MetricCard ─────────────────────────────────────────────── */
export function MetricCard({
  label,
  value,
  change,
  note,
  icon,
  accentClassName = "accent-navy",
}) {
  return (
    <div className="metric-card">
      <div>
        <p className="metric-card__label">{label}</p>
        <p className="metric-card__value">{value}</p>
        {change ? <p className="metric-card__change">{change}</p> : null}
        {note   ? <p className="metric-card__note">{note}</p>     : null}
      </div>

      <div className={`metric-card__icon ${accentClassName}`}>
        {icon}
      </div>
    </div>
  )
}

/* ── SectionCard ────────────────────────────────────────────── */
export function SectionCard({ title, description, children, className = "" }) {
  return (
    <section className={`section-card ${className}`}>
      <div className="section-card__header">
        <div>
          <h2 className="section-card__title">{title}</h2>
          {description ? (
            <p className="section-card__desc">{description}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  )
}

/* ── LoadingGrid ────────────────────────────────────────────── */
export function LoadingGrid({ cards = 4 }) {
  return (
    <div className="loading-grid">
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className="loading-card">
          <div className="skeleton" style={{ height: 12, width: 96 }} />
          <div className="skeleton" style={{ height: 32, width: 112, marginTop: 16 }} />
          <div className="skeleton" style={{ height: 12, width: 144, marginTop: 16, opacity: 0.6 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
            <div className="skeleton" style={{ height: 40, width: 40, borderRadius: 12 }} />
            <div className="skeleton" style={{ height: 40, flex: 1, borderRadius: 12, opacity: 0.6 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── EmptyState ─────────────────────────────────────────────── */
export function EmptyState({
  title = "API Integration Pending",
  description = "Connect the backend to display live records in this section.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon-wrap">
        <Loader2 size={20} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__desc">{description}</p>
      {actionLabel ? (
        <button type="button" onClick={onAction} className="btn btn--primary" style={{ marginTop: 24 }}>
          {actionLabel}
          <ArrowRight size={16} />
        </button>
      ) : null}
    </div>
  )
}

/* ── StatusPill ─────────────────────────────────────────────── */
export function StatusPill({ status }) {
  const normalizedStatus = (status || "Unknown").toLowerCase()

  const variantMap = {
    approved:   "badge--success",
    active:     "badge--success",
    completed:  "badge--success",
    paid:       "badge--success",
    pending:    "badge--warning",
    processing: "badge--warning",
    settling:   "badge--warning",
    cancelled:  "badge--danger",
    rejected:   "badge--danger",
    blocked:    "badge--neutral",
    draft:      "badge--neutral",
  }

  const variant = variantMap[normalizedStatus] || "badge--neutral"

  return (
    <span className={`badge ${variant}`}>{status}</span>
  )
}
