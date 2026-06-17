import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
  const logoIcon = title ? title.charAt(0).toUpperCase() : "";

  const closeMobile = () => setIsOpen(false);

  // Prevent background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className="vendor-sidebar__mobile-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      )}

      {isOpen && (
        <div
          className="vendor-sidebar__backdrop"
          aria-hidden="true"
          onClick={closeMobile}
        />
      )}

      <aside className={`vendor-sidebar ${isOpen ? "vendor-sidebar--open" : ""}`}>
        <button
          type="button"
          className="vendor-sidebar__mobile-close"
          onClick={closeMobile}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>

        {/* Top logo & brand */}
        <div className="vendor-sidebar__top">
          <div className="vendor-sidebar__logo">
            <div className="vendor-sidebar__logo-icon">{logoIcon}</div>

            <div className="vendor-sidebar__brand">
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <nav
          className="vendor-sidebar__nav"
          style={{ overflowY: "auto", scrollbarWidth: "none" }}
        >
          {items.map((item) => {
            const isActive =
              activePath === item.path ||
              activePath.startsWith(item.path + "#") ||
              (item.path !== "/" &&
                item.path !== "/user/dashboard" &&
                activePath.startsWith(item.path + "/"));

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobile}
                className={`vendor-sidebar__item ${
                  isActive ? "vendor-sidebar__item--active" : ""
                }`}
              >
                <span className="vendor-sidebar__icon">
                  {item.icon}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="vendor-sidebar__dot" />
                  )}
                </span>

                <span className="vendor-sidebar__label">{item.label}</span>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="vendor-sidebar__badge">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile & Logout at bottom */}
        <div className="vendor-sidebar__bottom">

          <button onClick={onLogout} className="vendor-sidebar__logout">
            <LogOut  />
            <span className="vendor-sidebar__label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}