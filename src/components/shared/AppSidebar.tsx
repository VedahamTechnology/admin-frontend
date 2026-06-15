import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import "../../modules/vendor/styles/vendor.css";

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface AppSidebarProps {
  title: string;
  subtitle: string;
  items: SidebarItem[];
  activePath: string;
  profileName: string;
  profileEmail?: string;
  profileImage?: string;
  onLogout: () => void;
}

export default function AppSidebar({
  title,
  subtitle,
  items,
  activePath,
  profileName,
  profileEmail,
  profileImage,
  onLogout,
}: AppSidebarProps) {
  const logoIcon = title ? title.charAt(0).toUpperCase() : "";

  return (
    <aside className="vendor-sidebar">
      {/* Top logo & brand */}
      <div className="vendor-sidebar__top">
        <div className="vendor-sidebar__logo">
          <div className="vendor-sidebar__logo-icon">
            {logoIcon}
          </div>

          <div className="vendor-sidebar__brand">
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <nav className="vendor-sidebar__nav" style={{ overflowY: "auto", scrollbarWidth: "none" }}>
        {items.map((item) => {
          // Check if active: exact match or hash match or subpath match
          const isActive = 
            activePath === item.path || 
            activePath.startsWith(item.path + "#") || 
            (item.path !== "/" && item.path !== "/user/dashboard" && activePath.startsWith(item.path + "/"));

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
                {item.label}
              </span>

              {item.badge !== undefined && item.badge > 0 && (
                <span className="vendor-sidebar__badge">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile & Logout at bottom */}
      <div className="vendor-sidebar__bottom">
        {profileName && (
          <div className="vendor-sidebar__profile">
            <div className="vendor-sidebar__avatar">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={profileName}
                  style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                profileName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="vendor-sidebar__profile-info">
              <h4>{profileName}</h4>
              {profileEmail && <p>{profileEmail}</p>}
            </div>
          </div>
        )}

        <button
          onClick={onLogout}
          className="vendor-sidebar__logout"
        >
          <LogOut size={20} />
          <span className="vendor-sidebar__label">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
