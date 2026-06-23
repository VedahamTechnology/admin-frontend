import AdminLayout from "../layouts/AdminLayout"
import { Users, CalendarCheck, Wallet, Briefcase } from "lucide-react"
import { useEffect, useState } from "react"

import StatsCard from "../components/StatsCard"
import RevenueChart from "../components/RevenueChart"
import RecentBookings from "../components/RecentBookings"
import ActivityPanel from "../components/ActivityPanel"
import BookingStatus from "../components/BookingStatus"
import WorkerPayment from "../components/WorkerPayment"
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"))

  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await getDashboardStats()
        setStats(response.data?.data || response.data)
      } catch {
        setError("Failed to load dashboard statistics")
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    {
      title: "Revenue",
      value: `₹${stats?.revenue?.total || 0}`,
      change: `${stats?.revenue?.bookings || 0} this month`,
      icon: <Wallet className="text-white" />,
      bg: "bg-[#031B52]",
    },
    {
      title: "Bookings",
      value: stats?.bookings?.total || 0,
      change: `${stats?.bookings?.pending || 0} pending`,
      icon: <CalendarCheck className="text-white" />,
      bg: "bg-[#05AFC7]",
    },
    {
      title: "Customers",
      value: stats?.users?.total || 0,
      change: `+${stats?.users?.new || 0} new users`,
      icon: <Users className="text-white" />,
      bg: "bg-emerald-500",
    },
    {
      title: "Providers",
      value: stats?.vendors?.total || 0,
      change: `${stats?.vendors?.active || 0} active`,
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

         
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-secondary)" }}>
            Loading dashboard data...
          </div>
        ) : error ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-danger)" }}>
            {error}
          </div>
        ) : (
          <>
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
              {/* TODO: Connect RevenueChart to getRevenueTrend() API when component supports dynamic props */}
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
          {/* TODO: Connect BookingStatus to getBookingStatus() API when component supports dynamic props */}
          <BookingStatus />
          {/* TODO: Connect WorkerPayment to getWorkerPayment() API when component supports dynamic props */}
          <WorkerPayment />
        </div>

        {/* Recent Bookings */}
        <RecentBookings />

        {/* Activity Panel */}
        <ActivityPanel />
          </>
        )}
      </div>
    </AdminLayout>
  )
}

export default Dashboard
