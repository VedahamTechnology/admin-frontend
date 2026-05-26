import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import Providers from "../pages/Providers"
import Services from "../pages/Services"
import Bookings from "../pages/Bookings"
import Payments from "../pages/Payments"
import Notifications from "../pages/Notifications"
import Reports from "../pages/Reports"
import Settings from "../pages/Settings"
import UserBookings from "../pages/UserBookings"
import UserAnalytics from "../pages/UserAnalytics"
import ProviderBookings from "../pages/ProviderBookings"
import ProviderAnalytics from "../pages/ProviderAnalytics"
import Categories from "../pages/Categories"
import ServiceList from "../pages/ServiceList"
import Pricing from "../pages/Pricing"
import PendingBookings from "../pages/PendingBookings"
import CompletedBookings from "../pages/CompletedBookings"
import CancelledBookings from "../pages/CancelledBookings"
import Transactions from "../pages/Transactions"
import Settlements from "../pages/Settlements"
import Workers from "../pages/Workers"
import WorkerPayments from "../pages/WorkerPayments"
import VendorServices from "../pages/VendorServices"
import ScrapItems from "../pages/ScrapItems"
import UserCatalog from "../pages/UserCatalog"
import Reviews from "../pages/Reviews"
import Plans from "../pages/Plans"

function AppRoutes(){

return(

<BrowserRouter>

<Routes>

<Route

path="/"

element={<Login/>}

/>

<Route

path="/vendor-services"

element={<VendorServices/>}

/>

<Route

path="/dashboard"

element={<Dashboard/>}

/>

<Route
path="/vendors"
element={<Providers/>}
/>

<Route
path="/vendors/services"
element={<VendorServices/>}
/>

<Route

path="/users"

element={<Users/>}

/>

<Route

path="/users/bookings"

element={<UserBookings/>}

/>

<Route

path="/scrap"

element={<ScrapItems/>}

/>

<Route

path="/users/analytics"

element={<UserAnalytics/>}

/>

<Route

path="/providers"

element={<Providers/>}

/>

<Route

path="/providers/bookings"

element={<ProviderBookings/>}

/>

<Route

path="/plans"

element={<Plans/>}

/>

<Route

path="/reviews"

element={<Reviews/>}

/>

<Route

path="/providers/analytics"

element={<ProviderAnalytics/>}

/>

<Route

path="/catalog"

element={<UserCatalog/>}

/>

<Route

path="/services"

element={<Services/>}

/>

<Route

path="/services/categories"

element={<Categories/>}

/>

<Route

path="/services/list"

element={<ServiceList/>}

/>

<Route

path="/services/pricing"

element={<Pricing/>}

/>

<Route

path="/bookings"

element={<Bookings/>}

/>

<Route
path="/workers"
element={<Workers/>}
/>

<Route

path="/workers/payments"

element={<WorkerPayments/>}

/>

<Route

path="/bookings/pending"

element={<PendingBookings/>}

/>

<Route

path="/bookings/completed"

element={<CompletedBookings/>}

/>

<Route

path="/bookings/cancelled"

element={<CancelledBookings/>}

/>

<Route

path="/payments"

element={<Payments/>}

/>

<Route

path="/payments/transactions"

element={<Transactions/>}

/>

<Route

path="/settlements"

element={<Settlements/>}

/>

<Route

path="/notifications"

element={<Notifications/>}

/>

<Route

path="/reports"

element={<Reports/>}

/>

<Route

path="/settings"

element={<Settings/>}

/>

</Routes>

</BrowserRouter>

)

}

export default AppRoutes