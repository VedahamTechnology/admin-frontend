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
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNotifications } from "../hooks/useVendor";

/* ── Sidebar menu structure with section grouping ──────────── */
const sections = [
  {
    label: "OVERVIEW",
    items: [
      {
        name: "Dashboard",
        path: "/vendor/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      {
        name: "Bookings",
        path: "/vendor/bookings",
        icon: <CalendarCheck size={18} />,
      },
      {
        name: "Workers",
        path: "/vendor/workers",
        icon: <UserCog size={18} />,
      },
    ],
  },
  {
    label: "PLANNING",
    items: [
      {
        name: "Availability",
        path: "/vendor/availability",
        icon: <CalendarDays size={18} />,
      },
      {
        name: "Schedule",
        path: "/vendor/schedule",
        icon: <Clock size={18} />,
      },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      {
        name: "Notifications",
        path: "/vendor/notifications",
        icon: <Bell size={18} />,
      },
      {
        name: "Settings",
        path: "/vendor/settings",
        icon: <Settings size={18} />,
      },
      {
        name: "Profile",
        path: "/vendor/profile",
        icon: <User size={18} />,
      },
    ],
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
      {/* Brand */}
      <div className="sidebar__brand">
        <h1 className="sidebar__brand-name">VEDAHAM</h1>
        <p className="sidebar__brand-sub">Vendor Portal</p>
      </div>

      {/* Navigation */}
      <nav className="vendor-sidebar__nav">
        {sections.map((section, sectionIdx) => (
          <div key={section.label}>
            <p
              className={`vendor-sidebar__section-label${
                sectionIdx > 0 ? " vendor-sidebar__section-label--spaced" : ""
              }`}
            >
              {section.label}
            </p>

            {section.items.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`vendor-sidebar__item${
                    isActive ? " vendor-sidebar__item--active" : ""
                  }`}
                >
                  {item.icon}

                  <span className="vendor-sidebar__item-label">
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
          </div>
        ))}
      </nav>

      {/* Logout */}
      <button onClick={logout} className="vendor-sidebar__logout">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}