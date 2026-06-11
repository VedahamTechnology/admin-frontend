import {
  LayoutDashboard,
  CalendarCheck,
  UserCog,
  CalendarDays,
  Clock,
  Bell,
  Settings,
  User,
  LogOut,
  ClipboardList,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNotifications } from "../hooks/useVendor";

/* ── Sidebar menu structure with section grouping ──────────── */
const menuItems = [
  {
    name: "Dashboard",
    path: "/vendor/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Notifications",
    path: "/vendor/notifications",
    icon: <Bell size={20} />,
  },
  {
    name: "Bookings",
    path: "/vendor/bookings",
    icon: <CalendarCheck size={20} />,
  },
  {
    name: "Services",
    path: "/vendor/services",
    icon: <ClipboardList size={20} />,
  },
  {
    name: "Workers",
    path: "/vendor/workers",
    icon: <UserCog size={20} />,
  },
  {
    name: "Availability",
    path: "/vendor/availability",
    icon: <CalendarDays size={20} />,
  },
  {
    name: "Schedule",
    path: "/vendor/schedule",
    icon: <Clock size={20} />,
  },
  {
    name: "Settings",
    path: "/vendor/settings",
    icon: <Settings size={20} />,
  },
  {
    name: "Profile",
    path: "/vendor/profile",
    icon: <User size={20} />,
  },
];

export default function VendorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  const logout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/");
  };

  return (
  <aside className="vendor-sidebar">
    {/* Top */}
    <div className="vendor-sidebar__top">
  <div className="vendor-sidebar__logo">
    <div className="vendor-sidebar__logo-icon">
      V
    </div>

    <div className="vendor-sidebar__brand">
      <h3>VEDAHAM</h3>
      <p>Vendor Portal</p>
    </div>
  </div>
</div>

    {/* Menu */}
    <nav className="vendor-sidebar__nav">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`vendor-sidebar__item ${
              isActive ? "vendor-sidebar__item--active" : ""
            }`}
          >
            <span className="vendor-sidebar__icon">
              {item.icon}
            </span>

            <span className="vendor-sidebar__label">
              {item.name}
            </span>

            {item.name === "Notifications" && unreadCount > 0 && (
              <span className="vendor-sidebar__badge">
                {unreadCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>

    <div className="vendor-sidebar__bottom">

  <div className="vendor-sidebar__profile">

  </div>


  <button
    onClick={logout}
    className="vendor-sidebar__logout"
  >
    <LogOut size={20}/>
    <span className="vendor-sidebar__label">
      Logout
    </span>
  </button>

</div>

  </aside>
);
}
