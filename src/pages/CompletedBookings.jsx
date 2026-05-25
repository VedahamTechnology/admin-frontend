import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, PageShell, SectionCard, StatusPill } from "../components/admin/AdminPageElements"
import { CheckCircle2 } from "lucide-react"

const bookings=[
  { id:"CBK-4001", customer:"Vivek Sharma", worker:"Spark Electricals", status:"Completed", price:"₹899" },
  { id:"CBK-4002", customer:"Pooja Mehta", worker:"Quick Plumbing", status:"Completed", price:"₹1,199" },
  { id:"CBK-4003", customer:"Raj Singh", worker:"Home Assist", status:"Completed", price:"₹749" }
]

function CompletedBookings(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),500)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Completed Bookings"

description="Keep a clean, review-ready record of completed work with space for future audit and export actions."

>

<SectionCard title="Completed Queue" description="Booking cards keep the same customer, worker, status, and price layout for API consistency.">

{loading ? <LoadingGrid cards={3} /> : (

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

<div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">

<p><span className="font-semibold text-slate-900">Customer:</span> {booking.customer}</p>

<p className="mt-2"><span className="font-semibold text-slate-900">Worker:</span> {booking.worker}</p>

<p className="mt-2"><span className="font-semibold text-slate-900">Price:</span> {booking.price}</p>

</div>

<div className="mt-5 flex flex-wrap gap-3">

<button type="button" className="rounded-2xl bg-[#031B52] px-4 py-3 text-sm font-semibold text-white">View Details</button>

<button type="button" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Download Receipt</button>

</div>

</article>

))}

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="A dedicated empty state is preserved for future reporting workflows.">

<EmptyState title="API Integration Pending" description="Completed-booking exports, filters, and audit views will land here once the API is connected." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default CompletedBookings