import { useMemo, useState, useEffect } from "react";
 
import {
  getVendorServices,
  createService,
  updateService,
  deleteService,
  getCategories,
  type ApiService,
  type ServiceCategory,
  type ApprovalStatus,
} from "../services/serviceService";
 
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
  LoadingState,
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
 
const statusLabels: Record<ApprovalStatus, string> = {
  approved: "Approved",
  pending: "Pending Approval",
  rejected: "Rejected",
};
 
const statusClasses: Record<ApprovalStatus, string> = {
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
 
const getCategoryName = (category: ApiService["category"]): string =>
  typeof category === "string" ? category : category.name;
 
const getCategoryId = (category: ApiService["category"]): string =>
  typeof category === "string" ? category : category._id;
 
function ServiceStatusBadge({ status }: { status: ApprovalStatus }) {
  return <span className={statusClasses[status]}>{statusLabels[status]}</span>;
}
 
export default function VendorServices() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [editingService, setEditingService] = useState<ApiService | null>(null);
  const addModal = useDisclosure();
  const editModal = useDisclosure();
 
  const loadServices = async () => {
    try {
      const res = await getVendorServices();
      setServices(res.services || []);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };
 
  const loadCategories = async () => {
    try {
      const res = await getCategories();
      console.log("Categories API Response:", res);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };
 
  useEffect(() => {
    loadServices();
    loadCategories();
  }, []);
 
  const stats = useMemo(
    () => ({
      total: services.length,
      approved: services.filter((service) => service.approvalStatus === "approved").length,
      pending: services.filter((service) => service.approvalStatus === "pending").length,
      rejected: services.filter((service) => service.approvalStatus === "rejected").length,
    }),
    [services]
  );
 
  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();
 
    return services.filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" || service.approvalStatus === statusFilter;
 
      return matchesSearch && matchesStatus;
    });
  }, [search, services, statusFilter]);
 
  const openEdit = (service: ApiService) => {
    setEditingService(service);
    editModal.open();
  };
 
  const handleCreate = async (values: ServiceFormValues) => {
    try {
      await createService({
        name: values.name,
        description: values.description,
        category: values.category,
        basePrice: values.price,
        estimatedDuration: values.duration,
      });
 
      await loadServices();
      addModal.close();
    } catch (err) {
      console.error("Failed to create service:", err);
    }
  };
 
  const handleUpdate = async (values: ServiceFormValues) => {
    if (!editingService) return;
 
    try {
      await updateService(editingService._id, {
        name: values.name,
        description: values.description,
        basePrice: values.price,
        estimatedDuration: values.duration,
      });
 
      await loadServices();
    } catch (err) {
      console.error("Failed to update service:", err);
    }
 
    editModal.close();
    setEditingService(null);
  };
 
  const handleDelete = async (serviceId: string) => {
    try {
      await deleteService(serviceId);
      await loadServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };
 
  const handleDisable = (service: ApiService) => {
    window.alert(`${service.name} would be disabled once backend integration is ready.`);
  };
 
  const handleViewRejection = (service: ApiService) => {
    window.alert(service.rejectionReason || "No rejection reason provided.");
  };
 
  if (loading) {
    return (
      <VendorLayout>
        <div className="page-shell">
          <PageHeader
            title="Services"
            description="Manage all services offered by your business."
          />
          <LoadingState />
        </div>
      </VendorLayout>
    );
  }
 
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
                    <tr key={service._id}>
                      <td>
                        <p className="admin-table__cell-primary">{service.name}</p>
                        <p className="admin-table__cell-sub">{service.description}</p>
                      </td>
                      <td>{getCategoryName(service.category)}</td>
                      <td>{formatCurrency(service.basePrice)}</td>
                      <td>{service.estimatedDuration} mins</td>
                      <td>
                        <ServiceStatusBadge status={service.approvalStatus} />
                      </td>
                      <td>
                        <ServiceActions
                          service={service}
                          onEdit={() => openEdit(service)}
                          onDelete={() => handleDelete(service._id)}
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
          categories={categories.map((cat) => ({ label: cat.name, value: cat._id }))}
          onClose={addModal.close}
          onSubmit={handleCreate}
        />
      )}
 
      {editModal.isOpen && editingService && (
        <ServiceModal
          service={
            {
              id: editingService._id,
              name: editingService.name,
              description: editingService.description,
              category: getCategoryId(editingService.category),
              price: editingService.basePrice,
              duration: editingService.estimatedDuration,
              status: editingService.approvalStatus as ServiceStatus,
              rejectionReason: editingService.rejectionReason,
            } as VendorService
          }
          categories={categories.map((cat) => ({ label: cat.name, value: cat._id }))}
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
  service: ApiService;
  onEdit: () => void;
  onDelete: () => void;
  onDisable: () => void;
  onViewRejection: () => void;
}) {
  if (service.approvalStatus === "approved") {
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
 
  if (service.approvalStatus === "pending") {
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