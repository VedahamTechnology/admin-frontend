import { useState } from "react";
import { Search, UserPlus, Edit2, Trash2, Star } from "lucide-react";
import VendorLayout from "../Layouts/VendorLayout";

import {
  PageHeader,
  SectionCard,
  WorkerStatusBadge,
  AvailabilityDot,
  WorkerAvatar,
  EmptyState,
} from "../Components/VendorUI";

import WorkerModal from "../Components/WorkerModal";

import { useWorkers, useDisclosure } from "../hooks/useVendor";

import type { Worker } from "../types/vendor";

export default function VendorWorkers() {
  const { workers, addWorker, updateWorker, deleteWorker } = useWorkers();
  const addModal  = useDisclosure();
  const editModal = useDisclosure();

  const [search, setSearch]             = useState("");
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = workers.filter((w) => {
    const q = search.toLowerCase();
    const matchSearch =
      w.name.toLowerCase().includes(q) ||
      w.phone.includes(q) ||
      w.skills.some((s) => s.toLowerCase().includes(q));
    const matchStatus = statusFilter === "all" || w.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openEdit = (w: Worker) => {
    setEditingWorker(w);
    editModal.open();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this worker?")) deleteWorker(id);
  };

  return (
    <VendorLayout>
      <div className="page-shell">
        <PageHeader
          eyebrow="Workforce"
          title="Worker Management"
          description="Manage your workers, skills, availability and job assignments."
          actions={
            <button className="btn btn--primary" onClick={addModal.open}>
              <UserPlus size={16} /> Add Worker
            </button>
          }
        />

        {/* Stats row */}
        <div className="metric-grid metric-grid--3">
          <div className="metric-card">
            <div>
              <p className="metric-card__label">Total Workers</p>
              <p className="metric-card__value">{workers.length}</p>
            </div>
            <div className="metric-card__icon accent-navy"><UserPlus size={20} /></div>
          </div>
          <div className="metric-card">
            <div>
              <p className="metric-card__label">Active</p>
              <p className="metric-card__value">{workers.filter((w) => w.status === "active").length}</p>
            </div>
            <div className="metric-card__icon accent-success"><Star size={20} /></div>
          </div>
          <div className="metric-card">
            <div>
              <p className="metric-card__label">Currently Busy</p>
              <p className="metric-card__value">{workers.filter((w) => w.availability === "busy").length}</p>
            </div>
            <div className="metric-card__icon accent-warning"><Star size={20} /></div>
          </div>
        </div>

        <SectionCard title="All Workers">
          {/* Toolbar */}
          <div className="table-toolbar">
            <div className="search-wrapper">
              <Search size={18} className="search-wrapper__icon" />
              <input
                placeholder="Search by name, phone, skill…"
                className="admin-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="admin-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No workers found"
              description="Add your first worker or adjust the search filters."
              actionLabel="Add Worker"
              onAction={addModal.open}
            />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 16,
              }}
            >
              {filtered.map((w) => (
                <WorkerCard
                  key={w.id}
                  worker={w}
                  onEdit={() => openEdit(w)}
                  onDelete={() => handleDelete(w.id)}
                />
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      {/* Add Modal */}
      {addModal.isOpen && (
        <WorkerModal
          onSave={addWorker}
          onClose={addModal.close}
        />
      )}

      {/* Edit Modal */}
      {editModal.isOpen && editingWorker && (
        <WorkerModal
          worker={editingWorker}
          onSave={(data) => updateWorker(editingWorker.id, data)}
          onClose={() => { editModal.close(); setEditingWorker(null); }}
        />
      )}
    </VendorLayout>
  );
}

// ── WorkerCard ───────────────────────────────────────────────
function WorkerCard({
  worker,
  onEdit,
  onDelete,
}: {
  worker: Worker;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="worker-card">
      {/* Top */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <WorkerAvatar name={worker.name} />
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.9375rem", margin: 0 }}>{worker.name}</p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", margin: "2px 0 0" }}>
              {worker.phone}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            className="btn btn--outline"
            style={{ padding: "6px 10px" }}
            onClick={onEdit}
          >
            <Edit2 size={14} />
          </button>
          <button
            className="btn btn--danger"
            style={{ padding: "6px 10px" }}
            onClick={onDelete}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {worker.skills.map((s) => (
          <span key={s} className="skill-tag">{s}</span>
        ))}
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          padding: "12px 0",
          borderTop: "1px solid var(--color-border)",
          marginBottom: 12,
        }}
      >
        {[
          { label: "Assigned", value: worker.assignedJobs  },
          { label: "Completed", value: worker.completedJobs },
          { label: "Rating",   value: `⭐ ${worker.rating}` },
        ].map(({ label, value }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <p style={{ fontWeight: 700, fontSize: "1rem", margin: 0 }}>{value}</p>
            <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <WorkerStatusBadge status={worker.status} />
        <AvailabilityDot status={worker.availability} />
      </div>
    </div>
  );
}
