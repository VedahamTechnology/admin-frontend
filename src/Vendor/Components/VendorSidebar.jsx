import { CalendarCheck, Layers3, LayoutDashboard, LogOut, UserCog } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

function VendorSidebar() {
  const navigate = useNavigate()

  const menu = [
    { name: "Dashboard", path: "/vendor/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Bookings", path: "/vendor/bookings", icon: <CalendarCheck size={18} /> },
    { name: "Services", path: "/vendor/services", icon: <Layers3 size={18} /> },
    { name: "Profile", path: "/vendor/profile", icon: <UserCog size={18} /> },
  ]

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/vendor/login")
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <h1 className="sidebar__brand-name">HOMSTER</h1>
        <p className="sidebar__brand-sub">Vendor Control Center</p>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__section-label">CORE</p>

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item${isActive ? " sidebar-item--active" : ""}`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <button onClick={logout} className="sidebar__logout">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  )
}

export default VendorSidebar