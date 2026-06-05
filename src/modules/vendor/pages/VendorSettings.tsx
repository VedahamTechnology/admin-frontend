import { useState } from "react";
import {
  Save,
  Upload,
  Building2,
  Phone,
  MapPin,
  Clock,
  Briefcase,
} from "lucide-react";

import VendorLayout from "../Layouts/VendorLayout";

import {
  PageHeader,
  SectionCard,
} from "../Components/VendorUI";

import { mockVendorProfile } from "../constants/mockData";

const ALL_SERVICES = [
  "Electrical Repair", "AC Service", "Fan Installation",
  "Wiring", "MCB Replacement", "Plumbing", "Carpentry",
  "Painting", "Deep Cleaning", "Pest Control",
];

export default function VendorSettings() {
  const [form, setForm] = useState({ ...mockVendorProfile });
  const [saved, setSaved] = useState(false);

  const set = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleService = (svc: string) => {
    const current = form.servicesOffered;
    set(
      "servicesOffered",
      current.includes(svc) ? current.filter((s) => s !== svc) : [...current, svc]
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <VendorLayout>
      <div className="page-shell">
        <PageHeader
          eyebrow="Account"
          title="Profile & Settings"
          description="Update your business information, contact details and service offerings."
          actions={
            <button className="btn btn--primary" onClick={handleSave}>
              <Save size={16} />
              {saved ? "Saved!" : "Save Changes"}
            </button>
          }
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Business Info */}
          <SectionCard
            title="Business Information"
            description="Your business profile visible to clients."
          >
            {/* Logo Upload */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 20,
                padding: "16px",
                border: "2px dashed var(--color-border)",
                borderRadius: "var(--radius-xl)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-brand-navy)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {form.businessName.slice(0, 1)}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>Upload Logo</p>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", margin: "4px 0 0" }}>
                  PNG, JPG up to 2MB
                </p>
              </div>
              <button className="btn btn--outline" style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
                <Upload size={14} /> Upload
              </button>
            </div>

            <div className="form-field">
              <label className="form-label form-label--required">Business Name</label>
              <input className="admin-input" value={form.businessName} onChange={(e) => set("businessName", e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label form-label--required">Owner Name</label>
              <input className="admin-input" value={form.ownerName} onChange={(e) => set("ownerName", e.target.value)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input className="admin-input" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label">Phone</label>
                <input className="admin-input" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: "var(--color-success-bg)",
                borderRadius: "var(--radius-xl)",
                fontSize: "0.875rem",
                color: "var(--color-success-text)",
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              ⭐ {form.rating} · {form.totalReviews} Reviews &nbsp;·&nbsp; Member since {form.joinedDate}
            </div>
          </SectionCard>

          {/* Address */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionCard title="Address" description="Your service area and location.">
              <div className="form-field">
                <label className="form-label">Street Address</label>
                <input className="admin-input" value={form.address} onChange={(e) => set("address", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <div className="form-field">
                  <label className="form-label">City</label>
                  <input className="admin-input" value={form.city} onChange={(e) => set("city", e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">State</label>
                  <input className="admin-input" value={form.state} onChange={(e) => set("state", e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">PIN Code</label>
                  <input className="admin-input" value={form.pincode} onChange={(e) => set("pincode", e.target.value)} />
                </div>
              </div>
            </SectionCard>

            {/* Working Hours */}
            <SectionCard title="Working Hours">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-field">
                  <label className="form-label">Opens At</label>
                  <input
                    type="time"
                    className="admin-input"
                    value={form.workingHours.from}
                    onChange={(e) => set("workingHours", { ...form.workingHours, from: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Closes At</label>
                  <input
                    type="time"
                    className="admin-input"
                    value={form.workingHours.to}
                    onChange={(e) => set("workingHours", { ...form.workingHours, to: e.target.value })}
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Services Offered */}
        <SectionCard
          title="Services Offered"
          description="Select all services your business provides to clients."
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {ALL_SERVICES.map((svc) => {
              const selected = form.servicesOffered.includes(svc);
              return (
                <button
                  key={svc}
                  type="button"
                  onClick={() => toggleService(svc)}
                  className={selected ? "btn btn--primary" : "btn btn--outline"}
                  style={{ fontSize: "0.875rem" }}
                >
                  {svc}
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* Save */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn--primary" onClick={handleSave} style={{ padding: "12px 28px" }}>
            <Save size={16} />
            {saved ? "Changes Saved!" : "Save All Changes"}
          </button>
        </div>
      </div>
    </VendorLayout>
  );
}
