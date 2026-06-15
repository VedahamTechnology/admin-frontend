import { useState, useMemo } from "react";
import { Calendar, List, Clock, User, Layers, UserCog } from "lucide-react";

import VendorLayout from "../Layouts/VendorLayout";

import {
  PageHeader,
  SectionCard,
  BookingStatusBadge,
  EmptyState,
  LoadingState,
} from "../Components/VendorUI";

import { useBookings, useWorkers } from "../hooks/useVendor";
import { getWorkerFullName, getWorkerServiceCategoryName } from "../types/vendor";
import type { ScheduleEntry, Worker } from "../types/vendor";

type ViewMode = "list" | "worker";

export default function VendorSchedule() {
  const { bookings, loading: bookingsLoading, error: bookingsError } = useBookings();
  const { workers, loading: workersLoading, error: workersError } = useWorkers();
  const [view, setView] = useState<ViewMode>("list");
  const [dateFilter, setDateFilter] = useState("");

  const scheduleEntries = useMemo(() => {
    return bookings.map((b) => {
      const workerName = b.assignedWorkers.length > 0 
        ? b.assignedWorkers.map(getWorkerFullName).join(", ") 
        : "Unassigned";

      return {
        id: b.id,
        bookingId: b.id,
        clientName: b.client.name,
        service: b.service.name,
        workerName,
        date: b.date,
        timeSlot: b.timeSlot,
        status: b.status,
      };
    });
  }, [bookings]);

  const filtered = useMemo(() => {
    return dateFilter
      ? scheduleEntries.filter((s) => s.date === dateFilter)
      : scheduleEntries;
  }, [scheduleEntries, dateFilter]);

  const loading = bookingsLoading || workersLoading;
  const error = bookingsError || workersError;

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
                disabled={loading}
              >
                <List size={16} /> List View
              </button>
              <button
                className={`btn ${view === "worker" ? "btn--primary" : "btn--outline"}`}
                onClick={() => setView("worker")}
                disabled={loading}
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
            disabled={loading}
          />
          {dateFilter && (
            <button 
              className="btn btn--outline" 
              style={{ fontSize: "0.8rem", padding: "8px 12px" }} 
              onClick={() => setDateFilter("")}
              disabled={loading}
            >
              Clear Filter
            </button>
          )}
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <div style={{ color: "var(--color-danger)", padding: "20px 0", textAlign: "center" }}>
            {error}
          </div>
        ) : view === "list" ? (
          <ListView entries={filtered} />
        ) : (
          <WorkerView entries={scheduleEntries} workers={workers} />
        )}
      </div>
    </VendorLayout>
  );
}

// ── List View ────────────────────────────────────────────────
function ListView({ entries }: { entries: ScheduleEntry[] }) {
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
function WorkerView({ entries, workers }: { entries: ScheduleEntry[]; workers: Worker[] }) {
  // Extract all unique worker names including "Unassigned"
  const workerNames = useMemo(() => {
    return [...new Set(entries.map((s) => s.workerName))];
  }, [entries]);

  if (workerNames.length === 0) {
    return <EmptyState title="No workers or jobs" description="There are no schedule entries available." />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {workerNames.map((workerName) => {
        const workerJobs = entries.filter((s) => s.workerName === workerName);
        
        // Find worker details if it's a real worker, not "Unassigned"
        const worker = workers.find((w) => getWorkerFullName(w) === workerName);

        return (
          <SectionCard
            key={workerName}
            title={workerName}
            description={worker ? getWorkerServiceCategoryName(worker) : "Jobs awaiting worker assignment."}
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
