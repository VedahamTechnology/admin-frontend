import VendorLayout from "../Layouts/VendorLayout"
import { CalendarCheck, Clock3, CircleCheck, XCircle } from "lucide-react"

import { MetricCard, PageShell, SectionCard, StatusPill } from "../../components/admin/AdminPageElements"

const bookings = [
  {
    id: "VBK001",
    customer: "Priya Sharma",
    service: "Deep Cleaning",
    date: "25 May 2026",
    amount: "₹1,499",
    status: "Completed",
  },
  {
    id: "VBK002",
    customer: "Aman Verma",
    service: "AC Service",
    date: "26 May 2026",
    amount: "₹899",
    status: "Pending",
  },
  {
    id: "VBK003",
    customer: "Riya Singh",
    service: "Bathroom Cleaning",
    date: "24 May 2026",
    amount: "₹699",
    status: "Cancelled",
  },
]

function VendorBookings() {
  return (
    <VendorLayout>
      <PageShell
        title="Bookings"
        description="Review customer bookings with the same layout and styling used across the admin bookings page."
      >
        <div className="metric-grid metric-grid--4">
          <MetricCard
            label="Total Bookings"
            value="328"
            change="All bookings in the queue"
            icon={<CalendarCheck size={20} />}
            accentClassName="bg-[#031B52]"
          />
          <MetricCard
            label="Pending"
            value="18"
            change="Waiting for action"
            icon={<Clock3 size={20} />}
            accentClassName="bg-amber-500"
          />
          <MetricCard
            label="Completed"
            value="291"
            change="Closed successfully"
            icon={<CircleCheck size={20} />}
            accentClassName="bg-emerald-500"
          />
          <MetricCard
            label="Cancelled"
            value="19"
            change="Not fulfilled"
            icon={<XCircle size={20} />}
            accentClassName="bg-rose-500"
          />
        </div>

        <SectionCard
          title="Booking Queue"
          description="Placeholder rows are kept local for now so API integration can be added separately later."
        >
          <div className="admin-table-wrapper">
            <table className="admin-table admin-table--min-wide">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <p className="admin-table__cell-primary">{booking.id}</p>
                    </td>
                    <td>
                      <p className="admin-table__cell-primary">{booking.customer}</p>
                    </td>
                    <td>
                      <p className="admin-table__cell-primary">{booking.service}</p>
                    </td>
                    <td>
                      <p className="admin-table__cell-primary">{booking.date}</p>
                    </td>
                    <td>
                      <p className="admin-table__cell-primary">{booking.amount}</p>
                    </td>
                    <td>
                      <StatusPill status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>
    </VendorLayout>
  )
}

export default VendorBookings