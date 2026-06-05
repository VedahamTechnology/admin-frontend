import { useState } from "react";
import { Calendar, List } from "lucide-react";

import VendorLayout from "../Layouts/VendorLayout";

import {
  PageHeader,
  SectionCard,
  BookingStatusBadge,
  EmptyState,
} from "../Components/VendorUI";

import {
  mockSchedule,
  mockWorkers,
} from "../constants/mockData";

type ViewMode = "list" | "worker";

export default function VendorSchedule() {
  const [view, setView] = useState<ViewMode>("list");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = dateFilter
    ? mockSchedule.filter((s) => s.date === dateFilter)
    : mockSchedule;

  return (
    <VendorLayout>
      <div className="page-shell">
        <PageHeader
          eyebrow="Planning"
          title="Schedule Management"
          description="View upcoming jobs, daily bookings and worker-wise assignments."
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className={`btn ${view === "list" ? "btn--primary" : "btn--outline"}`}
                onClick={() => setView("list")}
              >
                <List size={16} /> List View
              </button>
              <button
                className={`btn ${view === "worker" ? "btn--primary" : "btn--outline"}`}
                onClick={() => setView("worker")}
              >
                <Calendar size={16} /> By Worker
              </button>
            </div>
          }
        />

        {/* Date Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 600 }}>Filter by Date:</label>
          <input
            type="date"
            className="admin-input"
            style={{ width: 200 }}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          {dateFilter && (
            <button className="btn btn--outline" style={{ fontSize: "0.8rem" }} onClick={() => setDateFilter("")}>
              Clear
            </button>
          )}
        </div>

        {view === "list" ? (
          <ListView entries={filtered} />
        ) : (
          <WorkerView entries={mockSchedule} />
        )}
      </div>
    </VendorLayout>
  );
}

// ── List View ────────────────────────────────────────────────
function ListView({ entries }: { entries: typeof mockSchedule }) {
  if (entries.length === 0) {
    return <EmptyState title="No jobs scheduled" description="No bookings found for selected date." />;
  }

  return (
    <SectionCard title="Upcoming Jobs">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {entries.map((s) => (
          <div key={s.id} className="schedule-entry">
            <div style={{ minWidth: 140 }}>
              <p className="schedule-time">{s.timeSlot}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: 0 }}>{s.date}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: "0.9rem", margin: 0 }}>{s.clientName}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", margin: "2px 0 0" }}>
                {s.service}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "0.8rem", color: "var(--color-brand-cyan)", fontWeight: 600, margin: 0 }}>
                {s.workerName}
              </p>
              <div style={{ marginTop: 4 }}>
                <BookingStatusBadge status={s.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ── Worker View ──────────────────────────────────────────────
function WorkerView({ entries }: { entries: typeof mockSchedule }) {
  const workerNames = [...new Set(entries.map((s) => s.workerName))];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {workerNames.map((workerName) => {
        const workerJobs = entries.filter((s) => s.workerName === workerName);
        const worker = mockWorkers.find((w) => w.name === workerName);

        return (
          <SectionCard
            key={workerName}
            title={workerName}
            description={worker ? worker.skills.join(" · ") : ""}
          >
            {workerJobs.length === 0 ? (
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", fontStyle: "italic" }}>
                No jobs scheduled.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {workerJobs.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-xl)",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>{s.clientName}</p>
                      <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", margin: "2px 0 0" }}>
                        {s.service} · {s.date} · {s.timeSlot}
                      </p>
                    </div>
                    <BookingStatusBadge status={s.status} />
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        );
      })}
    </div>
  );
}
