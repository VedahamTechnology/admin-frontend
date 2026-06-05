import { ReactNode } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import type { BookingStatus, WorkerStatus } from "../../types/vendor";

// ── StatusBadge ──────────────────────────────────────────────
const bookingVariants: Record<BookingStatus, string> = {
  pending:     "badge badge--warning",
  confirmed:   "badge--success badge",
  in_progress: "badge",
  completed:   "badge badge--success",
  cancelled:   "badge badge--danger",
};
const bookingLabels: Record<BookingStatus, string> = {
  pending:     "Pending",
  confirmed:   "Confirmed",
  in_progress: "In Progress",
  completed:   "Completed",
  cancelled:   "Cancelled",
};
const inProgressStyle: React.CSSProperties = {
  background: "rgba(5,175,199,0.12)",
  color: "var(--color-brand-cyan)",
  border: "1px solid rgba(5,175,199,0.3)",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={bookingVariants[status]}
      style={status === "in_progress" ? inProgressStyle : undefined}
    >
      {bookingLabels[status]}
    </span>
  );
}

const workerVariants: Record<WorkerStatus, string> = {
  active:   "badge badge--success",
  inactive: "badge badge--danger",
  on_leave: "badge badge--warning",
};
const workerLabels: Record<WorkerStatus, string> = {
  active:   "Active",
  inactive: "Inactive",
  on_leave: "On Leave",
};

export function WorkerStatusBadge({ status }: { status: WorkerStatus }) {
  return <span className={workerVariants[status]}>{workerLabels[status]}</span>;
}

// ── AvailabilityDot ──────────────────────────────────────────
const availColors: Record<string, string> = {
  available: "var(--color-success)",
  busy:      "var(--color-warning)",
  off:       "var(--color-danger)",
};
const availLabels: Record<string, string> = {
  available: "Available",
  busy: "Busy",
  off: "Off",
};

export function AvailabilityDot({ status }: { status: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.8125rem" }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: availColors[status] || "#ccc", display: "inline-block" }} />
      {availLabels[status] || status}
    </span>
  );
}

// ── PageHeader ───────────────────────────────────────────────
interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="page-header" style={{ marginBottom: 32 }}>
      <div>
        {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
        <h1 className="page-header__title">{title}</h1>
        {description && <p className="page-header__desc">{description}</p>}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  );
}

// ── SectionCard ──────────────────────────────────────────────
interface SectionCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  style?: React.CSSProperties;
}

export function SectionCard({ title, description, children, actions, style }: SectionCardProps) {
  return (
    <div className="section-card" style={style}>
      {(title || actions) && (
        <div className="section-card__header">
          <div>
            {title && <h2 className="section-card__title">{title}</h2>}
            {description && <p className="section-card__desc">{description}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

// ── MetricCard ───────────────────────────────────────────────
interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: ReactNode;
  accent?: string;
}

export function MetricCard({ label, value, change, icon, accent = "accent-navy" }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div>
        <p className="metric-card__label">{label}</p>
        <p className="metric-card__value">{value}</p>
        {change && <p className="metric-card__change">{change}</p>}
      </div>
      <div className={`metric-card__icon ${accent}`}>{icon}</div>
    </div>
  );
}

// ── EmptyState ───────────────────────────────────────────────
interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "No records to display.",
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon-wrap">
        {icon || <Loader2 size={20} />}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__desc">{description}</p>
      {actionLabel && (
        <button className="btn btn--primary" onClick={onAction} style={{ marginTop: 24 }}>
          {actionLabel} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

// ── LoadingState ─────────────────────────────────────────────
export function LoadingState() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="loading-card" style={{ height: 64 }} />
      ))}
    </div>
  );
}

// ── InfoRow ──────────────────────────────────────────────────
export function InfoRow({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <div className="info-row">
      <span className="info-row__label">{label}</span>
      <span className="info-row__value">{value || "—"}</span>
    </div>
  );
}

// ── WorkerAvatar ─────────────────────────────────────────────
export function WorkerAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className={`worker-avatar${size === "sm" ? " worker-avatar--sm" : ""}`}>
      {initials}
    </div>
  );
}
