import { useState, useCallback, useEffect } from "react";
import type { Booking, Worker, Notification, TimeSlot, BookingStatus } from "../types/vendor";
import {
  mockNotifications,
  mockTimeSlots,
} from "../constants/mockData";
import {
  getBookings,
  acceptBooking,
  rejectBooking,
  completeBooking,
  cancelBooking,
  assignWorker,
  verifyStartOtp,
  getBookingErrorMessage,
} from "../services/bookingService";
import {
  getWorkers,
  getWorkerErrorMessage,
} from "../services/workerService";

// ── useBookings ──────────────────────────────────────────────
export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      setError(getBookingErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = useCallback(
    async (id: string, status: Booking["status"]) => {
      try {
        const currentBooking = bookings.find((b) => b.id === id);
        if (!currentBooking) return;

        if (status === "confirmed") {
          await acceptBooking(id);
        } else if (status === "cancelled") {
          const reason = window.prompt("Please enter a reason for cancellation/rejection:");
          if (reason === null) return; // User cancelled
          const trimmedReason = reason.trim() || "Cancelled by Vendor";
          
          if (currentBooking.status === "pending") {
            await rejectBooking(id, trimmedReason);
          } else {
            await cancelBooking(id, trimmedReason);
          }
        } else if (status === "in_progress") {
          const otp = window.prompt("Enter customer Start OTP to begin service:");
          if (otp === null) return; // User cancelled
          if (!otp.trim()) {
            alert("Start OTP is required to start the service.");
            return;
          }
          await verifyStartOtp(id, otp.trim());
        } else if (status === "completed") {
          await completeBooking(id);
        }

        // Refresh bookings after update
        await fetchBookings();
      } catch (err) {
        const msg = getBookingErrorMessage(err);
        alert(msg);
      }
    },
    [bookings, fetchBookings]
  );

  const assignWorkers = useCallback(
    async (bookingId: string, selectedWorkers: Worker[]) => {
      if (selectedWorkers.length === 0) {
        alert("Please select at least one worker.");
        return;
      }
      
      const workerId = selectedWorkers[0]._id; // Backend only supports one worker reference
      try {
        await assignWorker(bookingId, workerId);
        await fetchBookings();
      } catch (err) {
        const msg = getBookingErrorMessage(err);
        alert(msg);
      }
    },
    [fetchBookings]
  );

  return { bookings, loading, error, updateStatus, assignWorkers, refreshBookings: fetchBookings };
}

// ── useWorkers ───────────────────────────────────────────────
export function useWorkers() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getWorkers();
      setWorkers(res.workers || []);
    } catch (err) {
      setError(getWorkerErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const addWorker = useCallback(() => {
    // Left as stub since worker pages use createWorker directly
    fetchWorkers();
  }, [fetchWorkers]);

  const updateWorker = useCallback((id: string, updates: Partial<Worker>) => {
    // Left as stub for type compliance
  }, []);

  const deleteWorker = useCallback((id: string) => {
    // Left as stub for type compliance
  }, []);

  return { workers, loading, error, addWorker, updateWorker, deleteWorker, refreshWorkers: fetchWorkers };
}

// ── useNotifications ─────────────────────────────────────────
export function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, markRead, markAllRead, unreadCount };
}

// ── useAvailability ──────────────────────────────────────────
export function useAvailability() {
  const [slots, setSlots] = useState<TimeSlot[]>(mockTimeSlots);

  const toggleSlot = useCallback(
    (id: string) => {
      setSlots((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                status:
                  s.status === "available"
                    ? "blocked"
                    : s.status === "blocked"
                    ? "available"
                    : s.status,
              }
            : s
        )
      );
    },
    []
  );

  const addSlot = useCallback((slot: Omit<TimeSlot, "id">) => {
    setSlots((prev) => [
      ...prev,
      { ...slot, id: `TS${String(Date.now()).slice(-4)}` },
    ]);
  }, []);

  return { slots, toggleSlot, addSlot };
}

// ── useDisclosure ─────────────────────────────────────────────
export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const open  = useCallback(() => setIsOpen(true),  []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle= useCallback(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle };
}
