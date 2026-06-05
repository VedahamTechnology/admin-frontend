// ============================================================
// HOMSTER — Vendor Panel Types
// ============================================================

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export type WorkerStatus = "active" | "inactive" | "on_leave";

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
export interface Worker {
  id: string;
  name: string;
  phone: string;
  email: string;
  skills: string[];
  status: WorkerStatus;
  assignedJobs: number;
  completedJobs: number;
  rating: number;
  joinedDate: string;
  avatar?: string;
  availability: "available" | "busy" | "off";
}

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
