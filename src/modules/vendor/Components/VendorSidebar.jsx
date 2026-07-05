import {
  LayoutDashboard,
  CalendarCheck,
  UserCog,
  CalendarDays,
  Clock,
  Settings,
  User,
  ClipboardList,
  Wallet,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "../../../components/shared/AppSidebar";

export default function VendorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const vendorUserStr = localStorage.getItem("vendorUser");
  const vendorUser = vendorUserStr ? JSON.parse(vendorUserStr) : null;
  const profileName = vendorUser 
    ? `${vendorUser.firstName} ${vendorUser.lastName || ""}`.trim() 
    : "Vendor";
  const profileEmail = vendorUser ? vendorUser.email : "";
  const profileImage = vendorUser ? vendorUser.profileImage : undefined;

  const logout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorUser");
    navigate("/");
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/vendor/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    
    {
      label: "Bookings",
      path: "/vendor/bookings",
      icon: <CalendarCheck size={20} />,
    },
    {
      label: "Services",
      path: "/vendor/services",
      icon: <ClipboardList size={20} />,
    },
    {
      label: "Workers",
      path: "/vendor/workers",
      icon: <UserCog size={20} />,
    },
    {
      label: "Availability",
      path: "/vendor/availability",
      icon: <CalendarDays size={20} />,
    },
    {
      label: "Schedule",
      path: "/vendor/schedule",
      icon: <Clock size={20} />,
    },
    {
      label: "Payments",
      path: "/vendor/payments",
      icon: <Wallet size={20} />, // or IndianRupee, CreditCard
    },

    {
      label: "Settings",
      path: "/vendor/settings",
      icon: <Settings size={20} />,
    },
    {
      label: "Profile",
      path: "/vendor/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <AppSidebar
      title="VEDAHAM"
      subtitle="Vendor Portal"
      items={menuItems}
      activePath={location.pathname + location.hash}
      profileName={profileName}
      profileEmail={profileEmail}
      profileImage={profileImage}
      onLogout={logout}
    />
  );
}
