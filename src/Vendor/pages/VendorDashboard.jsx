import { CalendarCheck, Clock3, LayoutDashboard, Wallet } from "lucide-react"

import VendorLayout from "../Layouts/VendorLayout"
import { MetricCard, PageShell, SectionCard } from "../../components/admin/AdminPageElements"

function VendorDashboard() {
  return (
    <VendorLayout>
      <PageShell
        title="Dashboard"
        description="Track bookings, service activity, and revenue at a glance while keeping the vendor shell aligned with the admin system."
      >
        <div className="metric-grid metric-grid--4">
          <MetricCard
            label="Total Bookings"
            value="128"
            change="All-time overview"
            icon={<LayoutDashboard size={20} />}
            accentClassName="bg-[#031B52]"
          />
          <MetricCard
            label="Pending Bookings"
            value="18"
            change="Awaiting confirmation"
            icon={<Clock3 size={20} />}
            accentClassName="bg-amber-500"
          />
          <MetricCard
            label="Completed Bookings"
            value="96"
            change="Finished successfully"
            icon={<CalendarCheck size={20} />}
            accentClassName="bg-emerald-500"
          />
          <MetricCard
            label="Revenue"
            value="₹42,800"
            change="Placeholder total"
            icon={<Wallet size={20} />}
            accentClassName="bg-[#05AFC7]"
          />
        </div>

        <SectionCard
          title="Vendor Overview"
          description="This page is intentionally lightweight for now and keeps the same card system used across the admin panel."
        >
          <p className="section-card__desc">
            API wiring can be added later without changing the vendor page structure or styling conventions.
          </p>
        </SectionCard>
      </PageShell>
    </VendorLayout>
  )
}

export default VendorDashboard