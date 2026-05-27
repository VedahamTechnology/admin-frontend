import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Briefcase,
  Wallet,
  Settings,
  LogOut,
  UserCog,
  Package,
  Receipt,
  BookOpen,
  MessageSquare,
  BadgeIndianRupee,
  ChevronDown,
  Layers3,
  BarChart3,
} from "lucide-react"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Users",
      icon: <Users size={18} />,
      children: [
        { name: "All Users",       path: "/users" },
        { name: "User Bookings",   path: "/users/bookings" },
        { name: "User Analytics",  path: "/users/analytics" },
      ],
    },
    {
      name: "Vendors",
      icon: <Briefcase size={18} />,
      children: [
        { name: "All Vendors",     path: "/vendors" },
        { name: "Vendor Services", path: "/vendors/services" },
      ],
    },
    {
      name: "Workers",
      icon: <UserCog size={18} />,
      children: [
        { name: "All Workers",      path: "/workers" },
        { name: "Worker Payments",  path: "/workers/payments" },
      ],
    },
    {
      name: "Bookings",
      icon: <CalendarCheck size={18} />,
      children: [
        { name: "Active",    path: "/bookings" },
        { name: "Pending",   path: "/bookings/pending" },
        { name: "Completed", path: "/bookings/completed" },
      ],
    },
    { name: "Scrap Items",     path: "/scrap",           icon: <Package size={18} /> },
    { name: "Payments",        path: "/payments",        icon: <Wallet size={18} /> },
    { name: "Settlements",     path: "/settlements",     icon: <Receipt size={18} /> },
    { name: "User Catalog",    path: "/catalog",         icon: <BookOpen size={18} /> },
    { name: "Vendor Services", path: "/vendor-services", icon: <Layers3 size={18} /> },
    { name: "Reports",         path: "/reports",         icon: <BarChart3 size={18} /> },
    { name: "Reviews",         path: "/reviews",         icon: <MessageSquare size={18} /> },
    { name: "Plans",           path: "/plans",           icon: <BadgeIndianRupee size={18} /> },
    { name: "Settings",        path: "/settings",        icon: <Settings size={18} /> },
  ]

  const [openMenu, setOpenMenu] = useState(() => {
    for (const item of menu) {
      if (item.children) {
        const activeChild = item.children.find(
          (child) => location.pathname === child.path
        )
        if (activeChild) return item.name
      }
    }
    return null
  })

  useEffect(() => {
    for (const item of menu) {
      if (item.children) {
        const activeChild = item.children.find(
          (child) => location.pathname === child.path
        )
        if (activeChild) {
          setOpenMenu(item.name)
          return
        }
      }
    }
  }, [location.pathname])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar__brand">
        <h1 className="sidebar__brand-name">HOMSTER</h1>
        <p className="sidebar__brand-sub">Admin Control Center</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        <p className="sidebar__section-label">CORE</p>

        {menu.map((item) => (
          <div key={item.name}>
            {item.name === "Payments" && (
              <p className="sidebar__section-label sidebar__section-label--spaced">
                MANAGEMENT
              </p>
            )}
            {item.name === "Reports" && (
              <p className="sidebar__section-label sidebar__section-label--spaced">
                ANALYTICS
              </p>
            )}

            {item.children ? (
              <>
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === item.name ? null : item.name)
                  }
                  className="sidebar-item-btn"
                >
                  <span className="sidebar-item-btn__inner">
                    {item.icon}
                    {item.name}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`sidebar-item-btn__chevron${
                      openMenu === item.name
                        ? " sidebar-item-btn__chevron--open"
                        : ""
                    }`}
                  />
                </button>

                {openMenu === item.name && (
                  <div className="sidebar-submenu">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`sidebar-subitem${
                          location.pathname === sub.path
                            ? " sidebar-subitem--active"
                            : ""
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`sidebar-item${
                  location.pathname === item.path ? " sidebar-item--active" : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <button onClick={logout} className="sidebar__logout">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
