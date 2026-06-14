// ============================================================
// HOMSTER — Vendor Panel Types
// ============================================================

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export type WorkerStatus = "pending" | "approved" | "rejected";
export type WorkerGender = "male" | "female" | "other";

export type SlotStatus = "available" | "blocked" | "booked";

export type NotificationType =
  | "booking_received"
  | "booking_confirmed"
  | "worker_assigned"
  | "booking_completed"
  | "booking_cancelled"
  | "general";

// ── Client ───────────────────────────────────────────────────
export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  avatar?: string;
}

// ── Service ──────────────────────────────────────────────────
export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number; // minutes
}

// ── Worker ───────────────────────────────────────────────────
export interface ServiceCategory {
  _id: string;
  categoryId?: string;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  totalServices?: number;
  avgRating?: number;
}

export interface WorkerDocument {
  url?: string;
  isVerified?: boolean;
}

export interface WorkerProfile {
  aadharNumber?: string;
  panNumber?: string;
  serviceCategory?: string | ServiceCategory;
  verificationStatus: WorkerStatus;
  rejectionReason?: string;
  registeredOn?: string;
  documents?: {
    aadharFront?: WorkerDocument;
  };
}

export interface Worker {
  _id: string;
  id?: string;
  userId?: string;
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  gender?: WorkerGender;
  role: "worker";
  isActive?: boolean;
  isBanned?: boolean;
  vendorId?: string;
  worker: WorkerProfile;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWorkerPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  password: string;
  gender?: WorkerGender;
  aadharNumber?: string;
  panNumber?: string;
  serviceCategory?: string;
  aadharFrontUrl?: string;
}

export interface CreateWorkerResponse {
  success: boolean;
  message: string;
  worker: {
    id: string;
    userId?: string;
    fullName: string;
    status: WorkerStatus;
  };
}

export interface WorkersResponse {
  success: boolean;
  count: number;
  workers: Worker[];
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: ServiceCategory[];
}

export const getWorkerDisplayId = (worker: Worker) =>
  worker._id || worker.id || worker.userId || worker.email;

export const getWorkerFullName = (worker: Worker) =>
  [worker.firstName, worker.lastName].filter(Boolean).join(" ").trim() ||
  worker.email;

export const getWorkerServiceCategoryName = (worker: Worker) => {
  const category = worker.worker?.serviceCategory;
  if (!category) return "No category assigned";
  return typeof category === "string" ? category : category.name;
};

// ── Booking ──────────────────────────────────────────────────
export interface Booking {
  id: string;
  client: Client;
  service: ServiceItem;
  status: BookingStatus;
  date: string;           // ISO date string
  timeSlot: string;       // e.g. "10:00 AM – 12:00 PM"
  address: string;
  notes?: string;
  assignedWorkers: Worker[];
  amount: number;
  createdAt: string;
}

// ── Availability Slot ────────────────────────────────────────
export interface TimeSlot {
  id: string;
  day: string;            // "Monday" … "Sunday"
  startTime: string;      // "09:00"
  endTime: string;        // "11:00"
  status: SlotStatus;
}

// ── Schedule Entry ───────────────────────────────────────────
export interface ScheduleEntry {
  id: string;
  bookingId: string;
  clientName: string;
  service: string;
  workerName: string;
  date: string;
  timeSlot: string;
  status: BookingStatus;
}

// ── Notification ─────────────────────────────────────────────
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  bookingId?: string;
}

// ── Vendor Profile ───────────────────────────────────────────
export interface VendorProfile {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  servicesOffered: string[];
  workingHours: {
    from: string;
    to: string;
  };
  logo?: string;
  rating: number;
  totalReviews: number;
  joinedDate: string;
  status: "active" | "pending" | "suspended";
}

// ── Dashboard Stats ──────────────────────────────────────────
export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedJobs: number;
  totalWorkers: number;
  monthlyRevenue: number;
  revenueChange: string;
}
