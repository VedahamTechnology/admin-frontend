import AdminLayout from "../layouts/AdminLayout"
import { User, Shield, Bell, Globe, Save } from "lucide-react"

function Settings() {
  return (
    <AdminLayout>
      <div className="page-shell">
        {/* Header */}
        <div>
          <p className="page-header__eyebrow">System Configuration</p>
          <h1 className="page-header__title page-header__title--xl">Settings</h1>
          <p className="page-header__desc">
            Manage admin preferences and platform configuration.
          </p>
        </div>

        {/* Settings Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 24,
          }}
        >
          {/* Profile */}
          <div className="section-card">
            <div className="section-card__header">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <User />
                <h2 className="section-card__title">Profile Settings</h2>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input placeholder="Admin Name"  defaultValue="Admin"              className="admin-input" />
              <input placeholder="Email"       defaultValue="admin@homster.com"  className="admin-input" />
              <input placeholder="Phone"       defaultValue="+91 9876543210"     className="admin-input" />
            </div>
          </div>

          {/* Security */}
          <div className="section-card">
            <div className="section-card__header">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Shield />
                <h2 className="section-card__title">Security</h2>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Toggle title="Two Factor Authentication" />
              <Toggle title="Login Alerts" />
              <Toggle title="Session Protection" />
            </div>
          </div>

          {/* Notifications */}
          <div className="section-card">
            <div className="section-card__header">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Bell />
                <h2 className="section-card__title">Notifications</h2>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Toggle title="Email Notifications" />
              <Toggle title="Booking Alerts" />
              <Toggle title="Settlement Updates" />
            </div>
          </div>

          {/* Platform */}
          <div className="section-card">
            <div className="section-card__header">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Globe />
                <h2 className="section-card__title">Platform</h2>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <select className="admin-select" style={{ width: "100%" }}>
                <option>India</option>
                <option>UAE</option>
              </select>
              <select className="admin-select" style={{ width: "100%" }}>
                <option>INR ₹</option>
                <option>USD $</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save */}
        <div>
          <button className="btn btn--primary">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}

function Toggle({ title }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <p style={{ margin: 0, fontSize: "0.9rem" }}>{title}</p>
      <div
        style={{
          width: 48,
          height: 24,
          backgroundColor: "var(--color-brand-cyan)",
          borderRadius: "var(--radius-full)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 4,
            top: 4,
            width: 16,
            height: 16,
            backgroundColor: "#fff",
            borderRadius: "var(--radius-full)",
          }}
        />
      </div>
    </div>
  )
}

export default Settings
