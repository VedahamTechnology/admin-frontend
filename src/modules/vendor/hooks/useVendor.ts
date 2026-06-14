import { useState, useCallback } from "react";
import type { Booking, Worker, Notification, TimeSlot } from "../types/vendor";
import {
  mockBookings,
  mockWorkers,
  mockNotifications,
  mockTimeSlots,
} from "../constants/mockData";

// ── useBookings ──────────────────────────────────────────────
export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const updateStatus = useCallback(
    (id: string, status: Booking["status"]) => {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    },
    []
  );

  const assignWorkers = useCallback(
    (bookingId: string, workers: Worker[]) => {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, assignedWorkers: workers } : b
        )
      );
    },
    []
  );

  return { bookings, updateStatus, assignWorkers };
}

// ── useWorkers ───────────────────────────────────────────────
export function useWorkers() {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);

  const addWorker = useCallback((worker: Omit<Worker, "_id">) => {
    const newWorker: Worker = {
      ...worker,
      _id: `WK${String(Date.now()).slice(-4)}`,
    };
    setWorkers((prev) => [newWorker, ...prev]);
  }, []);

  const updateWorker = useCallback((id: string, updates: Partial<Worker>) => {
    setWorkers((prev) =>
      prev.map((w) => (w._id === id ? { ...w, ...updates } : w))
    );
  }, []);

  const deleteWorker = useCallback((id: string) => {
    setWorkers((prev) => prev.filter((w) => w._id !== id));
  }, []);

  return { workers, addWorker, updateWorker, deleteWorker };
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
