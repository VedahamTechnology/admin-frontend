import { type FormEvent, useEffect, useState } from "react";
import { Send, X } from "lucide-react";

export type ServiceStatus = "approved" | "pending" | "rejected";

export interface VendorService {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  status: ServiceStatus;
  rejectionReason?: string;
}

export type ServiceFormValues = Omit<VendorService, "id" | "status" | "rejectionReason">;

interface ServiceModalProps {
  service?: VendorService | null;
  categories: string[];
  onClose: () => void;
  onSubmit: (values: ServiceFormValues) => void;
}

const emptyForm: ServiceFormValues = {
  category: "",
  name: "",
  description: "",
  price: 0,
  duration: 60,
};

export default function ServiceModal({
  service,
  categories,
  onClose,
  onSubmit,
}: ServiceModalProps) {
  const isEdit = Boolean(service);
  const [form, setForm] = useState<ServiceFormValues>(emptyForm);

  useEffect(() => {
    if (service) {
      setForm({
        category: service.category,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
      });
      return;
    }

    setForm(emptyForm);
  }, [service]);

  const canSubmit = Boolean(
    form.category.trim() &&
    form.name.trim() &&
    form.description.trim() &&
    Number(form.price) > 0 &&
    Number(form.duration) > 0
  );

  const updateField = <K extends keyof ServiceFormValues>(
    key: K,
    value: ServiceFormValues[K]
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    onSubmit({
      ...form,
      price: Number(form.price),
      duration: Number(form.duration),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--lg" onClick={(event) => event.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal__header">
            <div>
              <h2 className="modal__title">
                {isEdit ? "Edit Service" : "Add Service"}
              </h2>
              <p className="modal__subtitle">
                {isEdit
                  ? "Update service details and submit again for admin review."
                  : "Create a service under an admin-created category."}
              </p>
            </div>
            <button type="button" className="drawer__close" onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div className="modal__body">
            <div className="form-grid-2">
              <div className="form-field">
                <label className="form-label form-label--required">Category</label>
                <select
                  className="admin-select"
                  value={form.category}
                  onChange={(event) => updateField("category", event.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label form-label--required">Service Name</label>
                <input
                  className="admin-input"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="e.g. Fan Installation"
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label form-label--required">Base Price</label>
                <input
                  className="admin-input"
                  type="number"
                  min="1"
                  value={form.price || ""}
                  onChange={(event) => updateField("price", Number(event.target.value))}
                  placeholder="e.g. 499"
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label form-label--required">
                  Duration (minutes)
                </label>
                <input
                  className="admin-input"
                  type="number"
                  min="1"
                  value={form.duration || ""}
                  onChange={(event) => updateField("duration", Number(event.target.value))}
                  placeholder="e.g. 60"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label form-label--required">Description</label>
              <textarea
                className="admin-input service-modal__textarea"
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Describe what is included in this service."
                required
              />
            </div>
          </div>

          <div className="modal__footer">
            <button type="button" className="btn btn--outline" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={!canSubmit}
              style={{ opacity: canSubmit ? 1 : 0.55 }}
            >
              <Send size={16} /> Submit For Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
