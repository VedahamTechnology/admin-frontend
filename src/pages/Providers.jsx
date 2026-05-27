import AdminLayout from "../layouts/AdminLayout"
import { useEffect, useState } from "react"
import {
  EmptyState,
  LoadingGrid,
  MetricCard,
  PageShell,
  SectionCard,
  StatusPill,
} from "../components/admin/AdminPageElements"
import { Briefcase, ShieldCheck, Star, Users } from "lucide-react"

function Providers() {
  const providers = [
    { id: "VEN001", business: "Spark Electricals", owner: "Rahul Kumar",  phone: "9876543210", status: "Pending"  },
    { id: "VEN002", business: "Quick Plumbing",    owner: "Amit Sharma",  phone: "9898989898", status: "Approved" },
    { id: "VEN003", business: "Home Assist",       owner: "Neha Verma",   phone: "9123456780", status: "Blocked"  },
    { id: "VEN004", business: "Elite Repairs",     owner: "Rohit Gupta",  phone: "9988776655", status: "Approved" },
  ]

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AdminLayout>
      <PageShell
        title="Providers"
        description="Manage vendors, approvals, service coverage, and operational status."
      >
        {/* Metric Cards */}
        <div className="metric-grid metric-grid--4">
          <MetricCard
            label="All Providers"
            value="184"
            change="+8 this week"
            icon={<Briefcase size={20} />}
            accentClassName="accent-navy"
          />
          <MetricCard
            label="Approved"
            value="162"
            change="Ready for live bookings"
            icon={<ShieldCheck size={20} />}
            accentClassName="accent-success"
          />
          <MetricCard
            label="Pending Review"
            value="14"
            change="Requires admin action"
            icon={<Users size={20} />}
            accentClassName="accent-warning"
          />
          <MetricCard
            label="Average Rating"
            value="4.8/5"
            change="Customer satisfaction strong"
            icon={<Star size={20} />}
            accentClassName="accent-cyan"
          />
        </div>

        {/* Provider Table */}
        <SectionCard
          title="Provider Registry"
          description="Monitor vendors, approvals, and operational status."
        >
          {loading ? (
            <LoadingGrid cards={4} />
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--min-wide">
                <thead>
                  <tr>
                    <th>Owner</th>
                    <th>Business</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Services</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((provider) => (
                    <tr key={provider.id}>
                      <td>
                        <p className="admin-table__cell-primary">{provider.owner}</p>
                        <p className="admin-table__cell-sub">{provider.id}</p>
                      </td>
                      <td>{provider.business}</td>
                      <td>{provider.phone}</td>
                      <td>
                        <StatusPill status={provider.status} />
                      </td>
                      <td>Electrical, Plumbing, Cleaning</td>
                      <td>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          <button className="btn btn--success">Approve</button>
                          <button className="btn btn--danger">Reject</button>
                          <button className="btn btn--outline">Block</button>
                          <button className="btn btn--outline">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>

        {/* Insights Placeholder */}
        <SectionCard
          title="Provider Insights"
          description="Reserved for backend analytics and provider API integration."
        >
          <EmptyState
            title="API Integration Pending"
            description="Provider performance analytics and approval queue will appear here."
          />
        </SectionCard>
      </PageShell>
    </AdminLayout>
  )
}

export default Providers
