import AdminLayout from "../layouts/AdminLayout"

import { useEffect, useState } from "react"

import { EmptyState, LoadingGrid, MetricCard, PageShell, SectionCard, StatusPill } from "../components/admin/AdminPageElements"

import { CalendarCheck, Clock3, IndianRupee, ShieldCheck } from "lucide-react"

function Bookings(){

const bookings=[
{
id:"BK1001",
customer:"Rahul Sharma",
service:"AC Repair",
provider:"Spark Electricals",
amount:"₹899",
status:"Completed"
},
{
id:"BK1002",
customer:"Priya Singh",
service:"Plumbing",
provider:"Quick Plumbing",
amount:"₹699",
status:"Pending"
},
{
id:"BK1003",
customer:"Aman Gupta",
service:"Cleaning",
provider:"Home Assist",
amount:"₹1,049",
status:"Cancelled"
}
]

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),500)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Bookings"

description="Review service bookings, lifecycle states, and revenue impact from a card-based operational view."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

<MetricCard label="Total Bookings" value="328" change="+18 today" icon={<CalendarCheck size={20} />} accentClassName="bg-[#031B52]" />

<MetricCard label="Pending" value="46" change="Needs assignment" icon={<Clock3 size={20} />} accentClassName="bg-amber-500" />

<MetricCard label="Completed" value="255" change="+11 this week" icon={<ShieldCheck size={20} />} accentClassName="bg-emerald-500" />

<MetricCard label="Revenue" value="₹1.24L" change="Protected against leakage" icon={<IndianRupee size={20} />} accentClassName="bg-[#05AFC7]" />

</div>

<SectionCard title="Booking Cards" description="Booking ID, Customer, Worker, Status, Price, and details actions are prepared for API binding.">

{loading ? <LoadingGrid cards={4} /> : (

<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

{bookings.map((booking)=>(

<article key={booking.id} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">

<div className="flex items-start justify-between gap-4">

<div>

<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Booking ID</p>

<h3 className="mt-2 text-xl font-semibold text-slate-900">{booking.id}</h3>
</div>

<StatusPill status={booking.status} />

</div>

<div className="mt-6 grid gap-4 sm:grid-cols-2">

<div className="rounded-2xl bg-slate-50 p-4">
<p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Customer</p>
<p className="mt-2 text-base font-semibold text-slate-900">{booking.customer}</p>
</div>

<div className="rounded-2xl bg-slate-50 p-4">
<p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Service</p>
<p className="mt-2 text-base font-semibold text-slate-900">{booking.service}</p>
</div>

<div className="rounded-2xl bg-slate-50 p-4">
<p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Provider</p>
<p className="mt-2 text-base font-semibold text-slate-900">{booking.provider}</p>
</div>

<div className="rounded-2xl bg-slate-50 p-4">
<p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Amount</p>
<p className="mt-2 text-base font-semibold text-slate-900">{booking.amount}</p>
</div>

</div>

<div className="mt-6 flex flex-wrap gap-3">

<button type="button" className="rounded-2xl bg-[#031B52] px-4 py-3 text-sm font-semibold text-white">View Details</button>

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">Open Timeline</button>

</div>

</article>

))}

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="The booking API can plug into this empty state without changing the page structure.">

<EmptyState title="API Integration Pending" description="This section will later expose assignment actions, SLA views, and booking filters." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Bookings
