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
} from "lucide-react";

import { useState } from "react";
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
  mockBookings,
  mockSchedule,
} from "../constants/mockData";

import { useBookings, useWorkers } from "../hooks/useVendor";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { bookings } = useBookings();
  const { workers }  = useWorkers();
  const stats = mockDashboardStats;

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
          eyebrow="Vendor Dashboard"
          title="Welcome back, Rahul 👋"
          description="Here's a snapshot of your business activity today."
        />

        {/* Metric Cards */}
        <div className="metric-grid metric-grid--4" style={{ gap: 16 }}>
          <MetricCard label="Total Bookings"    value={stats.totalBookings}    icon={<CalendarCheck size={20} />} accent="accent-navy"    />
          <MetricCard label="Pending"           value={stats.pendingBookings}   icon={<Clock3 size={20} />}       accent="accent-warning" />
          <MetricCard label="Completed Jobs"    value={stats.completedJobs}    icon={<CheckCircle size={20} />}  accent="accent-success" />
          <MetricCard label="Total Workers"     value={stats.totalWorkers}     icon={<Users size={20} />}        accent="accent-cyan"    />
        </div>

        {/* Revenue + Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Revenue */}
          <div className="metric-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <p className="metric-card__label">Monthly Revenue</p>
              <div className="metric-card__icon accent-navy" style={{ width: 40, height: 40 }}>
                <Wallet size={18} />
              </div>
            </div>
            <p className="metric-card__value">₹{stats.monthlyRevenue.toLocaleString()}</p>
            <p className="metric-card__change">{stats.revenueChange}</p>
          </div>

          {/* Quick Actions */}
          <SectionCard title="Quick Actions">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
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

        {/* Recent Bookings + Upcoming Schedule */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 24 }}>
          {/* Recent Bookings */}
          <SectionCard
            title="Recent Bookings"
            actions={
              <button className="btn btn--outline" style={{ fontSize: "0.8rem" }} onClick={() => navigate("/vendor/bookings")}>
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
                    <tr key={b.id} style={{ cursor: "pointer" }} onClick={() => navigate("/vendor/bookings")}>
                      <td style={{ fontWeight: 700, color: "var(--color-brand-cyan)" }}>{b.id}</td>
                      <td>{b.client.name}</td>
                      <td>{b.service.name}</td>
                      <td>{b.date}</td>
                      <td><BookingStatusBadge status={b.status} /></td>
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
              <button className="btn btn--outline" style={{ fontSize: "0.8rem" }} onClick={() => navigate("/vendor/schedule")}>
                View All
              </button>
            }
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {upcomingSchedule.map((s) => (
                <div key={s.id} className="schedule-entry" style={{ flexDirection: "column", gap: 4 }}>
                  <p className="schedule-time">{s.date} · {s.timeSlot}</p>
                  <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>{s.clientName}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", margin: 0 }}>
                    {s.service} · <span style={{ color: "var(--color-brand-cyan)" }}>{s.workerName}</span>
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
            <button className="btn btn--outline" style={{ fontSize: "0.8rem" }} onClick={() => navigate("/vendor/workers")}>
              Manage Workers
            </button>
          }
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {workers.slice(0, 5).map((w) => (
              <div key={w.id} className="worker-card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <WorkerAvatar name={w.name} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>{w.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", margin: "2px 0" }}>
                    {w.skills[0]}
                  </p>
                  <p style={{ fontSize: "0.75rem", margin: 0 }}>
                    <span style={{ color: "var(--color-success)", fontWeight: 600 }}>
                      {w.assignedJobs} active
                    </span>
                    <span style={{ color: "var(--color-text-muted)", marginLeft: 6 }}>
                      ⭐ {w.rating}
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
