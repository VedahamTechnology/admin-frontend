import {
  CalendarCheck,
  Clock3,
  CheckCircle,
  Users,
  Wallet,
  Plus,
  UserPlus,
  CalendarDays,
  Bell,
  AlertCircle,
  Activity,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import VendorLayout from "../Layouts/VendorLayout";

import {
  MetricCard,
  BookingStatusBadge,
  SectionCard,
  PageHeader,
  WorkerAvatar,
} from "../Components/VendorUI";

import {
  mockDashboardStats,
  mockSchedule,
  mockVendorProfile,
} from "../constants/mockData";

import { useBookings, useWorkers } from "../hooks/useVendor";
import {
  getWorkerDisplayId,
  getWorkerFullName,
  getWorkerServiceCategoryName,
} from "../types/vendor";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { bookings, updateStatus } = useBookings();
  const { workers } = useWorkers();
  const stats = mockDashboardStats;
  const vendor = mockVendorProfile;

  // Derived KPIs
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const activeJobs = bookings.filter((b) => b.status === "in_progress").length;
  const approvedWorkers = workers.filter(
    (w) => w.worker.verificationStatus === "approved"
  ).length;

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const upcomingSchedule = mockSchedule
    .filter((s) => s.status !== "completed" && s.status !== "cancelled")
    .slice(0, 4);

  const quickActions = [
    { label: "New Booking",      icon: <Plus size={20} />,        accent: "accent-navy",    path: "/vendor/bookings"      },
    { label: "Add Worker",       icon: <UserPlus size={20} />,    accent: "accent-cyan",    path: "/vendor/workers"       },
    { label: "Set Availability", icon: <CalendarDays size={20} />, accent: "accent-success", path: "/vendor/availability"  },
    { label: "Notifications",    icon: <Bell size={20} />,        accent: "accent-warning",  path: "/vendor/notifications" },
  ];

  return (
    <VendorLayout>
      <div className="page-shell">
        {/* Header */}
        <PageHeader
          eyebrow="Overview"
          title={`Welcome back, ${vendor.ownerName.split(" ")[0]} 👋`}
          description="Here's what needs your attention today."
        />

        {/* Metric Cards — Smarter KPIs */}
        <div className="metric-grid metric-grid--4">
          <MetricCard
            label="Total Bookings"
            value={stats.totalBookings}
            icon={<CalendarCheck size={20} />}
            accent="accent-navy"
          />
          <MetricCard
            label="Pending Actions"
            value={pendingBookings.length}
            icon={<Clock3 size={20} />}
            accent="accent-warning"
          />
          <MetricCard
            label="Active Jobs"
            value={activeJobs}
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

        {/* Action Required + Revenue */}
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
                        onClick={() => updateStatus(b.id, "confirmed")}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn--danger"
                        style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                        onClick={() => updateStatus(b.id, "cancelled")}
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
              label="Monthly Revenue"
              value={`₹${stats.monthlyRevenue.toLocaleString()}`}
              change={stats.revenueChange}
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
                    <div className={`quick-action__icon ${qa.accent}`}>{qa.icon}</div>
                    {qa.label}
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Recent Bookings + Upcoming Schedule */}
        <div className="dashboard-grid-3-2">
          {/* Recent Bookings */}
          <SectionCard
            title="Recent Bookings"
            actions={
              <button className="btn btn--outline" onClick={() => navigate("/vendor/bookings")}>
                View All
              </button>
            }
          >
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
                      <td style={{ fontWeight: 700, color: "var(--color-brand-cyan)" }}>
                        {b.id}
                      </td>
                      <td>{b.client.name}</td>
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
          </SectionCard>

          {/* Upcoming Schedule */}
          <SectionCard
            title="Upcoming Schedule"
            actions={
              <button className="btn btn--outline" onClick={() => navigate("/vendor/schedule")}>
                View All
              </button>
            }
          >
            <div className="schedule-list">
              {upcomingSchedule.map((s) => (
                <div key={s.id} className="schedule-entry" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                  <p className="schedule-time">{s.date} · {s.timeSlot}</p>
                  <p className="schedule-client">{s.clientName}</p>
                  <p className="schedule-service">
                    {s.service} · <span className="schedule-worker">{s.workerName}</span>
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Workers Overview */}
        <SectionCard
          title="Workers Overview"
          actions={
            <button className="btn btn--outline" onClick={() => navigate("/vendor/workers")}>
              Manage Workers
            </button>
          }
        >
          <div className="dashboard-workers-grid">
            {workers.slice(0, 5).map((w) => (
              <div key={getWorkerDisplayId(w)} className="worker-preview">
                <WorkerAvatar name={getWorkerFullName(w)} />

                <div>
                  <p className="worker-preview__name">
                    {getWorkerFullName(w)}
                  </p>

                  <p className="worker-preview__skill">
                    {getWorkerServiceCategoryName(w)}
                  </p>

                  <p className="worker-preview__meta">
                    <span
                      style={{
                        color:
                          w.worker.verificationStatus === "approved"
                            ? "var(--color-success)"
                            : w.worker.verificationStatus === "pending"
                            ? "orange"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {w.worker.verificationStatus}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </VendorLayout>
  );
}
