import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login              from "../pages/Login"
import Register           from "../pages/Register"
import Dashboard          from "../pages/Dashboard"
import Users              from "../pages/Users"
import Providers          from "../pages/Providers"
import Services           from "../pages/Services"
import Bookings           from "../pages/Bookings"
import Payments           from "../pages/Payments"
import Notifications      from "../pages/Notifications"
import Reports            from "../pages/Reports"
import Settings           from "../pages/Settings"
import UserBookings       from "../pages/UserBookings"
import UserAnalytics      from "../pages/UserAnalytics"
import ProviderBookings   from "../pages/ProviderBookings"
import ProviderAnalytics  from "../pages/ProviderAnalytics"
import Categories         from "../pages/Categories"
import ServiceList        from "../pages/ServiceList"
import Pricing            from "../pages/Pricing"
import PendingBookings    from "../pages/PendingBookings"
import CompletedBookings  from "../pages/CompletedBookings"
import CancelledBookings  from "../pages/CancelledBookings"
import Transactions       from "../pages/Transactions"
import Settlements        from "../pages/Settlements"
import Workers            from "../pages/Workers"
import WorkerPayments     from "../pages/WorkerPayments"
import AdminVendorServices from "../pages/VendorServices"
import ScrapItems         from "../pages/ScrapItems"
import UserCatalog        from "../pages/UserCatalog"
import Reviews            from "../pages/Reviews"
import Plans              from "../pages/Plans"
import VendorDashboard    from "../modules/vendor/pages/VendorDashboard"
import VendorBookings     from "../modules/vendor/pages/VendorBookings"
import VendorProfile      from "../modules/vendor/pages/VendorProfile"
import UserDashboard      from "../modules/users/pages/UserDashboard"
import VendorWorkers      from "../modules/vendor/pages/VendorWorkers";
import VendorAvailability from "../modules/vendor/pages/VendorAvailability";
import VendorSchedule     from "../modules/vendor/pages/VendorSchedule";
import VendorNotifications from "../modules/vendor/pages/VendorNotifications";
import VendorSettings      from "../modules/vendor/pages/VendorSettings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                     element={<Login />} />
        <Route path="/register"            element={<Register />} />
        <Route path="/dashboard"            element={<Dashboard />} />
        <Route path="/users"                element={<Users />} />
        <Route path="/users/bookings"       element={<UserBookings />} />
        <Route path="/users/analytics"      element={<UserAnalytics />} />
        <Route path="/vendors"              element={<Providers />} />
        <Route path="/vendors/services"     element={<AdminVendorServices />} />
        <Route path="/vendor-services"      element={<AdminVendorServices />} />
        <Route path="/providers"            element={<Providers />} />
        <Route path="/providers/bookings"   element={<ProviderBookings />} />
        <Route path="/providers/analytics"  element={<ProviderAnalytics />} />
        <Route path="/workers"              element={<Workers />} />
        <Route path="/workers/payments"     element={<WorkerPayments />} />
        <Route path="/bookings"             element={<Bookings />} />
        <Route path="/bookings/pending"     element={<PendingBookings />} />
        <Route path="/bookings/completed"   element={<CompletedBookings />} />
        <Route path="/bookings/cancelled"   element={<CancelledBookings />} />
        <Route path="/scrap"                element={<ScrapItems />} />
        <Route path="/payments"             element={<Payments />} />
        <Route path="/payments/transactions" element={<Transactions />} />
        <Route path="/settlements"          element={<Settlements />} />
        <Route path="/catalog"              element={<UserCatalog />} />
        <Route path="/services"             element={<Services />} />
        <Route path="/services/categories"  element={<Categories />} />
        <Route path="/services/list"        element={<ServiceList />} />
        <Route path="/services/pricing"     element={<Pricing />} />
        <Route path="/notifications"        element={<Notifications />} />
        <Route path="/reports"              element={<Reports />} />
        <Route path="/plans"                element={<Plans />} />
        <Route path="/reviews"              element={<Reviews />} />
        <Route path="/settings"             element={<Settings />} />
        <Route path="/vendor/login"         element={<Login />} />
        <Route path="/vendor/dashboard"     element={<VendorDashboard />} />
        <Route path="/vendor/bookings"      element={<VendorBookings />} />
        <Route path="/vendor/profile"       element={<VendorProfile />} />
        <Route path="/user/dashboard"       element={<UserDashboard />} />
        <Route path="/vendor/workers"       element={<VendorWorkers />} />
        <Route path="/vendor/availability"  element={<VendorAvailability />} />
        <Route path="/vendor/schedule"      element={<VendorSchedule />} />
        <Route path="/vendor/notifications" element={<VendorNotifications />} />
        <Route path="/vendor/settings"      element={<VendorSettings />} />
        <Route path="/vendor/profile"       element={<VendorProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
