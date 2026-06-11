import { useState } from "react";
import { X } from "lucide-react";
import type { Worker } from "../types/vendor";
import { createWorker } from "../services/workerService";



interface Props {
  worker?: Worker;
  onSave: (data: Omit<Worker, "id">) => void;
  onClose: () => void;
}

export default function WorkerModal({ worker, onSave, onClose }: Props) {
  const isEdit = Boolean(worker);

const [form, setForm] = useState({
  firstName: "",
  lastName: "",

  email: "",
  phone: "",

  password: "",
  gender: "male",

  aadharNumber: "",
  panNumber: "",

  serviceCategory: "",

  aadharFrontUrl: "",
});

<div className="form-field">
  <label className="form-label form-label--required">
    Service Category
  </label>

  <select
    className="admin-select"
    value={form.serviceCategory}
    onChange={(e) =>
      setForm({
        ...form,
        serviceCategory: e.target.value,
      })
    }
  >
    <option value="">Select Service</option>

    <option value="Electrical Repair">
      Electrical Repair
    </option>

    <option value="AC Service">
      AC Service
    </option>

    <option value="Fan Installation">
      Fan Installation
    </option>

    <option value="Wiring">
      Wiring
    </option>

    <option value="MCB Replacement">
      MCB Replacement
    </option>

    <option value="Plumbing">
      Plumbing
    </option>

    <option value="Carpentry">
      Carpentry
    </option>
  </select>
</div>

 const handleSubmit = async () => {
  try {
    const res = await createWorker({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      gender: form.gender,
      aadharNumber: form.aadharNumber,
      panNumber: form.panNumber,
      serviceCategory: form.serviceCategory,
      aadharFrontUrl: form.aadharFrontUrl,
    });

    console.log("Worker Created:", res);

    onClose();
  } catch (err) {
    console.error("Create Worker Error:", err);
  }
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{isEdit ? "Edit Worker" : "Add New Worker"}</h2>
          <button className="drawer__close" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="modal__body">
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
              <label className="form-label form-label--required">Last Name</label>
              <input
                className="admin-input"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="e.g. Kumar"
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
                placeholder="Enter password"
              />
            </div>

            <div className="form-field">
              <label className="form-label form-label--required">Gender</label>
              <select
                className="admin-select"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label form-label--required">Aadhar Number</label>
              <input
                className="admin-input"
                value={form.aadharNumber}
                onChange={(e) => setForm({ ...form, aadharNumber: e.target.value })}
                placeholder="12 digit Aadhar Number"
              />
            </div>

            <div className="form-field">
              <label className="form-label form-label--required">PAN Number</label>
              <input
                className="admin-input"
                value={form.panNumber}
                onChange={(e) => setForm({ ...form, panNumber: e.target.value })}
                placeholder="ABCDE1234F"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Aadhar Front URL</label>
              <input
                className="admin-input"
                value={form.aadharFrontUrl}
                onChange={(e) => setForm({ ...form, aadharFrontUrl: e.target.value })}
                placeholder="https://..."
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
              <label className="form-label form-label--required">
                Service Category
              </label>

              <select
                className="admin-select"
                value={form.serviceCategory}
                onChange={(e) =>
                  setForm({
                    ...form,
                    serviceCategory: e.target.value,
                  })
                }
              >
                <option value="">Select Service</option>
                <option value="Electrical Repair">Electrical Repair</option>
                <option value="AC Service">AC Service</option>
                <option value="Fan Installation">Fan Installation</option>
                <option value="Wiring">Wiring</option>
                <option value="MCB Replacement">MCB Replacement</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Carpentry">Carpentry</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Status</label>
             <select
              className="admin-select"
              value={form.serviceCategory}
              onChange={(e) =>
                setForm({
                  ...form,
                  serviceCategory: e.target.value,
                })
              }
            >
              <option value="">Select Service</option>

              <option value="Electrical Repair">
                Electrical Repair
              </option>

              <option value="AC Service">
                AC Service
              </option>

              <option value="Fan Installation">
                Fan Installation
              </option>

              <option value="Wiring">
                Wiring
              </option>

              <option value="MCB Replacement">
                MCB Replacement
              </option>
            </select>

            </div>
          </div>

          <div className="form-field">
          <label className="form-label form-label--required">
            Service Category
          </label>

          <select
            className="admin-select"
            value={form.serviceCategory}
            onChange={(e) =>
              setForm({
                ...form,
                serviceCategory: e.target.value,
              })
            }
          >
            <option value="">Select Service</option>
            <option value="Electrical Repair">Electrical Repair</option>
            <option value="AC Service">AC Service</option>
            <option value="Fan Installation">Fan Installation</option>
            <option value="Wiring">Wiring</option>
            <option value="MCB Replacement">MCB Replacement</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Carpentry">Carpentry</option>
          </select>
          </div>

        </div>

        <div className="modal__footer">
          <button className="btn btn--outline" onClick={onClose}>Cancel</button>
          <button
            className="btn btn--primary"
            onClick={handleSubmit}
            disabled={!form.firstName || !form.phone}
            style={{ opacity: (!form.firstName || !form.phone) ? 0.5 : 1 }}
          >
            {isEdit ? "Save Changes" : "Add Worker"}
          </button>
        </div>
      </div>
    </div>
  );
}
