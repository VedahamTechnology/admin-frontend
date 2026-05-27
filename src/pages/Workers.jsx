import AdminLayout from "../layouts/AdminLayout"
import { Search, UserCheck, UserX, Wallet } from "lucide-react"

function Workers() {
  const workers = [
    {
      id: "WK001",
      name: "Rohit Kumar",
      service: "Electrician",
      phone: "9876543210",
      jobs: 42,
      rating: "4.8",
      status: "Active",
    },
    {
      id: "WK002",
      name: "Aman Singh",
      service: "Plumber",
      phone: "9812345678",
      jobs: 29,
      rating: "4.6",
      status: "Busy",
    },
    {
      id: "WK003",
      name: "Deepak",
      service: "AC Repair",
      phone: "9988776655",
      jobs: 12,
      rating: "4.2",
      status: "Inactive",
    },
  ]

  return (
    <AdminLayout>
      <div className="page-shell">
        {/* Header */}
        <div>
          <p className="page-header__eyebrow">Homster Admin</p>
          <h1 className="page-header__title page-header__title--xl">Workers</h1>
          <p className="page-header__desc">
            Manage workforce performance and worker operations.
          </p>
        </div>

        {/* Metric Cards */}
        <div className="metric-grid metric-grid--3">
          <WorkerCard
            title="Total Workers"
            value="184"
            icon={<UserCheck size={22} />}
            accent="accent-cyan"
          />
          <WorkerCard
            title="Busy Workers"
            value="52"
            icon={<Wallet size={22} />}
            accent="accent-orange"
          />
          <WorkerCard
            title="Inactive"
            value="11"
            icon={<UserX size={22} />}
            accent="accent-danger"
          />
        </div>

        {/* Table */}
        <div className="section-card">
          <div className="table-toolbar">
            <div className="search-wrapper">
              <Search size={18} className="search-wrapper__icon" />
              <input placeholder="Search workers" className="admin-input" />
            </div>

            <select className="admin-select">
              <option>All Workers</option>
              <option>Active</option>
              <option>Busy</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Service</th>
                  <th>Phone</th>
                  <th>Jobs</th>
                  <th>Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.id}>
                    <td>
                      <p className="admin-table__cell-primary">{worker.name}</p>
                      <p className="admin-table__cell-sub">{worker.id}</p>
                    </td>
                    <td>{worker.service}</td>
                    <td>{worker.phone}</td>
                    <td>{worker.jobs}</td>
                    <td>⭐ {worker.rating}</td>
                    <td>
                      <WorkerStatus value={worker.status} />
                    </td>
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

function WorkerStatus({ value }) {
  const variantMap = {
    Active:   "badge--success",
    Busy:     "badge--warning",
    Inactive: "badge--danger",
  }
  return (
    <span className={`badge ${variantMap[value] || "badge--neutral"}`}>
      {value}
    </span>
  )
}

function WorkerCard({ title, value, icon, accent }) {
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

export default Workers
