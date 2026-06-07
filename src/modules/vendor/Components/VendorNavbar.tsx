import { Bell } from "lucide-react";
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
          className="navbar__notif-link"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="navbar-notif-badge">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="navbar__user">
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
