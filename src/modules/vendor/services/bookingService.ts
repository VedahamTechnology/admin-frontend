import axios from "axios";
import type { Booking, Worker, BookingStatus } from "../types/vendor";

const API = "http://localhost:5000/api/vendor";

const getConfig = () => {
  const token = localStorage.getItem("vendorToken");

  return {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };
};

export const getBookingErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (message) return message;
    if (status === 400) return "Please check the details and try again.";
    if (status === 401) return "Your session has expired. Please sign in again.";
    if (status === 403) return "You are not authorized to perform this action.";
    if (status === 404) return "The requested booking could not be found.";
  }

  return "Something went wrong. Please try again.";
};

const mapBackendBookingToFrontend = (b: any): Booking => {
  let mappedStatus: BookingStatus = "pending";
  if (b.status === "confirmed") mappedStatus = "confirmed";
  else if (b.status === "on_the_way" || b.status === "in_progress") mappedStatus = "in_progress";
  else if (b.status === "completed") mappedStatus = "completed";
  else if (b.status === "cancelled") mappedStatus = "cancelled";

  const clientName = b.customer ? `${b.customer.firstName} ${b.customer.lastName || ""}`.trim() : "Unknown Customer";
  const clientPhone = b.customer ? b.customer.phone : "";
  const clientEmail = b.customer ? b.customer.email : "";
  const clientAddress = b.customer ? (b.customer.address || "") : "";

  const serviceName = b.pricing?.serviceSnapshot?.serviceName || b.service?.name || "Unknown Service";
  const serviceCategory = b.category?.name || "Service";
  const servicePrice = b.pricing?.basePrice || b.service?.basePrice || 0;
  const serviceDuration = b.service?.estimatedDuration || 60;

  const date = b.bookingDate ? new Date(b.bookingDate).toISOString().split("T")[0] : "";
  const timeSlot = b.timeSlot ? `${b.timeSlot.startTime} – ${b.timeSlot.endTime}` : "";
  
  const address = b.serviceAddress 
    ? `${b.serviceAddress.street || ""}, ${b.serviceAddress.city || ""}, ${b.serviceAddress.state || ""} - ${b.serviceAddress.pincode || ""}`.replace(/^,\s*/, "")
    : clientAddress;

  const assignedWorkers: Worker[] = b.worker ? [
    {
      _id: typeof b.worker === "object" ? b.worker._id : b.worker,
      firstName: typeof b.worker === "object" ? b.worker.firstName : "Assigned",
      lastName: typeof b.worker === "object" ? b.worker.lastName || "" : "Worker",
      phone: typeof b.worker === "object" ? b.worker.phone || "" : "",
      email: typeof b.worker === "object" ? b.worker.email || "" : "",
      role: "worker",
      worker: {
        verificationStatus: "approved",
      }
    }
  ] : [];

  return {
    id: b._id,
    client: {
      id: b.customer?._id || "",
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      address: clientAddress,
    },
    service: {
      id: b.service?._id || "",
      name: serviceName,
      category: serviceCategory,
      price: servicePrice,
      duration: serviceDuration,
    },
    status: mappedStatus,
    date,
    timeSlot,
    address,
    notes: b.customerNotes || b.serviceAddress?.instructions || "",
    assignedWorkers,
    amount: b.pricing?.totalAmount || 0,
    createdAt: b.createdAt || new Date().toISOString(),
  };
};

export const getBookings = async (status?: string): Promise<Booking[]> => {
  const url = status && status !== "all" 
    ? `${API}/bookings?status=${status}` 
    : `${API}/bookings`;
  const res = await axios.get<{ success: boolean; bookings: any[] }>(url, getConfig());
  return (res.data.bookings || []).map(mapBackendBookingToFrontend);
};

export const getBookingById = async (id: string): Promise<Booking> => {
  const res = await axios.get<{ success: boolean; booking: any }>(`${API}/bookings/${id}`, getConfig());
  return mapBackendBookingToFrontend(res.data.booking);
};

export const acceptBooking = async (id: string): Promise<any> => {
  const res = await axios.put(`${API}/bookings/${id}/accept`, {}, getConfig());
  return res.data;
};

export const rejectBooking = async (id: string, reason: string): Promise<any> => {
  const res = await axios.put(`${API}/bookings/${id}/reject`, { reason }, getConfig());
  return res.data;
};

export const completeBooking = async (id: string): Promise<any> => {
  const res = await axios.put(`${API}/bookings/${id}/complete`, {}, getConfig());
  return res.data;
};

export const cancelBooking = async (id: string, reason: string): Promise<any> => {
  const res = await axios.put(`${API}/bookings/${id}/cancel`, { reason }, getConfig());
  return res.data;
};

export const assignWorker = async (id: string, workerId: string): Promise<any> => {
  const res = await axios.put(`${API}/bookings/${id}/assign-worker`, { workerId }, getConfig());
  return res.data;
};

export const verifyStartOtp = async (id: string, otp: string): Promise<any> => {
  const res = await axios.post(`${API}/bookings/${id}/verify-start-otp`, { otp }, getConfig());
  return res.data;
};

export const verifyEndOtp = async (id: string, otp: string): Promise<any> => {
  const res = await axios.post(`${API}/bookings/${id}/verify-end-otp`, { otp }, getConfig());
  return res.data;
};
