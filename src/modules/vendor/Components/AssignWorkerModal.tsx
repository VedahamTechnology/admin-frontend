// import { useState } from "react";
// import { X, Check } from "lucide-react";
// import type { Worker, Booking } from "../types/vendor";
// import { WorkerAvatar, AvailabilityDot } from "./VendorUI";

// interface Props {
//   booking: Booking;
//   workers: Worker[];
//   onAssign: (bookingId: string, workers: Worker[]) => void;
//   onClose: () => void;
// }

// export default function AssignWorkerModal({ booking, workers, onAssign, onClose }: Props) {
//   const [selected, setSelected] = useState<string[]>(
//     booking.assignedWorkers.map((w) => w.id)
//   );

//   const toggle = (id: string) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const handleAssign = () => {
//     const assigned = workers.filter((w) => selected.includes(w.id));
//     onAssign(booking.id, assigned);
//     onClose();
//   };

//   const activeWorkers = workers.filter((w) => w.status === "active");

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal" onClick={(e) => e.stopPropagation()}>
//         <div className="modal__header">
//           <h2 className="modal__title">Assign Workers</h2>
//           <button className="drawer__close" onClick={onClose}><X size={16} /></button>
//         </div>

//         <div className="modal__body">
//           {/* Booking Summary */}
//           <div
//             style={{
//               background: "var(--color-neutral-bg)",
//               borderRadius: "var(--radius-xl)",
//               padding: "12px 16px",
//               marginBottom: 20,
//               fontSize: "0.875rem",
//             }}
//           >
//             <strong>{booking.id}</strong> — {booking.service.name}
//             <span style={{ color: "var(--color-text-secondary)", marginLeft: 8 }}>
//               {booking.date} · {booking.timeSlot}
//             </span>
//           </div>

//           <p className="section-divider">Select Workers</p>

//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {activeWorkers.map((worker) => {
//               const isSelected = selected.includes(worker.id);
//               return (
//                 <div
//                   key={worker.id}
//                   className={`worker-select-item${isSelected ? " worker-select-item--selected" : ""}`}
//                   onClick={() => toggle(worker.id)}
//                 >
//                   <WorkerAvatar name={worker.name} />
//                   <div style={{ flex: 1 }}>
//                     <p style={{ fontWeight: 600, fontSize: "0.9rem", margin: 0 }}>{worker.name}</p>
//                     <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", margin: 0 }}>
//                       {worker.skills.slice(0, 2).join(", ")}
//                     </p>
//                   </div>
//                   <AvailabilityDot status={worker.availability} />
//                   <div
//                     style={{
//                       width: 22,
//                       height: 22,
//                       borderRadius: 6,
//                       border: `2px solid ${isSelected ? "var(--color-brand-cyan)" : "var(--color-border)"}`,
//                       background: isSelected ? "var(--color-brand-cyan)" : "transparent",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       flexShrink: 0,
//                     }}
//                   >
//                     {isSelected && <Check size={12} color="#fff" />}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {selected.length > 0 && (
//             <p style={{ marginTop: 16, fontSize: "0.8rem", color: "var(--color-brand-cyan)", fontWeight: 600 }}>
//               {selected.length} worker{selected.length > 1 ? "s" : ""} selected
//             </p>
//           )}
//         </div>

//         <div className="modal__footer">
//           <button className="btn btn--outline" onClick={onClose}>Cancel</button>
//           <button
//             className="btn btn--primary"
//             onClick={handleAssign}
//             disabled={selected.length === 0}
//             style={{ opacity: selected.length === 0 ? 0.5 : 1 }}
//           >
//             Assign {selected.length > 0 ? `(${selected.length})` : ""}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { X, Check } from "lucide-react";
import type { Worker, Booking } from "../types/vendor";
import { getWorkerDisplayId, getWorkerFullName, getWorkerServiceCategoryName } from "../types/vendor";
import { WorkerAvatar, WorkerStatusBadge } from "./VendorUI";
 
interface Props {
  booking: Booking;
  workers: Worker[];
  onAssign: (bookingId: string, workers: Worker[]) => void;
  onClose: () => void;
}
 
export default function AssignWorkerModal({ booking, workers, onAssign, onClose }: Props) {
  const [selected, setSelected] = useState<string[]>(
    booking.assignedWorkers.map((w) => getWorkerDisplayId(w))
  );
 
  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
 
  const handleAssign = () => {
    const assigned = workers.filter((w) => selected.includes(getWorkerDisplayId(w)));
    onAssign(booking.id, assigned);
    onClose();
  };
 
  const activeWorkers = workers.filter((w) => w.worker.verificationStatus === "approved");
 
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Assign Workers</h2>
          <button className="drawer__close" onClick={onClose}><X size={16} /></button>
        </div>
 
        <div className="modal__body">
          {/* Booking Summary */}
          <div
            style={{
              background: "var(--color-neutral-bg)",
              borderRadius: "var(--radius-xl)",
              padding: "12px 16px",
              marginBottom: 20,
              fontSize: "0.875rem",
            }}
          >
            <strong>{booking.id}</strong> — {booking.service.name}
            <span style={{ color: "var(--color-text-secondary)", marginLeft: 8 }}>
              {booking.date} · {booking.timeSlot}
            </span>
          </div>
 
          <p className="section-divider">Select Workers</p>
 
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {activeWorkers.map((worker) => {
              const workerId = getWorkerDisplayId(worker);
              const isSelected = selected.includes(workerId);
              return (
                <div
                  key={workerId}
                  className={`worker-select-item${isSelected ? " worker-select-item--selected" : ""}`}
                  onClick={() => toggle(workerId)}
                >
                  <WorkerAvatar name={getWorkerFullName(worker)} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem", margin: 0 }}>
                      {getWorkerFullName(worker)}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", margin: 0 }}>
                      {getWorkerServiceCategoryName(worker)}
                    </p>
                  </div>
                  <WorkerStatusBadge status={worker.worker.verificationStatus} />
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: `2px solid ${isSelected ? "var(--color-brand-cyan)" : "var(--color-border)"}`,
                      background: isSelected ? "var(--color-brand-cyan)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isSelected && <Check size={12} color="#fff" />}
                  </div>
                </div>
              );
            })}
          </div>
 
          {selected.length > 0 && (
            <p style={{ marginTop: 16, fontSize: "0.8rem", color: "var(--color-brand-cyan)", fontWeight: 600 }}>
              {selected.length} worker{selected.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>
 
        <div className="modal__footer">
          <button className="btn btn--outline" onClick={onClose}>Cancel</button>
          <button
            className="btn btn--primary"
            onClick={handleAssign}
            disabled={selected.length === 0}
            style={{ opacity: selected.length === 0 ? 0.5 : 1 }}
          >
            Assign {selected.length > 0 ? `(${selected.length})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
 
