import { useCallback, useMemo } from "react";
import {
  CalendarCheck,
  Clock3,
  Users,
  Wallet,
  Plus,
  UserPlus,
  CalendarDays,
  Bell,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
 
import VendorLayout from "../Layouts/VendorLayout";
import {
  BookingStatusBadge,
  EmptyState,
  LoadingState,
  MetricCard,
  PageHeader,
  SectionCard,
  WorkerAvatar,
  WorkerStatusBadge,
} from "../Components/VendorUI";
import { useBookings, useWorkers } from "../hooks/useVendor";
import {
  getWorkerDisplayId,
  getWorkerFullName,
  getWorkerServiceCategoryName,
} from "../types/vendor";
import type { Worker } from "../types/vendor";
 
// ── Auth helper ───────────────────────────────────────────────
// Reads the vendor profile stored in localStorage at login time.
// The auth service is expected to persist the profile as JSON under
// "vendorProfile" when it receives the login response. If the key is
// absent (old session / different key name) we fall back to "Vendor".
function getVendorFirstName(): string {
  try {
    const raw = localStorage.getItem("vendorProfile");
    if (raw) {
      const profile = JSON.parse(raw) as {
        firstName?: string;
        ownerName?: string;
        name?: string;
      };
      const full =
        profile.firstName ||
        profile.ownerName ||
        profile.name ||
        "";
      const first = full.trim().split(" ")[0];
      if (first) return first;
    }
  } catch {
    // JSON parse failed — ignore and fall through to default.
  }
  return "Vendor";
}
 
// ── Worker status colour mapping (uses design-system CSS vars) ─
const workerStatusColor: Record<string, string> = {
  approved: "var(--color-success)",
  pending:  "var(--color-warning)",
  rejected: "var(--color-danger)",
};
 
// ── Dashboard ─────────────────────────────────────────────────
export default function VendorDashboard() {
  const navigate = useNavigate();
 
  const {
    bookings,
    loading: bookingsLoading,
    error: bookingsError,
    updateStatus,
  } = useBookings();
 
  const {
    workers,
    loading: workersLoading,
    error: workersError,
  } = useWorkers();
 
  // ── Derived KPIs (single pass where possible) ──────────────
  const kpis = useMemo(() => {
    let pending    = 0;
    let confirmed  = 0;
    let inProgress = 0;
    let completed  = 0;
    let revenue    = 0;
 
    for (const b of bookings) {
      if (b.status === "pending")     pending++;
      if (b.status === "confirmed")   confirmed++;
      if (b.status === "in_progress") inProgress++;
      if (b.status === "completed") {
        completed++;
        revenue += b.amount;
      }
    }
 
    return { pending, confirmed, inProgress, completed, revenue };
  }, [bookings]);
 
  const approvedWorkers = useMemo(
    () => workers.filter((w) => w.worker.verificationStatus === "approved").length,
    [workers]
  );
 
  // Pending bookings list (for Action Required card)
  const pendingBookings = useMemo(
    () => bookings.filter((b) => b.status === "pending"),
    [bookings]
  );
 
  // 5 most recent bookings
  const recentBookings = useMemo(
    () =>
      [...bookings]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5),
    [bookings]
  );
 
  // Upcoming schedule: all non-terminal bookings, newest first, max 4
  const upcomingSchedule = useMemo(
    () =>
      bookings
        .filter((b) => b.status !== "completed" && b.status !== "cancelled")
        .slice(0, 4)
        .map((b) => ({
          id:         b.id,
          date:       b.date,
          timeSlot:   b.timeSlot,
          clientName: b.client.name,
          service:    b.service.name,
          workerName:
            b.assignedWorkers.length > 0
              ? getWorkerFullName(b.assignedWorkers[0])
              : "Unassigned",
        })),
    [bookings]
  );
 
  // Quick actions — stable reference; navigate is stable from react-router
  const quickActions = useMemo(
    () => [
      { label: "New Booking",      icon: <Plus size={20} />,         accent: "accent-navy",    path: "/vendor/bookings"      },
      { label: "Add Worker",       icon: <UserPlus size={20} />,     accent: "accent-cyan",    path: "/vendor/workers"       },
      { label: "Set Availability", icon: <CalendarDays size={20} />, accent: "accent-success", path: "/vendor/availability"  },
      { label: "Notifications",    icon: <Bell size={20} />,         accent: "accent-warning",  path: "/vendor/notifications" },
    ],
    []
  );
 
  const handleConfirm  = useCallback((id: string) => updateStatus(id, "confirmed"), [updateStatus]);
  const handleReject   = useCallback((id: string) => updateStatus(id, "cancelled"), [updateStatus]);
 
  const vendorFirstName = getVendorFirstName();
  const loading = bookingsLoading || workersLoading;
  const error   = bookingsError  || workersError;
 
  return (
    <VendorLayout>
      <div className="page-shell">
        {/* Header — always visible, even during load */}
        <PageHeader
          eyebrow="Overview"
          title={`Welcome back, ${vendorFirstName} 👋`}
          description="Here's what needs your attention today."
        />
 
        {loading ? (
          <LoadingState />
        ) : error ? (
          <div
            style={{
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:            12,
              padding:        "48px 0",
              color:          "var(--color-danger)",
              textAlign:      "center",
            }}
          >
            <AlertCircle size={32} />
            <p style={{ fontWeight: 600, fontSize: "1rem" }}>
              Could not load dashboard data
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
              {error}
            </p>
            <button
              className="btn btn--primary"
              onClick={() => window.location.reload()}
              style={{ marginTop: 8 }}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* ── KPI cards ─────────────────────────────────── */}
            <div className="metric-grid metric-grid--4">
              <MetricCard
                label="Total Bookings"
                value={bookings.length}
                icon={<CalendarCheck size={20} />}
                accent="accent-navy"
              />
              <MetricCard
                label="Pending Actions"
                value={kpis.pending}
                icon={<Clock3 size={20} />}
                accent="accent-warning"
              />
              <MetricCard
                label="Active Jobs"
                value={kpis.inProgress}
                icon={<Activity size={20} />}
                accent="accent-success"
              />
              <MetricCard
                label="Workers Available"
                value={`${approvedWorkers}/${workers.length}`}
                icon={<Users size={20} />}
                accent="accent-cyan"
              />
            </div>
 
            {/* ── Action Required + Revenue column ──────────── */}
            <div className="dashboard-grid-2">
              {/* Action Required */}
              <SectionCard
                title="⚡ Action Required"
                description={
                  pendingBookings.length > 0
                    ? `${pendingBookings.length} booking${pendingBookings.length > 1 ? "s" : ""} need your response`
                    : undefined
                }
              >
                {pendingBookings.length === 0 ? (
                  <div className="action-card">
                    <div className="action-card__content">
                      <p className="action-card__title">All caught up!</p>
                      <p className="action-card__subtitle">
                        No pending bookings require your attention right now.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="schedule-list">
                    {pendingBookings.map((b) => (
                      <div key={b.id} className="action-card action-card--warning">
                        <div className="action-card__content">
                          <p className="action-card__title">
                            {b.id} — {b.client.name}
                          </p>
                          <p className="action-card__subtitle">
                            {b.service.name} · {b.date} · {b.timeSlot}
                          </p>
                        </div>
                        <div className="action-card__actions">
                          <button
                            className="btn btn--success"
                            style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                            onClick={() => handleConfirm(b.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn--danger"
                            style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                            onClick={() => handleReject(b.id)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>
 
              {/* Revenue + Quick Actions */}
              <div className="settings-column">
                <MetricCard
                  label="Total Completed Revenue"
                  value={`₹${kpis.revenue.toLocaleString("en-IN")}`}
                  change={`${kpis.completed} completed booking${kpis.completed !== 1 ? "s" : ""}`}
                  icon={<Wallet size={20} />}
                  accent="accent-navy"
                />
 
                <SectionCard title="Quick Actions">
                  <div className="quick-actions-grid">
                    {quickActions.map((qa) => (
                      <button
                        key={qa.label}
                        className="quick-action"
                        onClick={() => navigate(qa.path)}
                      >
                        <div className={`quick-action__icon ${qa.accent}`}>
                          {qa.icon}
                        </div>
                        {qa.label}
                      </button>
                    ))}
                  </div>
                </SectionCard>
              </div>
            </div>
 
            {/* ── Recent Bookings + Upcoming Schedule ───────── */}
            <div className="dashboard-grid-3-2">
              {/* Recent Bookings */}
              <SectionCard
                title="Recent Bookings"
                actions={
                  <button
                    className="btn btn--outline"
                    onClick={() => navigate("/vendor/bookings")}
                  >
                    View All
                  </button>
                }
              >
                {recentBookings.length === 0 ? (
                  <EmptyState
                    title="No bookings yet"
                    description="Your most recent bookings will appear here."
                  />
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Client</th>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((b) => (
                          <tr
                            key={b.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/vendor/bookings")}
                          >
                            <td
                              style={{
                                fontWeight: 700,
                                color: "var(--color-brand-cyan)",
                              }}
                            >
                              {b.id}
                            </td>
                            <td>
                              <p className="admin-table__cell-primary">
                                {b.client.name}
                              </p>
                              <p className="admin-table__cell-sub">
                                {b.client.phone}
                              </p>
                            </td>
                            <td>{b.service.name}</td>
                            <td>{b.date}</td>
                            <td>
                              <BookingStatusBadge status={b.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </SectionCard>
 
              {/* Upcoming Schedule */}
              <SectionCard
                title="Upcoming Schedule"
                actions={
                  <button
                    className="btn btn--outline"
                    onClick={() => navigate("/vendor/schedule")}
                  >
                    View All
                  </button>
                }
              >
                <div className="schedule-list">
                  {upcomingSchedule.length === 0 ? (
                    <p
                      style={{
                        fontSize:  "0.875rem",
                        color:     "var(--color-text-muted)",
                        fontStyle: "italic",
                        padding:   "10px 0",
                      }}
                    >
                      No upcoming jobs scheduled.
                    </p>
                  ) : (
                    upcomingSchedule.map((s) => (
                      <div
                        key={s.id}
                        className="schedule-entry"
                        style={{
                          flexDirection: "column",
                          alignItems:    "flex-start",
                          gap:           4,
                        }}
                      >
                        <p className="schedule-time">
                          {s.date} · {s.timeSlot}
                        </p>
                        <p className="schedule-client">{s.clientName}</p>
                        <p className="schedule-service">
                          {s.service} ·{" "}
                          <span className="schedule-worker">{s.workerName}</span>
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </SectionCard>
            </div>
 
            {/* ── Workers Overview ───────────────────────────── */}
            <SectionCard
              title="Workers Overview"
              actions={
                <button
                  className="btn btn--outline"
                  onClick={() => navigate("/vendor/workers")}
                >
                  Manage Workers
                </button>
              }
            >
              {workers.length === 0 ? (
                <EmptyState
                  title="No workers registered"
                  description="Add your first worker to get started."
                  actionLabel="Add Worker"
                  onAction={() => navigate("/vendor/workers")}
                />
              ) : (
                <div className="dashboard-workers-grid">
                  {workers.slice(0, 5).map((w) => (
                    <WorkerPreviewCard key={getWorkerDisplayId(w)} worker={w} />
                  ))}
                </div>
              )}
            </SectionCard>
          </>
        )}
      </div>
    </VendorLayout>
  );
}
 
// ── Worker preview card ───────────────────────────────────────
// Extracted to avoid calling getWorkerFullName twice per worker
// and to keep the parent render function readable.
function WorkerPreviewCard({ worker }: { worker: Worker }) {
  const name     = getWorkerFullName(worker);
  const category = getWorkerServiceCategoryName(worker);
  const status   = worker.worker.verificationStatus;
 
  return (
    <div className="worker-preview">
      <WorkerAvatar name={name} />
      <div>
        <p className="worker-preview__name">{name}</p>
        <p className="worker-preview__skill">{category}</p>
        <p className="worker-preview__meta">
          <WorkerStatusBadge status={status} />
        </p>
      </div>
    </div>
  );
}