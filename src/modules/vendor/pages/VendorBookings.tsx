import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";

import VendorLayout from "../Layouts/VendorLayout";

import {
  PageHeader,
  BookingStatusBadge,
  EmptyState,
  SectionCard,
} from "../Components/VendorUI";

import BookingDrawer from "../Components/BookingDrawer";

import { useBookings, useWorkers } from "../hooks/useVendor";

import type { Booking, BookingStatus } from "../types/vendor";

type Tab = "all" | BookingStatus;

const TABS: { key: Tab; label: string }[] = [
  { key: "all",         label: "All"         },
  { key: "pending",     label: "Pending"     },
  { key: "confirmed",   label: "Confirmed"   },
  { key: "in_progress", label: "In Progress" },
  { key: "completed",   label: "Completed"   },
  { key: "cancelled",   label: "Cancelled"   },
];

export default function VendorBookings() {
  const { bookings, updateStatus, assignWorkers } = useBookings();
  const { workers } = useWorkers();

  const [activeTab, setActiveTab]         = useState<Tab>("all");
  const [search, setSearch]               = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const serviceOptions = useMemo(() => {
    const names = new Set(bookings.map((b) => b.service.name));
    return Array.from(names).sort();
  }, [bookings]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: bookings.length };
    for (const b of bookings) {
      counts[b.status] = (counts[b.status] || 0) + 1;
    }
    return counts;
  }, [bookings]);

  const filtered = useMemo(() => {
    let list = bookings;
    if (activeTab !== "all") list = list.filter((b) => b.status === activeTab);
    if (serviceFilter) list = list.filter((b) => b.service.name === serviceFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.client.name.toLowerCase().includes(q) ||
          b.service.name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [bookings, activeTab, serviceFilter, search]);

  return (
    <VendorLayout>
      <div className="page-shell">
        <PageHeader
          eyebrow="Operations"
          title="Booking Management"
          description="View, confirm, assign and manage all client bookings."
        />

        <SectionCard>
          {/* Status Tabs */}
          <div className="booking-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`booking-tab${activeTab === tab.key ? " booking-tab--active" : ""}`}
              >
                {tab.label}
                <span className="booking-tab__count">
                  {tabCounts[tab.key] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="table-toolbar">
            <div className="search-wrapper">
              <Search size={18} className="search-wrapper__icon" />
              <input
                placeholder="Search by ID, client or service…"
                className="admin-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <select
                className="admin-select"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
              >
                <option value="">All Services</option>
                {serviceOptions.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <EmptyState
              title="No bookings found"
              description="Try adjusting your filters or search query."
            />
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Amount</th>
                    <th>Workers</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr
                      key={b.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedBooking(b)}
                    >
                      <td style={{ fontWeight: 700, color: "var(--color-brand-cyan)" }}>{b.id}</td>
                      <td>
                        <p className="admin-table__cell-primary">{b.client.name}</p>
                        <p className="admin-table__cell-sub">{b.client.phone}</p>
                      </td>
                      <td>{b.service.name}</td>
                      <td>{b.date}</td>
                      <td>{b.timeSlot}</td>
                      <td style={{ fontWeight: 600 }}>₹{b.amount.toLocaleString()}</td>
                      <td>
                        {b.assignedWorkers.length === 0 ? (
                          <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", fontStyle: "italic" }}>
                            Unassigned
                          </span>
                        ) : (
                          <span style={{ fontSize: "0.875rem" }}>
                            {b.assignedWorkers.map((w) => w.name).join(", ")}
                          </span>
                        )}
                      </td>
                      <td><BookingStatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>

      {/* Booking Details Drawer */}
      {selectedBooking && (
        <BookingDrawer
          booking={selectedBooking}
          workers={workers}
          onClose={() => setSelectedBooking(null)}
          onUpdateStatus={(id, status) => {
            updateStatus(id, status);
            setSelectedBooking(null);
          }}
          onAssignWorkers={assignWorkers}
        />
      )}
    </VendorLayout>
  );
}
