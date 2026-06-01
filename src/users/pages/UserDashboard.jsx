import { CalendarCheck, CheckCircle2, Heart, LayoutDashboard, ShoppingBag } from "lucide-react"

import UserLayout from "../layouts/UserLayout"

function UserDashboard() {
  const cards = [
    {
      title: "Total Bookings",
      value: "24",
      change: "+4 this month",
      icon: <LayoutDashboard className="text-white" />,
      bg: "bg-[#031B52]",
    },
    {
      title: "Active Bookings",
      value: "5",
      change: "2 in progress",
      icon: <CalendarCheck className="text-white" />,
      bg: "bg-[#05AFC7]",
    },
    {
      title: "Completed Bookings",
      value: "19",
      change: "+3 completed today",
      icon: <CheckCircle2 className="text-white" />,
      bg: "bg-emerald-500",
    },
    {
      title: "Saved Services",
      value: "8",
      change: "Preferred providers",
      icon: <Heart className="text-white" />,
      bg: "bg-orange-500",
    },
  ]

  const recentBookings = [
    { name: "AC Repair", status: "Active", date: "Today" },
    { name: "House Cleaning", status: "Completed", date: "Yesterday" },
    { name: "Plumbing Support", status: "Scheduled", date: "Tomorrow" },
  ]

  const savedServices = ["AC Service", "Deep Cleaning", "Electrical Repair", "Pest Control"]

  return (
    <UserLayout>
      <div className="page-shell">
        <div className="page-header">
          <div>
            <h1 className="page-header__title">User Dashboard</h1>
            <p className="page-header__desc">
              Track your bookings, completed services, and saved providers from one place.
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
            Customer profile active
          </div>
        </div>

        <div className="metric-grid metric-grid--4">
          {cards.map((card) => (
            <div key={card.title} className="section-card" style={{ padding: 24 }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                    {card.title}
                  </p>
                  <h2 className="mt-3 text-4xl font-bold text-slate-900">{card.value}</h2>
                  <p className="mt-2 text-sm text-slate-500">{card.change}</p>
                </div>

                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.bg}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2" id="bookings">
          <div className="section-card">
            <div className="section-card__header">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Overview</p>
                <h2 className="section-card__title mt-2">Recent Bookings</h2>
                <p className="section-card__desc">A quick look at your current and upcoming service requests.</p>
              </div>
              <span className="badge badge--neutral">Live snapshot</span>
            </div>

            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.name}
                  className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4"
                >
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{booking.name}</h3>
                    <p className="text-sm text-slate-500">{booking.date}</p>
                  </div>

                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card" id="saved-services">
            <div className="section-card__header">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Library</p>
                <h2 className="section-card__title mt-2">Saved Services</h2>
                <p className="section-card__desc">Services you frequently book or keep bookmarked.</p>
              </div>
              <span className="badge badge--neutral">Favorites</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {savedServices.map((service) => (
                <div
                  key={service}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#031B52] text-white">
                      <ShoppingBag size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{service}</h3>
                      <p className="text-sm text-slate-500">Saved for faster rebooking</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default UserDashboard