import { useMemo, useState } from "react";
import { Loader2, X } from "lucide-react";
import type {
  CreateWorkerPayload,
  ServiceCategory,
  WorkerGender,
} from "../types/vendor";

interface Props {
  categories: ServiceCategory[];
  categoriesLoading?: boolean;
  error?: string;
  isSaving?: boolean;
  onSave: (data: CreateWorkerPayload) => Promise<void>;
  onClose: () => void;
}

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  gender: "male" as WorkerGender,
  aadharNumber: "",
  panNumber: "",
  serviceCategory: "",
  aadharFrontUrl: "",
};

export default function WorkerModal({
  categories,
  categoriesLoading = false,
  error,
  isSaving = false,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState(initialForm);

  const canSubmit = useMemo(
    () =>
      form.firstName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.password.length >= 8,
    [form.email, form.firstName, form.password, form.phone]
  );

  const buildPayload = (): CreateWorkerPayload => {
    const payload: CreateWorkerPayload = {
      firstName: form.firstName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
      gender: form.gender,
    };

    if (form.lastName.trim()) payload.lastName = form.lastName.trim();
    if (form.aadharNumber.trim()) payload.aadharNumber = form.aadharNumber.trim();
    if (form.panNumber.trim()) payload.panNumber = form.panNumber.trim();
    if (form.serviceCategory) payload.serviceCategory = form.serviceCategory;
    if (form.aadharFrontUrl.trim()) {
      payload.aadharFrontUrl = form.aadharFrontUrl.trim();
    }

    return payload;
  };

  const handleSubmit = async () => {
    if (!canSubmit || isSaving) return;
    await onSave(buildPayload());
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Add New Worker</h2>
          <button className="drawer__close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal__body">
          {error && (
            <div className="error-message" style={{ marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div className="form-grid-2">
            <div className="form-field">
              <label className="form-label form-label--required">First Name</label>
              <input
                className="admin-input"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="e.g. Rohit"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Last Name</label>
              <input
                className="admin-input"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="e.g. Kumar"
              />
            </div>

            <div className="form-field">
              <label className="form-label form-label--required">Email</label>
              <input
                className="admin-input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="worker@company.com"
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
              <label className="form-label form-label--required">Password</label>
              <input
                type="password"
                className="admin-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimum 8 characters"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Gender</label>
              <select
                className="admin-select"
                value={form.gender}
                onChange={(e) =>
                  setForm({ ...form, gender: e.target.value as WorkerGender })
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Aadhar Number</label>
              <input
                className="admin-input"
                value={form.aadharNumber}
                onChange={(e) => setForm({ ...form, aadharNumber: e.target.value })}
                placeholder="12 digit Aadhar number"
              />
            </div>

            <div className="form-field">
              <label className="form-label">PAN Number</label>
              <input
                className="admin-input"
                value={form.panNumber}
                onChange={(e) =>
                  setForm({ ...form, panNumber: e.target.value.toUpperCase() })
                }
                placeholder="ABCDE1234F"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Service Category</label>
              <select
                className="admin-select"
                value={form.serviceCategory}
                onChange={(e) =>
                  setForm({ ...form, serviceCategory: e.target.value })
                }
                disabled={categoriesLoading}
              >
                <option value="">
                  {categoriesLoading ? "Loading categories..." : "Select category"}
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Aadhar Front URL</label>
              <input
                className="admin-input"
                value={form.aadharFrontUrl}
                onChange={(e) =>
                  setForm({ ...form, aadharFrontUrl: e.target.value })
                }
                placeholder="https://..."
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
            disabled={!canSubmit || isSaving}
            style={{ opacity: !canSubmit || isSaving ? 0.5 : 1 }}
          >
            {isSaving && <Loader2 size={16} />}
            Add Worker
          </button>
        </div>
      </div>
    </div>
  );
}
