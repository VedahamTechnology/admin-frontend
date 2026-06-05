import { Routes, Route, Navigate } from "react-router-dom";
import VendorDashboard     from "../pages/vendor/VendorDashboard";
import VendorBookings      from "../pages/vendor/VendorBookings";
import VendorWorkers       from "../pages/vendor/VendorWorkers";
import VendorAvailability  from "../pages/vendor/VendorAvailability";
import VendorSchedule      from "../pages/vendor/VendorSchedule";
import VendorNotifications from "../pages/vendor/VendorNotifications";
import VendorSettings      from "../pages/vendor/VendorSettings";

/**
 * Mount this inside your BrowserRouter alongside existing admin routes.
 *
 * Usage in AppRoutes.jsx / AppRoutes.tsx:
 *   import VendorRoutes from "./routes/VendorRoutes";
 *   ...
 *   <VendorRoutes />
 */
export default function VendorRoutes() {
  return (
    <Routes>
      <Route path="/vendor" element={<Navigate to="/vendor/dashboard" replace />} />
      <Route path="/vendor/dashboard"     element={<VendorDashboard />} />
      <Route path="/vendor/bookings"      element={<VendorBookings />} />
      <Route path="/vendor/workers"       element={<VendorWorkers />} />
      <Route path="/vendor/availability"  element={<VendorAvailability />} />
      <Route path="/vendor/schedule"      element={<VendorSchedule />} />
      <Route path="/vendor/notifications" element={<VendorNotifications />} />
      <Route path="/vendor/settings"      element={<VendorSettings />} />
    </Routes>
  );
}
