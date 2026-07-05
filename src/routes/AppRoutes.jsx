import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../modules/admin/pages/Login"));
const Dashboard = lazy(() => import("../modules/admin/pages/Dashboard"));
const Users = lazy(() => import("../modules/admin/pages/Users"));
const Providers = lazy(() => import("../modules/admin/pages/Providers"));
const Services = lazy(() => import("../modules/admin/pages/Services"));
const Bookings = lazy(() => import("../modules/admin/pages/Bookings"));
const Payments = lazy(() => import("../modules/admin/pages/Payments"));
const Notifications = lazy(() => import("../modules/admin/pages/Notifications"));
const Reports = lazy(() => import("../modules/admin/pages/Reports"));
const Settings = lazy(() => import("../modules/admin/pages/Settings"));
const UserBookings = lazy(() => import("../modules/admin/pages/UserBookings"));
const UserAnalytics = lazy(() => import("../modules/admin/pages/UserAnalytics"));
const ProviderBookings = lazy(() => import("../modules/admin/pages/ProviderBookings"));
const ProviderAnalytics = lazy(() => import("../modules/admin/pages/ProviderAnalytics"));
const Categories = lazy(() => import("../modules/admin/pages/Categories"));
const ServiceList = lazy(() => import("../modules/admin/pages/ServiceList"));
const Pricing = lazy(() => import("../modules/admin/pages/Pricing"));
const Transactions = lazy(() => import("../modules/admin/pages/Transactions"));
const Settlements = lazy(() => import("../modules/admin/pages/Settlements"));
const Workers = lazy(() => import("../modules/admin/pages/Workers"));
const WorkerPayments = lazy(() => import("../modules/admin/pages/WorkerPayments"));
const AdminVendorServices = lazy(() => import("../modules/admin/pages/VendorServices"));
const ScrapItems = lazy(() => import("../modules/admin/pages/ScrapItems"));
const UserCatalog = lazy(() => import("../modules/admin/pages/UserCatalog"));
const Reviews = lazy(() => import("../modules/admin/pages/Reviews"));
const Plans = lazy(() => import("../modules/admin/pages/Plans"));
const VendorLogin = lazy(() => import("../modules/vendor/pages/VendorLogin"));
const VendorDashboard = lazy(() => import("../modules/vendor/pages/VendorDashboard"));
const VendorBookings = lazy(() => import("../modules/vendor/pages/VendorBookings"));
const VendorProfile = lazy(() => import("../modules/vendor/pages/VendorProfile"));
const VendorWorkers = lazy(() => import("../modules/vendor/pages/VendorWorkers"));
const VendorAvailability = lazy(() => import("../modules/vendor/pages/VendorAvailability"));
const VendorSchedule = lazy(() => import("../modules/vendor/pages/VendorSchedule"));
const VendorSettings = lazy(() => import("../modules/vendor/pages/VendorSettings"));
const VendorServices = lazy(() => import("../modules/vendor/pages/VendorServices"));
const VendorRegister = lazy(() => import("../modules/vendor/pages/VendorRegister"));
const UserDashboard = lazy(() => import("../modules/users/pages/UserDashboard"));
const CustomerRegister = lazy(() => import("../modules/users/pages/CustomerRegister"));
const VendorPayments = lazy(() => import("../modules/vendor/pages/VendorPayments"));

const routes = [
  ["/", Login],
  ["/dashboard", Dashboard],
  ["/users", Users],
  ["/users/bookings", UserBookings],
  ["/users/analytics", UserAnalytics],
  ["/users/register", CustomerRegister],
  ["/vendors", Providers],
  ["/vendors/services", AdminVendorServices],
  ["/vendor-services", AdminVendorServices],
  ["/providers", Providers],
  ["/providers/bookings", ProviderBookings],
  ["/providers/analytics", ProviderAnalytics],
  ["/workers", Workers],
  ["/workers/payments", WorkerPayments],
  ["/bookings", Bookings],
  ["/scrap", ScrapItems],
  ["/payments", Payments],
  ["/payments/transactions", Transactions],
  ["/settlements", Settlements],
  ["/catalog", UserCatalog],
  ["/services", Services],
  ["/services/categories", Categories],
  ["/services/list", ServiceList],
  ["/services/pricing", Pricing],
  ["/notifications", Notifications],
  ["/reports", Reports],
  ["/plans", Plans],
  ["/reviews", Reviews],
  ["/settings", Settings],
  ["/vendor/login", VendorLogin],
  ["/vendor/register", VendorRegister],
  ["/vendor/dashboard", VendorDashboard],
  ["/vendor/bookings", VendorBookings],
  ["/vendor/profile", VendorProfile],
  ["/vendor/workers", VendorWorkers],
  ["/vendor/services", VendorServices],
  ["/vendor/availability", VendorAvailability],
  ["/vendor/schedule", VendorSchedule],
  ["/vendor/settings", VendorSettings],
  ["/vendor/payments", VendorPayments],
  ["/user/dashboard", UserDashboard],
];

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6 text-slate-500">Loading...</div>}>
        <Routes>
          {routes.map(([path, Component]) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
