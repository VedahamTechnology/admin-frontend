import { useState } from "react";
import { Calendar, List, Clock, User, Layers, UserCog } from "lucide-react";

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
        <div className="schedule-filter-bar">
          <label className="schedule-filter-label">Filter by Date:</label>
          <input
            type="date"
            className="admin-input"
            style={{ width: 200, padding: "8px 12px" }}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          {dateFilter && (
            <button className="btn btn--outline" style={{ fontSize: "0.8rem", padding: "8px 12px" }} onClick={() => setDateFilter("")}>
              Clear Filter
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
      <div className="schedule-list">
        {entries.map((s) => (
          <div key={s.id} className={`schedule-entry schedule-entry--${s.status}`}>
            <div className="schedule-entry__header">
              <div>
                <p className="schedule-time"><Clock size={14} /> {s.timeSlot}</p>
                <p className="schedule-date"><Calendar size={12} /> {s.date}</p>
              </div>
              <BookingStatusBadge status={s.status} />
            </div>
            
            <div className="schedule-entry__body">
              <p className="schedule-client"><User size={16} /> {s.clientName}</p>
              <p className="schedule-service"><Layers size={14} /> {s.service}</p>
            </div>
            
            <div className="schedule-entry__footer">
              <p className="schedule-worker"><UserCog size={14} /> {s.workerName}</p>
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
              <div className="schedule-list">
                {workerJobs.map((s) => (
                  <div key={s.id} className={`schedule-entry schedule-entry--${s.status}`}>
                    <div className="schedule-entry__header">
                      <div>
                        <p className="schedule-time"><Clock size={14} /> {s.timeSlot}</p>
                        <p className="schedule-date"><Calendar size={12} /> {s.date}</p>
                      </div>
                      <BookingStatusBadge status={s.status} />
                    </div>
                    <div className="schedule-entry__body">
                      <p className="schedule-client"><User size={16} /> {s.clientName}</p>
                      <p className="schedule-service"><Layers size={14} /> {s.service}</p>
                    </div>
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
