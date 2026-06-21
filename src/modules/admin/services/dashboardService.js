import API from "./adminApi"

export const getDashboardStats = () => {
  return API.get("/admin/stats")
}

export const getRevenueTrend = () => {
  return API.get("/admin/charts/revenue-trend")
}

export const getBookingVolume = () => {
  return API.get("/admin/charts/booking-volume")
}

export const getBookingStatus = () => {
  return API.get("/admin/charts/booking-status")
}

export const getRevenueVsBookings = () => {
  return API.get("/admin/charts/revenue-vs-bookings")
}

export const getCustomerGrowth = () => {
  return API.get("/admin/charts/customer-growth")
}

export const getWorkerPayment = () => {
  return API.get("/admin/charts/worker-payment")
}