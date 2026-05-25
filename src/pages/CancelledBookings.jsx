import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, PageShell, SectionCard, StatusPill } from "../components/admin/AdminPageElements"
import { XCircle } from "lucide-react"

const bookings=[
  { id:"XBK-5001", customer:"Kiran Das", worker:"No Worker Assigned", status:"Cancelled", price:"₹599" },
  { id:"XBK-5002", customer:"Ritika Bose", worker:"No Worker Assigned", status:"Cancelled", price:"₹899" },
  { id:"XBK-5003", customer:"Sameer Ali", worker:"No Worker Assigned", status:"Cancelled", price:"₹1,049" }
]

function CancelledBookings(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),500)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Cancelled Bookings"

description="Track cancelled requests with the same card layout used for live booking operations."

>

<SectionCard title="Cancelled Queue" description="Each booking card keeps the standard Booking ID, Customer, Worker, Status, Price, and details layout.">

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

<button type="button" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">Review Cancellation</button>

</div>

</article>

))}

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="Kept as a safe empty state for future cancellation workflows.">

<EmptyState title="API Integration Pending" description="This area will later capture reasons, refunds, and dispute-handling actions." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default CancelledBookings