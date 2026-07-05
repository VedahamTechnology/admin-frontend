import { useMemo, useState } from "react"
import {
  IndianRupee,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Search,
  Eye,
} from "lucide-react"
import AdminLayout from "../layouts/AdminLayout"
import { PageShell, SectionCard } from "../components/AdminPageElements"

// ── Types ────────────────────────────────────────────────────
const STATUS_OPTIONS = ["all", "success", "pending", "failed", "refunded"]
const METHOD_OPTIONS = ["all", "UPI", "Card", "Wallet", "Cash"]

// ── Status badge ─────────────────────────────────────────────
const statusMeta = {
  success:  { label: "Success",  className: "badge badge--success" },
  pending:  { label: "Pending",  className: "badge badge--warning" },
  failed:   { label: "Failed",   className: "badge badge--danger"  },
  refunded: { label: "Refunded", className: "badge"                },
}

function StatusBadge({ status }) {
  const meta = statusMeta[status] || { label: status, className: "badge" }
  return <span className={meta.className}>{meta.label}</span>
}

// ── Stat card ────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="metric-card">
      <div>
        <p className="metric-card__label">{label}</p>
        <p className="metric-card__value">{value}</p>
      </div>
      <div className={`metric-card__icon ${accent}`}>
        <Icon size={20} />
      </div>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────
const payments = []

export default function Payments() {
  const [search, setSearch]         = useState("")
  const [statusFilter, setStatus]   = useState("all")
  const [methodFilter, setMethod]   = useState("all")

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return payments.filter((p) => {
      const matchSearch =
        !q ||
        p.transactionId?.toLowerCase().includes(q) ||
        p.bookingId?.toLowerCase().includes(q) ||
        p.customer?.toLowerCase().includes(q) ||
        p.vendor?.toLowerCase().includes(q)
      const matchStatus = statusFilter === "all" || p.status === statusFilter
      const matchMethod = methodFilter === "all" || p.method === methodFilter
      return matchSearch && matchStatus && matchMethod
    })
  }, [search, statusFilter, methodFilter])

  return (
    <AdminLayout>
      <PageShell
        eyebrow="Payment Management"
        title="Payments"
        description="Manage customer payments, revenue and transaction history."
      >
        {/* ── Stat cards ────────────────────────────────────── */}
        <div className="metric-grid metric-grid--4">
          <StatCard
            label="Total Revenue"
            value="₹0"
            icon={IndianRupee}
            accent="accent-cyan"
          />
          <StatCard
            label="Successful Payments"
            value="0"
            icon={CheckCircle2}
            accent="accent-success"
          />
          <StatCard
            label="Pending Payments"
            value="0"
            icon={Clock3}
            accent="accent-warning"
          />
          <StatCard
            label="Refunded"
            value="₹0"
            icon={RotateCcw}
            accent="accent-danger"
          />
        </div>

        {/* ── Table card ────────────────────────────────────── */}
        <SectionCard
          title="Transaction History"
          description="All payment transactions recorded on the platform."
        >
          {/* Toolbar */}
          <div className="table-toolbar">
            <div className="search-wrapper">
              <Search size={18} className="search-wrapper__icon" />
              <input
                className="admin-input"
                placeholder="Search transaction..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <select
                className="admin-select"
                value={statusFilter}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "all" ? "All Status" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>

              <select
                className="admin-select"
                value={methodFilter}
                onChange={(e) => setMethod(e.target.value)}
              >
                {METHOD_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "all" ? "All Methods" : opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "48px 0",
                textAlign: "center",
                color: "var(--color-text-secondary)",
                fontSize: "0.9375rem",
              }}
            >
              No payment records found.
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--min-wide">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Vendor</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Paid On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((payment) => (
                    <tr key={payment.transactionId}>
                      <td>
                        <p className="admin-table__cell-primary">{payment.transactionId}</p>
                      </td>
                      <td>
                        <p className="admin-table__cell-sub">{payment.bookingId}</p>
                      </td>
                      <td>{payment.customer}</td>
                      <td>{payment.vendor}</td>
                      <td>
                        <span style={{ fontWeight: 600 }}>₹{payment.amount?.toLocaleString("en-IN")}</span>
                      </td>
                      <td>{payment.method}</td>
                      <td>
                        <StatusBadge status={payment.status} />
                      </td>
                      <td>
                        {payment.paidOn
                          ? new Date(payment.paidOn).toLocaleDateString("en-IN")
                          : "—"}
                      </td>
                      <td>
                        <button className="btn btn--outline service-action-btn">
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </PageShell>
    </AdminLayout>
  )
}