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

const menu = [
  {
    name: "Dashboard",
    path: "/vendor/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
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
];

export default function VendorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  const logout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/vendor/login");
  };

  return (
    <aside
      className="sidebar"
      style={{
        background: "#0a2540",
        width: "280px",
        minWidth: "280px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Brand */}
      <div className="sidebar__brand">
        <h1
          style={{
            color: "#fff",
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          VEDAHAM
        </h1>

        <p
          style={{
            color: "#9fb3c8",
            fontSize: "0.9rem",
          }}
        >
          Vendor Portal
        </p>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: "16px",
        }}
      >
        <p
          style={{
            color: "#7f96b0",
            fontSize: "0.75rem",
            letterSpacing: "2px",
            marginBottom: "16px",
          }}
        >
          MENU
        </p>

        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                marginBottom: "8px",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#fff",
                background: isActive ? "#163d72" : "transparent",
              }}
            >
              {item.icon}

              <span style={{ flex: 1 }}>{item.name}</span>

              {item.name === "Notifications" && unreadCount > 0 && (
                <span
                  style={{
                    background: "#00cfe8",
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "2px 8px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px" }}>
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: "#1c2f6f",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}