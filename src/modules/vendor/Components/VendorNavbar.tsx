import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { mockVendorProfile } from "../constants/mockData";
import { useNotifications } from "../hooks/useVendor";

export default function VendorNavbar() {
  const { unreadCount } = useNotifications();
  const vendor = mockVendorProfile;

  const initials = vendor.ownerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="navbar">
      <input placeholder="Search bookings, workers…" className="navbar__search" />

      <div className="navbar__right">
        <Link
          to="/vendor/notifications"
          style={{ position: "relative", color: "var(--color-text-secondary)", display: "flex" }}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                width: 16,
                height: 16,
                borderRadius: 999,
                background: "var(--color-brand-cyan)",
                color: "#fff",
                fontSize: "0.6rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {unreadCount}
            </span>
          )}
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="navbar__avatar">{initials}</div>
          <div>
            <p className="navbar__user-name">{vendor.ownerName}</p>
            <p className="navbar__user-role">{vendor.businessName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
