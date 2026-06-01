import { LayoutDashboard, BookmarkCheck, CalendarCheck, LogOut } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

function UserSidebar() {
  const navigate = useNavigate()

  const menu = [
    { name: "Dashboard", path: "/user/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Bookings", path: "/user/dashboard#bookings", icon: <CalendarCheck size={18} /> },
    { name: "Saved Services", path: "/user/dashboard#saved-services", icon: <BookmarkCheck size={18} /> },
  ]

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <h1 className="sidebar__brand-name">HOMSTER</h1>
        <p className="sidebar__brand-sub">Customer Portal</p>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__section-label">CORE</p>

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/user/dashboard"}
            className={({ isActive }) =>
              `sidebar-item${isActive && item.path === "/user/dashboard" ? " sidebar-item--active" : ""}`
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

export default UserSidebar