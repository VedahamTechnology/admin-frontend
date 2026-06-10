import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, MetricCard, PageShell, SectionCard, StatusPill } from "../components/AdminPageElements"
import { CalendarCheck, Clock3, IndianRupee, Users } from "lucide-react"

const bookings=[
  { id:"UBK-1001", customer:"Rahul Sharma", worker:"Spark Electricals", status:"Completed", price:"₹899" },
  { id:"UBK-1002", customer:"Priya Singh", worker:"Quick Plumbing", status:"Pending", price:"₹699" },
  { id:"UBK-1003", customer:"Aarav Mehta", worker:"FixIt Pro", status:"Cancelled", price:"₹1,199" },
  { id:"UBK-1004", customer:"Neha Verma", worker:"Home Assist", status:"Completed", price:"₹1,499" }
]

function UserBookings(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),550)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="User Bookings"

description="Track customer bookings, payment values, and service ownership while the API integration is prepared."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

<MetricCard label="Total Bookings" value="1,284" change="+12.8% this month" icon={<CalendarCheck size={20} />} accentClassName="bg-[#031B52]" />

<MetricCard label="Active Customers" value="842" change="+43 today" icon={<Users size={20} />} accentClassName="bg-[#05AFC7]" />

<MetricCard label="Average Value" value="₹1,086" change="+4.2% uplift" icon={<IndianRupee size={20} />} accentClassName="bg-emerald-500" />

<MetricCard label="In Progress" value="36" change="9 need attention" icon={<Clock3 size={20} />} accentClassName="bg-amber-500" />

</div>

<SectionCard title="Recent Bookings" description="Booking ID, Customer, Worker, Status, Price, and details are laid out for API wiring.">

{loading ? (

<LoadingGrid cards={4} />

) : (

<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

{bookings.map((booking)=>(

<article key={booking.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">

<div className="flex items-start justify-between gap-4">

<div>

<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Booking ID</p>

<h3 className="mt-2 text-xl font-semibold text-slate-900">{booking.id}</h3>
</div>

<StatusPill status={booking.status} />

</div>

<div className="mt-6 grid gap-4 sm:grid-cols-2">

<div className="rounded-2xl bg-white p-4">

<p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Customer</p>

<p className="mt-2 text-base font-semibold text-slate-900">{booking.customer}</p>
</div>

<div className="rounded-2xl bg-white p-4">

<p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Worker</p>

<p className="mt-2 text-base font-semibold text-slate-900">{booking.worker}</p>
</div>

<div className="rounded-2xl bg-white p-4">

<p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Status</p>

<p className="mt-2 text-base font-semibold text-slate-900">{booking.status}</p>
</div>

<div className="rounded-2xl bg-white p-4">

<p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Price</p>

<p className="mt-2 text-base font-semibold text-slate-900">{booking.price}</p>
</div>

</div>

<div className="mt-6 flex flex-wrap items-center gap-3">

<button type="button" className="rounded-2xl bg-[#031B52] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#04225f]">

View Details

</button>

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">

Open Timeline

</button>

</div>

</article>

))}

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="A dedicated empty state is kept in place until the booking API is connected.">

<EmptyState title="API Integration Pending" description="Once the bookings endpoint is available, this area can render live booking filters, pagination, and timeline actions." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default UserBookings
