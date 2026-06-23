import AdminLayout from "../layouts/AdminLayout"
import { Search, UserCheck, UserX, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { getWorkers, approveWorker, rejectWorker } from "../services/adminService"

function Workers() {
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All Workers")

  const fetchWorkers = async ({ showLoading = true } = {}) => {
    try {
      if (showLoading) {
        setLoading(true)
      }
      const response = await getWorkers()
      console.log("Workers API Response:", response.data)
      
      let fetchedWorkers = [];
      const resData = response.data;
      if (Array.isArray(resData)) {
        fetchedWorkers = resData;
      } else if (resData && Array.isArray(resData.data)) {
        fetchedWorkers = resData.data;
      } else if (resData && Array.isArray(resData.workers)) {
        fetchedWorkers = resData.workers;
      }
      
      setWorkers(fetchedWorkers)
    } catch {
      setError("Failed to fetch workers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchWorkers({ showLoading: false })
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const handleApprove = async (id) => {
    try {
      await approveWorker(id)
      fetchWorkers()
    } catch {
      alert("Failed to approve worker")
    }
  }

  const handleReject = async (id) => {
    const reason = window.prompt("Enter rejection reason:")
    if (reason) {
      try {
        await rejectWorker(id, reason)
        fetchWorkers()
      } catch {
        alert("Failed to reject worker")
      }
    }
  }

  // Defensive Array Check
  const safeWorkers = Array.isArray(workers) ? workers : []

  // Metrics
  const totalWorkers = safeWorkers.length
  const approvedWorkers = safeWorkers.filter(w => w.worker?.verificationStatus === "approved").length
  const pendingWorkers = safeWorkers.filter(w => w.worker?.verificationStatus === "pending").length
  const rejectedWorkers = safeWorkers.filter(w => w.worker?.verificationStatus === "rejected").length

  // Filtering
  const filteredWorkers = safeWorkers.filter((worker) => {
    const matchesSearch = 
      `${worker.firstName || ''} ${worker.lastName || ''}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (worker.phone && worker.phone.includes(searchQuery)) ||
      (worker.vendorId?.businessName && worker.vendorId.businessName.toLowerCase().includes(searchQuery.toLowerCase()))

    let matchesStatus = true
    if (filterStatus === "Approved") matchesStatus = worker.worker?.verificationStatus === "approved"
    else if (filterStatus === "Pending") matchesStatus = worker.worker?.verificationStatus === "pending"
    else if (filterStatus === "Rejected") matchesStatus = worker.worker?.verificationStatus === "rejected"

    return matchesSearch && matchesStatus
  })

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
        <div className="metric-grid metric-grid--4">
          <WorkerCard
            title="Total Workers"
            value={totalWorkers}
            icon={<UserCheck size={22} />}
            accent="accent-cyan"
          />
          <WorkerCard
            title="Approved"
            value={approvedWorkers}
            icon={<UserCheck size={22} />}
            accent="accent-success"
          />
          <WorkerCard
            title="Pending"
            value={pendingWorkers}
            icon={<Clock size={22} />}
            accent="accent-warning"
          />
          <WorkerCard
            title="Rejected"
            value={rejectedWorkers}
            icon={<UserX size={22} />}
            accent="accent-danger"
          />
        </div>

        {/* Table */}
        <div className="section-card">
          <div className="table-toolbar">
            <div className="search-wrapper">
              <Search size={18} className="search-wrapper__icon" />
              <input 
                placeholder="Search workers" 
                className="admin-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              className="admin-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All Workers</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Worker Name</th>
                  <th>Service Category</th>
                  <th>Phone</th>
                  <th>Vendor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>Loading workers...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</td>
                  </tr>
                ) : filteredWorkers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>No workers found.</td>
                  </tr>
                ) : (
                  filteredWorkers.map((worker) => (
                    <tr key={worker._id}>
                      <td>
                        <p className="admin-table__cell-primary">{worker.firstName} {worker.lastName}</p>
                        <p className="admin-table__cell-sub">{worker._id}</p>
                      </td>
                      <td>{worker.worker?.serviceCategory?.name || "N/A"}</td>
                      <td>{worker.phone}</td>
                      <td>{worker.vendorId?.businessName || "N/A"}</td>
                      <td>
                        <WorkerStatus value={worker.worker?.verificationStatus || "pending"} />
                      </td>
                      <td>
                        {worker.worker?.verificationStatus === "pending" ? (
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button 
                              onClick={() => handleApprove(worker._id)}
                              className="btn btn--primary" 
                              style={{ padding: "4px 8px", fontSize: "12px", minHeight: "auto", borderRadius: "var(--radius-md)" }}
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleReject(worker._id)}
                              className="btn btn--danger" 
                              style={{ padding: "4px 8px", fontSize: "12px", minHeight: "auto", background: "var(--color-danger)", color: "white", borderRadius: "var(--radius-md)" }}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
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
    approved: "badge--success",
    pending: "badge--warning",
    rejected: "badge--danger",
  }
  return (
    <span className={`badge ${variantMap[value.toLowerCase()] || "badge--neutral"}`} style={{ textTransform: "capitalize" }}>
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
