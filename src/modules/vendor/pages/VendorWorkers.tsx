import { useEffect, useMemo, useState } from "react";
import { Activity, AlertCircle, Search, UserPlus, Users } from "lucide-react";
import VendorLayout from "../Layouts/VendorLayout";
import {
  createWorker,
  getServiceCategories,
  getWorkerErrorMessage,
  getWorkers,
} from "../services/workerService";

import {
  EmptyState,
  PageHeader,
  SectionCard,
  WorkerAvatar,
  WorkerStatusBadge,
} from "../Components/VendorUI";

import WorkerModal from "../Components/WorkerModal";

import { useDisclosure } from "../hooks/useVendor";

import type {
  CreateWorkerPayload,
  ServiceCategory,
  Worker,
  WorkerStatus,
} from "../types/vendor";

const getWorkerId = (worker: Worker) => worker._id || worker.id || worker.userId || worker.email;

const getWorkerName = (worker: Worker) =>
  [worker.firstName, worker.lastName].filter(Boolean).join(" ").trim() ||
  worker.email;

const getServiceCategoryName = (worker: Worker) => {
  const category = worker.worker?.serviceCategory;
  if (!category) return "No category assigned";
  if (typeof category === "string") return category;
  return category.name;
};

export default function VendorWorkers() {
  const addModal = useDisclosure();

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | WorkerStatus>("all");
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");

  const loadWorkers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getWorkers();
      setWorkers(res.workers);
    } catch (err) {
      setError(getWorkerErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      setCategoriesLoading(true);

      try {
        const res = await getServiceCategories();
        setCategories(res.data);
      } catch (err) {
        setModalError(getWorkerErrorMessage(err));
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return workers.filter((worker) => {
      const name = getWorkerName(worker).toLowerCase();
      const category = getServiceCategoryName(worker).toLowerCase();
      const status = worker.worker.verificationStatus;
      const matchSearch =
        !q ||
        name.includes(q) ||
        worker.phone.includes(q) ||
        worker.email.toLowerCase().includes(q) ||
        category.includes(q) ||
        worker.userId?.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter, workers]);

  const statusCounts = useMemo(
    () => ({
      total: workers.length,
      pending: workers.filter((worker) => worker.worker.verificationStatus === "pending").length,
      approved: workers.filter((worker) => worker.worker.verificationStatus === "approved").length,
      rejected: workers.filter((worker) => worker.worker.verificationStatus === "rejected").length,
    }),
    [workers]
  );

  const handleCreateWorker = async (payload: CreateWorkerPayload) => {
    setSaving(true);
    setModalError("");

    try {
      await createWorker(payload);
      addModal.close();
      await loadWorkers();
    } catch (err) {
      setModalError(getWorkerErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <VendorLayout>
      <div className="page-shell">
        <PageHeader
          eyebrow="Workforce"
          title="Worker Management"
          description="Manage worker approval requests and service categories."
          actions={
            <button
              className="btn btn--primary"
              onClick={() => {
                setModalError("");
                addModal.open();
              }}
            >
              <UserPlus size={16} /> Add Worker
            </button>
          }
        />

        <div className="metric-grid metric-grid--3">
          <div className="metric-card">
            <div>
              <p className="metric-card__label">Total Workers</p>
              <p className="metric-card__value">{statusCounts.total}</p>
            </div>
            <div className="metric-card__icon accent-navy">
              <Users size={20} />
            </div>
          </div>
          <div className="metric-card">
            <div>
              <p className="metric-card__label">Approved</p>
              <p className="metric-card__value">{statusCounts.approved}</p>
            </div>
            <div className="metric-card__icon accent-success">
              <Activity size={20} />
            </div>
          </div>
          <div className="metric-card">
            <div>
              <p className="metric-card__label">Pending Approval</p>
              <p className="metric-card__value">{statusCounts.pending}</p>
            </div>
            <div className="metric-card__icon accent-warning">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>

        <SectionCard title="All Workers">
          <div className="table-toolbar">
            <div className="search-wrapper">
              <Search size={18} className="search-wrapper__icon" />
              <input
                placeholder="Search by name, phone, email, category..."
                className="admin-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="admin-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | WorkerStatus)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {error && (
            <div className="empty-state">
              <div className="empty-state__icon-wrap">
                <AlertCircle size={20} />
              </div>
              <h3 className="empty-state__title">Could not load workers</h3>
              <p className="empty-state__desc">{error}</p>
              <button
                className="btn btn--primary"
                onClick={loadWorkers}
                style={{ marginTop: 24 }}
              >
                Retry
              </button>
            </div>
          )}

          {!error && loading ? (
            <div className="workers-grid">
              {[1, 2, 3].map((item) => (
                <div key={item} className="loading-card" style={{ height: 220 }} />
              ))}
            </div>
          ) : null}

          {!error && !loading && filtered.length === 0 ? (
            <EmptyState
              title="No workers found"
              description="Add your first worker or adjust the search filters."
              actionLabel="Add Worker"
              onAction={addModal.open}
            />
          ) : null}

          {!error && !loading && filtered.length > 0 ? (
            <div className="workers-grid">
              {filtered.map((worker) => (
                <WorkerCard key={getWorkerId(worker)} worker={worker} />
              ))}
            </div>
          ) : null}
        </SectionCard>
      </div>

      {addModal.isOpen && (
        <WorkerModal
          categories={categories}
          categoriesLoading={categoriesLoading}
          error={modalError}
          isSaving={saving}
          onSave={handleCreateWorker}
          onClose={addModal.close}
        />
      )}
    </VendorLayout>
  );
}

function WorkerCard({ worker }: { worker: Worker }) {
  const name = getWorkerName(worker);
  const categoryName = getServiceCategoryName(worker);
  const registeredOn = worker.worker.registeredOn || worker.createdAt;
  const documentUrl = worker.worker.documents?.aadharFront?.url;

  return (
    <div className="worker-card">
      <div className="worker-card__header">
        <div className="worker-card__identity">
          <WorkerAvatar name={name} />
          <div>
            <p className="worker-card__name">{name}</p>
            <p className="worker-card__phone">{worker.phone}</p>
          </div>
        </div>
        <WorkerStatusBadge status={worker.worker.verificationStatus} />
      </div>

      <div className="worker-card__skills">
        <span className="skill-tag">{categoryName}</span>
        {worker.gender && <span className="skill-tag">{worker.gender}</span>}
      </div>

      <div className="worker-card__stats">
        {[
          { label: "User ID", value: worker.userId || "-" },
          {
            label: "Aadhar",
            value: worker.worker.aadharNumber || "-",
          },
          { label: "PAN", value: worker.worker.panNumber || "-" },
        ].map(({ label, value }) => (
          <div key={label} className="worker-card__stat">
            <p className="worker-card__stat-value">{value}</p>
            <p className="worker-card__stat-label">{label}</p>
          </div>
        ))}
      </div>

      <div className="worker-card__footer">
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
          {registeredOn
            ? `Registered ${new Date(registeredOn).toLocaleDateString("en-IN")}`
            : "Registration date unavailable"}
        </span>
        {documentUrl ? (
          <a
            className="btn btn--outline"
            href={documentUrl}
            target="_blank"
            rel="noreferrer"
            style={{ padding: "6px 10px", fontSize: "0.8rem" }}
          >
            View Aadhar
          </a>
        ) : null}
      </div>

      {worker.worker.rejectionReason ? (
        <p style={{ margin: "12px 0 0", color: "var(--color-danger)", fontSize: "0.8125rem" }}>
          {worker.worker.rejectionReason}
        </p>
      ) : null}
    </div>
  );
}
