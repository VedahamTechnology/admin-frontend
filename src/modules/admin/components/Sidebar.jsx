import {
  LayoutDashboard,
  Users,
  Briefcase,
  UserCog,
  Layers3,
  CalendarCheck,
  Package,
  Wallet,
  Receipt,
  BookOpen,
  BarChart3,
  MessageSquare,
  BadgeIndianRupee,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "../../../components/shared/AppSidebar";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const adminUserStr = localStorage.getItem("user");
  const adminUser = adminUserStr ? JSON.parse(adminUserStr) : null;
  const profileName = adminUser 
    ? `${adminUser.firstName} ${adminUser.lastName || ""}`.trim() 
    : "Admin";
  const profileEmail = adminUser ? adminUser.email : "";
  const profileImage = adminUser ? adminUser.profileImage : undefined;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "All Users",
      path: "/users",
      icon: <Users size={20} />,
    },
    {
      label: "User Bookings",
      path: "/users/bookings",
      icon: <CalendarCheck size={20} />,
    },
    {
      label: "User Analytics",
      path: "/users/analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      label: "All Vendors",
      path: "/vendors",
      icon: <Briefcase size={20} />,
    },
    {
      label: "Vendor Services",
      path: "/vendors/services",
      icon: <Layers3 size={20} />,
    },
    {
      label: "All Workers",
      path: "/workers",
      icon: <UserCog size={20} />,
    },
    {
      label: "Worker Payments",
      path: "/workers/payments",
      icon: <Wallet size={20} />,
    },
    {
      label: "Categories",
      path: "/services/categories",
      icon: <Layers3 size={20} />,
    },
    {
      label: "Service List",
      path: "/services/list",
      icon: <Layers3 size={20} />,
    },
    {
      label: "Pricing",
      path: "/services/pricing",
      icon: <BadgeIndianRupee size={20} />,
    },
    {
      label: "Scrap Items",
      path: "/scrap",
      icon: <Package size={20} />,
    },
    {
      label: "Payments",
      path: "/payments",
      icon: <Wallet size={20} />,
    },
    {
      label: "Settlements",
      path: "/settlements",
      icon: <Receipt size={20} />,
    },
    {
      label: "User Catalog",
      path: "/catalog",
      icon: <BookOpen size={20} />,
    },
    {
      label: "Reports",
      path: "/reports",
      icon: <BarChart3 size={20} />,
    },
    {
      label: "Reviews",
      path: "/reviews",
      icon: <MessageSquare size={20} />,
    },
    {
      label: "Plans",
      path: "/plans",
      icon: <BadgeIndianRupee size={20} />,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <AppSidebar
      title="VEDAHAM"
      subtitle="Admin Control Center"
      items={menuItems}
      activePath={location.pathname + location.hash}
      profileName={profileName}
      profileEmail={profileEmail}
      profileImage={profileImage}
      onLogout={logout}
    />
  );
}
