import { useState } from "react";
import { X } from "lucide-react";
import type { Worker } from "../../types/vendor";

const ALL_SKILLS = [
  "Electrical Repair", "AC Service", "Fan Installation",
  "Wiring", "MCB Replacement", "Plumbing", "Carpentry",
];

interface Props {
  worker?: Worker;
  onSave: (data: Omit<Worker, "id">) => void;
  onClose: () => void;
}

export default function WorkerModal({ worker, onSave, onClose }: Props) {
  const isEdit = Boolean(worker);

  const [form, setForm] = useState({
    name:         worker?.name         ?? "",
    phone:        worker?.phone        ?? "",
    email:        worker?.email        ?? "",
    skills:       worker?.skills       ?? [] as string[],
    status:       worker?.status       ?? "active" as Worker["status"],
    availability: worker?.availability ?? "available" as Worker["availability"],
    assignedJobs:  worker?.assignedJobs  ?? 0,
    completedJobs: worker?.completedJobs ?? 0,
    rating:        worker?.rating        ?? 4.5,
    joinedDate:    worker?.joinedDate    ?? new Date().toISOString().slice(0, 10),
  });

  const toggleSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{isEdit ? "Edit Worker" : "Add New Worker"}</h2>
          <button className="drawer__close" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="modal__body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <div className="form-field">
              <label className="form-label form-label--required">Full Name</label>
              <input
                className="admin-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Rohit Kumar"
              />
            </div>
            <div className="form-field">
              <label className="form-label form-label--required">Phone</label>
              <input
                className="admin-input"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="10-digit mobile number"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                className="admin-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="worker@company.com"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Status</label>
              <select
                className="admin-select"
                style={{ width: "100%" }}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Worker["status"] })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Skills / Services</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ALL_SKILLS.map((skill) => {
                const selected = form.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={selected ? "btn btn--primary" : "btn btn--outline"}
                    style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button className="btn btn--outline" onClick={onClose}>Cancel</button>
          <button
            className="btn btn--primary"
            onClick={handleSubmit}
            disabled={!form.name || !form.phone}
            style={{ opacity: (!form.name || !form.phone) ? 0.5 : 1 }}
          >
            {isEdit ? "Save Changes" : "Add Worker"}
          </button>
        </div>
      </div>
    </div>
  );
}
