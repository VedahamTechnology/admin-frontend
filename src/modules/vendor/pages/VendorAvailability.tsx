import { useState } from "react";
import {
  Plus,
  ToggleLeft,
  ToggleRight,
  CalendarDays,
} from "lucide-react";

import VendorLayout from "../Layouts/VendorLayout";

import {
  PageHeader,
  SectionCard,
  EmptyState,
} from "../Components/VendorUI";

import {
  useAvailability,
  useDisclosure,
} from "../hooks/useVendor";

import type { TimeSlot } from "../types/vendor";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SLOT_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  available: { bg: "var(--color-success-bg)",  text: "var(--color-success-text)",  label: "Available" },
  blocked:   { bg: "var(--color-danger-bg)",   text: "var(--color-danger-text)",   label: "Blocked"   },
  booked:    { bg: "rgba(5,175,199,0.12)",     text: "var(--color-brand-cyan)",    label: "Booked"    },
};

export default function VendorAvailability() {
  const { slots, toggleSlot, addSlot } = useAvailability();
  const addModal = useDisclosure();
  const [addForm, setAddForm] = useState({ day: "Monday", startTime: "09:00", endTime: "11:00" });

  const slotsByDay: Record<string, TimeSlot[]> = {};
  for (const day of DAYS) {
    slotsByDay[day] = slots.filter((s) => s.day === day);
  }

  const handleAddSlot = () => {
    addSlot({ ...addForm, status: "available" });
    addModal.close();
  };

  const summary = {
    available: slots.filter((s) => s.status === "available").length,
    blocked:   slots.filter((s) => s.status === "blocked").length,
    booked:    slots.filter((s) => s.status === "booked").length,
  };

  return (
    <VendorLayout>
      <div className="page-shell">
        <PageHeader
          eyebrow="Operations"
          title="Availability Management"
          description="Set your weekly availability, block slots and manage booking windows."
          actions={
            <button className="btn btn--primary" onClick={addModal.open}>
              <Plus size={16} /> Add Slot
            </button>
          }
        />

        {/* Summary */}
        <div className="metric-grid metric-grid--3">
          {(["available", "blocked", "booked"] as const).map((key) => (
            <div key={key} className="metric-card">
              <div>
                <p className="metric-card__label" style={{ textTransform: "capitalize" }}>{key} Slots</p>
                <p className="metric-card__value">{summary[key]}</p>
              </div>
              <div
                className="metric-card__icon"
                style={{ background: SLOT_COLORS[key].text }}
              >
                <CalendarDays size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Grid */}
        <SectionCard title="Weekly Schedule" description="Click a slot to toggle between Available and Blocked.">
          <div className="avail-grid">
            {DAYS.map((day) => (
              <div key={day} className="avail-day-card">
                <div className="avail-day-header">{day}</div>
                {slotsByDay[day].length === 0 ? (
                  <div style={{ padding: "12px 16px", fontSize: "0.8rem", color: "var(--color-text-muted)", fontStyle: "italic" }}>
                    No slots added
                  </div>
                ) : (
                  slotsByDay[day].map((slot) => {
                    const config = SLOT_COLORS[slot.status];
                    const isToggleable = slot.status !== "booked";
                    return (
                      <div key={slot.id} className="avail-slot">
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span className={`slot-dot slot-dot--${slot.status}`} />
                          <span style={{ fontWeight: 500 }}>
                            {slot.startTime} – {slot.endTime}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span
                            style={{
                              background: config.bg,
                              color: config.text,
                              borderRadius: 999,
                              padding: "2px 10px",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                            }}
                          >
                            {config.label}
                          </span>
                          {isToggleable && (
                            <button
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--color-text-muted)",
                                display: "flex",
                                padding: 0,
                              }}
                              title="Toggle availability"
                              onClick={() => toggleSlot(slot.id)}
                            >
                              {slot.status === "available"
                                ? <ToggleRight size={20} color="var(--color-success)" />
                                : <ToggleLeft size={20} />}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Add Slot Modal */}
      {addModal.isOpen && (
        <div className="modal-overlay" onClick={addModal.close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">Add Time Slot</h2>
              <button className="drawer__close" onClick={addModal.close}>×</button>
            </div>
            <div className="modal__body">
              <div className="form-field">
                <label className="form-label">Day</label>
                <select
                  className="admin-select"
                  style={{ width: "100%" }}
                  value={addForm.day}
                  onChange={(e) => setAddForm({ ...addForm, day: e.target.value })}
                >
                  {DAYS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-field">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    className="admin-input"
                    value={addForm.startTime}
                    onChange={(e) => setAddForm({ ...addForm, startTime: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">End Time</label>
                  <input
                    type="time"
                    className="admin-input"
                    value={addForm.endTime}
                    onChange={(e) => setAddForm({ ...addForm, endTime: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="modal__footer">
              <button className="btn btn--outline" onClick={addModal.close}>Cancel</button>
              <button className="btn btn--primary" onClick={handleAddSlot}>Add Slot</button>
            </div>
          </div>
        </div>
      )}
    </VendorLayout>
  );
}
