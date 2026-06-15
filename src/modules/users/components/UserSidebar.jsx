import { LayoutDashboard, BookmarkCheck, CalendarCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "../../../components/shared/AppSidebar";

export default function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const customerUserStr = localStorage.getItem("user");
  const customerUser = customerUserStr ? JSON.parse(customerUserStr) : null;
  const profileName = customerUser 
    ? `${customerUser.firstName} ${customerUser.lastName || ""}`.trim() 
    : "Customer";
  const profileEmail = customerUser ? customerUser.email : "";
  const profileImage = customerUser ? customerUser.profileImage : undefined;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/user/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Bookings",
      path: "/user/dashboard#bookings",
      icon: <CalendarCheck size={20} />,
    },
    {
      label: "Saved Services",
      path: "/user/dashboard#saved-services",
      icon: <BookmarkCheck size={20} />,
    },
  ];

  return (
    <AppSidebar
      title="VEDAHAM"
      subtitle="Customer Portal"
      items={menuItems}
      activePath={location.pathname + location.hash}
      profileName={profileName}
      profileEmail={profileEmail}
      profileImage={profileImage}
      onLogout={logout}
    />
  );
}