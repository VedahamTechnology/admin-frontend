import { useMemo, useState } from "react";
import {
  Ban,
  CheckCircle,
  Clock3,
  Edit2,
  Eye,
  Plus,
  Search,
  Send,
  Trash2,
  Wrench,
  XCircle,
} from "lucide-react";

import VendorLayout from "../Layouts/VendorLayout";
import {
  EmptyState,
  MetricCard,
  PageHeader,
  SectionCard,
} from "../Components/VendorUI";
import ServiceModal, {
  type ServiceFormValues,
  type ServiceStatus,
  type VendorService,
} from "../Components/ServiceModal";
import { useDisclosure } from "../hooks/useVendor";

const categories = ["Electrical", "AC Services", "Plumbing", "Carpentry", "Cleaning"];

const mockServices: VendorService[] = [
  {
    id: "VS001",
    category: "Electrical",
    name: "Fan Installation",
    description: "Ceiling fan installation with wiring check and final safety testing.",
    price: 499,
    duration: 60,
    status: "approved",
  },
  {
    id: "VS002",
    category: "AC Services",
    name: "AC Repair",
    description: "Diagnosis and repair for common split and window AC cooling issues.",
    price: 1299,
    duration: 120,
    status: "pending",
  },
  {
    id: "VS003",
    category: "Plumbing",
    name: "Pipe Repair",
    description: "Leak inspection and repair for visible kitchen or bathroom pipelines.",
    price: 699,
    duration: 90,
    status: "rejected",
    rejectionReason:
      "Please add clearer service inclusions and confirm whether materials are included.",
  },
  {
    id: "VS004",
    category: "Electrical",
    name: "MCB Replacement",
    description: "Replacement of faulty MCB with load inspection and panel testing.",
    price: 649,
    duration: 45,
    status: "approved",
  },
];

const statusLabels: Record<ServiceStatus, string> = {
  approved: "Approved",
  pending: "Pending Approval",
  rejected: "Rejected",
};

const statusClasses: Record<ServiceStatus, string> = {
  approved: "badge badge--success",
  pending: "badge badge--warning",
  rejected: "badge badge--danger",
};

const filterOptions = [
  { value: "all", label: "All" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
] as const;

type StatusFilter = (typeof filterOptions)[number]["value"];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function ServiceStatusBadge({ status }: { status: ServiceStatus }) {
  return <span className={statusClasses[status]}>{statusLabels[status]}</span>;
}

export default function VendorServices() {
  const [services, setServices] = useState<VendorService[]>(mockServices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [editingService, setEditingService] = useState<VendorService | null>(null);
  const addModal = useDisclosure();
  const editModal = useDisclosure();

  const stats = useMemo(
    () => ({
      total: services.length,
      approved: services.filter((service) => service.status === "approved").length,
      pending: services.filter((service) => service.status === "pending").length,
      rejected: services.filter((service) => service.status === "rejected").length,
    }),
    [services]
  );

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" || service.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, services, statusFilter]);

  const openEdit = (service: VendorService) => {
    setEditingService(service);
    editModal.open();
  };

  const handleCreate = (values: ServiceFormValues) => {
    const newService: VendorService = {
      ...values,
      id: `VS${String(Date.now()).slice(-5)}`,
      status: "pending",
    };

    setServices((current) => [newService, ...current]);
    addModal.close();
  };

  const handleUpdate = (values: ServiceFormValues) => {
    if (!editingService) return;

    setServices((current) =>
      current.map((service) =>
        service.id === editingService.id
          ? {
              ...service,
              ...values,
              status: "pending",
              rejectionReason: undefined,
            }
          : service
      )
    );
    editModal.close();
    setEditingService(null);
  };

  const handleDelete = (serviceId: string) => {
    setServices((current) => current.filter((service) => service.id !== serviceId));
  };

  const handleDisable = (service: VendorService) => {
    window.alert(`${service.name} would be disabled once backend integration is ready.`);
  };

  const handleViewRejection = (service: VendorService) => {
    window.alert(service.rejectionReason || "No rejection reason provided.");
  };

  return (
    <VendorLayout>
      <div className="page-shell">
        <PageHeader
          title="Services"
          description="Manage all services offered by your business."
          actions={
            <button className="btn btn--primary" onClick={addModal.open}>
              <Plus size={16} /> Add Service
            </button>
          }
        />

        <div className="metric-grid metric-grid--4">
          <MetricCard
            label="Total Services"
            value={stats.total}
            icon={<Wrench size={20} />}
            accent="accent-navy"
          />
          <MetricCard
            label="Approved Services"
            value={stats.approved}
            icon={<CheckCircle size={20} />}
            accent="accent-success"
          />
          <MetricCard
            label="Pending Approval"
            value={stats.pending}
            icon={<Clock3 size={20} />}
            accent="accent-warning"
          />
          <MetricCard
            label="Rejected Services"
            value={stats.rejected}
            icon={<XCircle size={20} />}
            accent="accent-danger"
          />
        </div>

        <SectionCard title="All Services">
          <div className="table-toolbar service-toolbar">
            <div className="search-wrapper">
              <Search size={18} className="search-wrapper__icon" />
              <input
                className="admin-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by service name..."
              />
            </div>

            <div className="service-filter-group" aria-label="Filter services by status">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className={`service-filter-chip${
                    statusFilter === option.value ? " service-filter-chip--active" : ""
                  }`}
                  type="button"
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {services.length === 0 ? (
            <EmptyState
              title="No services created yet"
              description="Create your first service and submit it for admin approval."
              actionLabel="Add Service"
              onAction={addModal.open}
              icon={<Wrench size={20} />}
            />
          ) : filteredServices.length === 0 ? (
            <EmptyState
              title="No services found"
              description="Try changing your search or status filter."
              actionLabel="Add Service"
              onAction={addModal.open}
              icon={<Search size={20} />}
            />
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--min-wide services-table">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr key={service.id}>
                      <td>
                        <p className="admin-table__cell-primary">{service.name}</p>
                        <p className="admin-table__cell-sub">{service.description}</p>
                      </td>
                      <td>{service.category}</td>
                      <td>{formatCurrency(service.price)}</td>
                      <td>{service.duration} mins</td>
                      <td>
                        <ServiceStatusBadge status={service.status} />
                      </td>
                      <td>
                        <ServiceActions
                          service={service}
                          onEdit={() => openEdit(service)}
                          onDelete={() => handleDelete(service.id)}
                          onDisable={() => handleDisable(service)}
                          onViewRejection={() => handleViewRejection(service)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>

      {addModal.isOpen && (
        <ServiceModal
          categories={categories}
          onClose={addModal.close}
          onSubmit={handleCreate}
        />
      )}

      {editModal.isOpen && editingService && (
        <ServiceModal
          service={editingService}
          categories={categories}
          onClose={() => {
            editModal.close();
            setEditingService(null);
          }}
          onSubmit={handleUpdate}
        />
      )}
    </VendorLayout>
  );
}

function ServiceActions({
  service,
  onEdit,
  onDelete,
  onDisable,
  onViewRejection,
}: {
  service: VendorService;
  onEdit: () => void;
  onDelete: () => void;
  onDisable: () => void;
  onViewRejection: () => void;
}) {
  if (service.status === "approved") {
    return (
      <div className="service-actions">
        <button className="btn btn--outline service-action-btn" onClick={onEdit}>
          <Edit2 size={14} /> Edit
        </button>
        <button className="btn btn--danger service-action-btn" onClick={onDisable}>
          <Ban size={14} /> Disable
        </button>
      </div>
    );
  }

  if (service.status === "pending") {
    return (
      <div className="service-actions">
        <button className="btn btn--outline service-action-btn" onClick={onEdit}>
          <Edit2 size={14} /> Edit
        </button>
        <button className="btn btn--danger service-action-btn" onClick={onDelete}>
          <Trash2 size={14} /> Delete
        </button>
      </div>
    );
  }

  return (
    <div className="service-actions">
      <button className="btn btn--outline service-action-btn" onClick={onViewRejection}>
        <Eye size={14} /> View Rejection Reason
      </button>
      <button className="btn btn--primary service-action-btn" onClick={onEdit}>
        <Send size={14} /> Edit & Resubmit
      </button>
    </div>
  );
}
