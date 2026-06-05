import { useState } from "react";
import { X, User, Briefcase, MapPin, Clock, MessageSquare, Users } from "lucide-react";
import type { Booking, Worker } from "../../types/vendor";
import { BookingStatusBadge, InfoRow, WorkerAvatar, SectionCard } from "./VendorUI";
import AssignWorkerModal from "./AssignWorkerModal";

interface Props {
  booking: Booking;
  workers: Worker[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: Booking["status"]) => void;
  onAssignWorkers: (bookingId: string, workers: Worker[]) => void;
}

export default function BookingDrawer({
  booking,
  workers,
  onClose,
  onUpdateStatus,
  onAssignWorkers,
}: Props) {
  const [showAssign, setShowAssign] = useState(false);

  const canConfirm   = booking.status === "pending";
  const canStart     = booking.status === "confirmed";
  const canComplete  = booking.status === "in_progress";
  const canCancel    = booking.status === "pending" || booking.status === "confirmed";

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer__header">
          <div>
            <h2 className="drawer__title">Booking Details</h2>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              {booking.id}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BookingStatusBadge status={booking.status} />
            <button className="drawer__close" onClick={onClose}><X size={16} /></button>
          </div>
        </div>

        <div className="drawer__body">
          {/* Client */}
          <p className="section-divider"><User size={12} style={{ display: "inline", marginRight: 6 }} />Client Information</p>
          <div className="info-grid">
            <InfoRow label="Name"  value={booking.client.name} />
            <InfoRow label="Phone" value={booking.client.phone} />
            <InfoRow label="Email" value={booking.client.email} />
          </div>
          <InfoRow label="Address" value={<span><MapPin size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />{booking.address}</span>} />

          {/* Service */}
          <p className="section-divider"><Briefcase size={12} style={{ display: "inline", marginRight: 6 }} />Service Information</p>
          <div className="info-grid">
            <InfoRow label="Service"  value={booking.service.name} />
            <InfoRow label="Category" value={booking.service.category} />
            <InfoRow label="Amount"   value={`₹${booking.amount.toLocaleString()}`} />
            <InfoRow label="Duration" value={`${booking.service.duration} min`} />
          </div>

          {/* Date & Time */}
          <p className="section-divider"><Clock size={12} style={{ display: "inline", marginRight: 6 }} />Date & Time</p>
          <div className="info-grid">
            <InfoRow label="Date"      value={booking.date} />
            <InfoRow label="Time Slot" value={booking.timeSlot} />
            <InfoRow label="Created"   value={new Date(booking.createdAt).toLocaleString("en-IN")} />
          </div>

          {/* Notes */}
          {booking.notes && (
            <>
              <p className="section-divider"><MessageSquare size={12} style={{ display: "inline", marginRight: 6 }} />Notes</p>
              <div
                style={{
                  background: "var(--color-neutral-bg)",
                  borderRadius: "var(--radius-xl)",
                  padding: "12px 16px",
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                {booking.notes}
              </div>
            </>
          )}

          {/* Assigned Workers */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <p className="section-divider" style={{ margin: 0 }}>
              <Users size={12} style={{ display: "inline", marginRight: 6 }} />Assigned Workers
            </p>
            {booking.status !== "completed" && booking.status !== "cancelled" && (
              <button
                className="btn btn--outline"
                style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                onClick={() => setShowAssign(true)}
              >
                {booking.assignedWorkers.length > 0 ? "Reassign" : "Assign"}
              </button>
            )}
          </div>

          {booking.assignedWorkers.length === 0 ? (
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", fontStyle: "italic" }}>
              No workers assigned yet.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {booking.assignedWorkers.map((w) => (
                <div
                  key={w.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-xl)",
                  }}
                >
                  <WorkerAvatar name={w.name} size="sm" />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>{w.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", margin: 0 }}>
                      {w.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Footer */}
        {(canConfirm || canStart || canComplete || canCancel) && (
          <div className="drawer__footer">
            {canCancel && (
              <button
                className="btn btn--danger"
                style={{ marginRight: "auto" }}
                onClick={() => { onUpdateStatus(booking.id, "cancelled"); onClose(); }}
              >
                Reject
              </button>
            )}
            {canConfirm && (
              <button
                className="btn btn--success"
                onClick={() => { onUpdateStatus(booking.id, "confirmed"); onClose(); }}
              >
                Confirm Booking
              </button>
            )}
            {canStart && (
              <button
                className="btn btn--primary"
                onClick={() => { onUpdateStatus(booking.id, "in_progress"); onClose(); }}
              >
                Mark In Progress
              </button>
            )}
            {canComplete && (
              <button
                className="btn btn--success"
                onClick={() => { onUpdateStatus(booking.id, "completed"); onClose(); }}
              >
                Mark Completed
              </button>
            )}
          </div>
        )}
      </div>

      {showAssign && (
        <AssignWorkerModal
          booking={booking}
          workers={workers}
          onAssign={onAssignWorkers}
          onClose={() => setShowAssign(false)}
        />
      )}
    </>
  );
}
