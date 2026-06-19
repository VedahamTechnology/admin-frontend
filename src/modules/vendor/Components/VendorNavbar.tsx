
import { mockVendorProfile } from "../constants/mockData";
import NotificationDropdown from "../../../components/shared/NotificationDropdown";

export default function VendorNavbar() {
  
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
        <NotificationDropdown />

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
