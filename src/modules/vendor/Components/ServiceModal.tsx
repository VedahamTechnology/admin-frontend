import { useState } from "react";
import { X } from "lucide-react";
 
export type ServiceStatus = "pending" | "approved" | "rejected";
 
export interface CategoryOption {
  label: string;
  value: string;
}
 
export interface VendorService {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  status?: string;
  rejectionReason?: string;
}
 
export interface ServiceFormValues {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  status?: string;
  rejectionReason?: string;
}
 
interface Props {
  service?: VendorService;
  categories: CategoryOption[];
  onSubmit: (data: ServiceFormValues) => void;
  onClose: () => void;
}
 
export default function ServiceModal({ service, categories, onSubmit, onClose }: Props) {
  const isEditMode = Boolean(service);
 
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [category, setCategory] = useState(service?.category || "");
  const [price, setPrice] = useState(
    service?.price !== undefined ? String(service.price) : ""
  );
  const [duration, setDuration] = useState(
    service?.duration !== undefined ? String(service.duration) : ""
  );
 
  const priceValue = Number(price);
  const durationValue = Number(duration);
 
  const isValid =
    name.trim().length > 0 &&
    description.trim().length > 0 &&
    category.trim().length > 0 &&
    price.trim().length > 0 &&
    !Number.isNaN(priceValue) &&
    priceValue > 0 &&
    duration.trim().length > 0 &&
    !Number.isNaN(durationValue) &&
    durationValue > 0;
 
  const handleSubmit = () => {
    if (!isValid) return;
 
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      category,
      price: priceValue,
      duration: durationValue,
    });
  };
 
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{isEditMode ? "Edit Service" : "Add Service"}</h2>
          <button className="drawer__close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
 
        <div className="modal__body">
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Service Name *</label>
            <input
              className="admin-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AC Repair & Service"
            />
          </div>
 
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Description *</label>
            <textarea
              className="admin-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this service includes"
              rows={3}
            />
          </div>
 
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Category *</label>
            <select
              className="admin-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
 
          <div style={{ display: "flex", gap: 12 }}>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label className="form-label">Base Price *</label>
              <input
                className="admin-input"
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 499"
              />
            </div>
 
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label className="form-label">Duration (minutes) *</label>
              <input
                className="admin-input"
                type="number"
                min="0"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 60"
              />
            </div>
          </div>
        </div>
 
        <div className="modal__footer">
          <button className="btn btn--outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn--primary"
            onClick={handleSubmit}
            disabled={!isValid}
            style={{ opacity: isValid ? 1 : 0.5 }}
          >
            {isEditMode ? "Save Changes" : "Add Service"}
          </button>
        </div>
      </div>
    </div>
  );
}
 