import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, MetricCard, PageShell, SectionCard, StatusPill } from "../components/AdminPageElements"
import { Briefcase, CalendarCheck, Clock3, IndianRupee } from "lucide-react"

const bookings=[
  { id:"PBK-2001", vendor:"Spark Electricals", customer:"Aman Gupta", status:"Pending", price:"₹1,299" },
  { id:"PBK-2002", vendor:"Quick Plumbing", customer:"Nisha Reddy", status:"Completed", price:"₹899" },
  { id:"PBK-2003", vendor:"Home Assist", customer:"Karan Malhotra", status:"Pending", price:"₹1,750" }
]

function ProviderBookings(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),550)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Provider Bookings"

description="Monitor provider-side booking activity, assignment readiness, and payout impact with a future-proof card layout."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

<MetricCard label="Provider Assignments" value="428" change="+14 this week" icon={<Briefcase size={20} />} accentClassName="bg-[#031B52]" />

<MetricCard label="Confirmed Jobs" value="311" change="+9% completion rate" icon={<CalendarCheck size={20} />} accentClassName="bg-[#05AFC7]" />

<MetricCard label="Pending Approvals" value="24" change="Needs review" icon={<Clock3 size={20} />} accentClassName="bg-amber-500" />

<MetricCard label="Total Value" value="₹4.8L" change="Projected monthly payout" icon={<IndianRupee size={20} />} accentClassName="bg-emerald-500" />

</div>

<SectionCard title="Assigned Booking Queue" description="Booking cards are structured for provider confirmation, escalation, and details actions.">

{loading ? <LoadingGrid cards={4} /> : (

<div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

{bookings.map((booking)=>(

<article key={booking.id} className="rounded-[24px] border border-slate-200 bg-white p-5">

<div className="flex items-start justify-between gap-4">

<div>

<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Booking ID</p>

<h3 className="mt-2 text-xl font-semibold text-slate-900">{booking.id}</h3>
</div>

<StatusPill status={booking.status} />

</div>

<div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">

<p><span className="font-semibold text-slate-900">Vendor:</span> {booking.vendor}</p>

<p><span className="font-semibold text-slate-900">Customer:</span> {booking.customer}</p>

<p><span className="font-semibold text-slate-900">Price:</span> {booking.price}</p>

</div>

<div className="mt-5 flex flex-wrap gap-3">

<button type="button" className="rounded-2xl bg-[#031B52] px-4 py-3 text-sm font-semibold text-white">View Details</button>

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">Approve</button>

</div>

</article>

))}

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="This empty state is ready for the live provider booking service response.">

<EmptyState title="API Integration Pending" description="When the booking API is connected, this area can render provider filters, batch actions, and approval workflows." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default ProviderBookings
