import AdminLayout from "../layouts/AdminLayout"
import { Search, CalendarCheck, Clock3, CircleCheck, XCircle } from "lucide-react"

function Bookings() {
  const bookings = [
    {
      id: "BK001",
      customer: "Priya Sharma",
      worker: "Rohit Kumar",
      service: "Electrical Repair",
      date: "25 May 2026",
      amount: "₹850",
      status: "Completed",
    },
    {
      id: "BK002",
      customer: "Aman Verma",
      worker: "Deepak",
      service: "AC Service",
      date: "25 May 2026",
      amount: "₹1200",
      status: "Pending",
    },
    {
      id: "BK003",
      customer: "Riya Singh",
      worker: "Aman Singh",
      service: "Plumbing",
      date: "24 May 2026",
      amount: "₹650",
      status: "Cancelled",
    },
  ]

  return (
    <AdminLayout>
      <div className="page-shell">
        {/* Header */}
        <div>
          <p className="page-header__eyebrow">Operations</p>
          <h1 className="page-header__title page-header__title--xl">Bookings</h1>
          <p className="page-header__desc">Track customer bookings and service flow.</p>
        </div>

        {/* Metric Cards */}
        <div className="metric-grid metric-grid--4">
          <BookingCard title="Total"     value="328" icon={<CalendarCheck size={22} />} accent="accent-cyan"    />
          <BookingCard title="Pending"   value="18"  icon={<Clock3 size={22} />}        accent="accent-orange"  />
          <BookingCard title="Completed" value="291" icon={<CircleCheck size={22} />}   accent="accent-success" />
          <BookingCard title="Cancelled" value="19"  icon={<XCircle size={22} />}       accent="accent-danger"  />
        </div>

        {/* Table */}
        <div className="section-card">
          <div className="table-toolbar">
            <div className="search-wrapper">
              <Search size={18} className="search-wrapper__icon" />
              <input
                placeholder="Search booking"
                className="admin-input"
              />
            </div>

            <select className="admin-select">
              <option>All Status</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Worker</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.worker}</td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>{booking.amount}</td>
                    <td><BookingStatus value={booking.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

/* Local status badge (maps to global badge classes) */
function BookingStatus({ value }) {
  const variantMap = {
    Completed: "badge--success",
    Pending:   "badge--warning",
    Cancelled: "badge--danger",
  }
  return (
    <span className={`badge ${variantMap[value] || "badge--neutral"}`}>
      {value}
    </span>
  )
}

/* Local metric card (extends global metric-card) */
function BookingCard({ title, value, icon, accent }) {
  return (
    <div className="metric-card">
      <div>
        <p className="metric-card__label">{title}</p>
        <h2 className="metric-card__value">{value}</h2>
      </div>
      <div className={`metric-card__icon ${accent}`}>{icon}</div>
    </div>
  )
}

export default Bookings
