import { Bell } from "lucide-react"

function Navbar() {
  return (
    <header className="navbar">
      <input
        placeholder="Search..."
        className="navbar__search"
      />

      <div className="navbar__right">
        <Bell />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="navbar__avatar">A</div>

          <div>
            <p className="navbar__user-name">Admin</p>
            <p className="navbar__user-role">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
