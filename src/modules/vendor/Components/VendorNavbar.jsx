import { Bell } from "lucide-react"

function VendorNavbar() {
  return (
    <header className="navbar">
      <input
        placeholder="Search bookings, services..."
        className="navbar__search"
      />

      <div className="navbar__right">
        <Bell />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="navbar__avatar">V</div>

          <div>
            <p className="navbar__user-name">Vendor</p>
            <p className="navbar__user-role">Vendor Portal</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default VendorNavbar