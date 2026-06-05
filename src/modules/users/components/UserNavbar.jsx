import { Bell } from "lucide-react"

function UserNavbar() {
  return (
    <header className="navbar">
      <input
        placeholder="Search bookings, services..."
        className="navbar__search"
      />

      <div className="navbar__right">
        <Bell />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="navbar__avatar">C</div>

          <div>
            <p className="navbar__user-name">Customer</p>
            <p className="navbar__user-role">Customer Portal</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default UserNavbar