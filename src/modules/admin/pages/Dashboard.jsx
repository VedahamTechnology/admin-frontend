import AdminLayout from "../layouts/AdminLayout"
import { Users, CalendarCheck, Wallet, Briefcase } from "lucide-react"

import StatsCard from "../components/StatsCard"
import RevenueChart from "../components/RevenueChart"
import RecentBookings from "../components/RecentBookings"
import ActivityPanel from "../components/ActivityPanel"
import BookingStatus from "../components/BookingStatus"
import WorkerPayment from "../components/WorkerPayment"

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"))

  const cards = [
    {
      title: "Revenue",
      value: "₹1,24,500",
      change: "+12.4% this month",
      icon: <Wallet className="text-white" />,
      bg: "bg-[#031B52]",
    },
    {
      title: "Bookings",
      value: "328",
      change: "+18 today",
      icon: <CalendarCheck className="text-white" />,
      bg: "bg-[#05AFC7]",
    },
    {
      title: "Customers",
      value: "1240",
      change: "+45 new users",
      icon: <Users className="text-white" />,
      bg: "bg-emerald-500",
    },
    {
      title: "Providers",
      value: "184",
      change: "+8 approved",
      icon: <Briefcase className="text-white" />,
      bg: "bg-orange-500",
    },
  ]

  return (
    <AdminLayout>
      <div className="page-shell">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-header__title">Dashboard</h1>
            <p className="page-header__desc">
              Welcome back, {user?.firstName || "Admin"}. Here's your platform overview today.
            </p>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg-card)",
              padding: "8px 16px",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-success)",
                display: "inline-block",
              }}
            />
            Data updated 2 min ago
          </div>
        </div>

        {/* Stats Cards */}
        <div className="metric-grid metric-grid--4">
          {cards.map((card, index) => (
            <StatsCard
              key={index}
              title={card.title}
              value={card.value}
              change={card.change}
              icon={card.icon}
              bg={card.bg}
            />
          ))}
        </div>

        {/* Revenue Chart + Pending Actions */}
        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "1fr",
          }}
          className="dashboard-chart-row"
        >
          {/* Revenue Chart */}
          <div
            className="section-card"
            style={{ gridColumn: "span 2" }}
          >
            <div className="section-card__header">
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.22em",
                    color: "var(--color-text-secondary)",
                    margin: 0,
                  }}
                >
                  Analytics
                </p>
                <h2 className="section-card__title" style={{ marginTop: 8 }}>
                  Revenue Analytics
                </h2>
                <p className="section-card__desc">Monthly Performance</p>
              </div>
              <span
                className="badge badge--neutral"
                style={{ textTransform: "uppercase", letterSpacing: "0.18em" }}
              >
                Live line chart
              </span>
            </div>
            <div style={{ height: 380 }}>
              <RevenueChart />
            </div>
          </div>

          {/* Pending Actions */}
          <div className="section-card">
            <h2 className="section-card__title" style={{ marginBottom: 24 }}>
              Pending Actions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Vendor Approvals",  count: 12 },
                { label: "Pending Bookings",  count: 8 },
                { label: "Refund Requests",   count: 3 },
              ].map(({ label, count }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border-light)",
                    backgroundColor: "rgba(248,250,252,0.7)",
                    padding: "16px 20px",
                    transition: "background var(--transition-base)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                      margin: 0,
                    }}
                  >
                    {label}
                  </p>
                  <span
                    style={{
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--color-bg-card)",
                      padding: "4px 12px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      boxShadow: "var(--shadow-sm)",
                      border: "1px solid var(--color-border-light)",
                    }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Status + Worker Payment */}
        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          <BookingStatus />
          <WorkerPayment />
        </div>

        {/* Recent Bookings */}
        <RecentBookings />

        {/* Activity Panel */}
        <ActivityPanel />
      </div>
    </AdminLayout>
  )
}

export default Dashboard
