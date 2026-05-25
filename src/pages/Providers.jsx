import AdminLayout from "../layouts/AdminLayout"

import { useEffect, useState } from "react"

import { EmptyState, LoadingGrid, MetricCard, PageShell, SectionCard, StatusPill } from "../components/admin/AdminPageElements"

import { Briefcase, ShieldCheck, Star, Users } from "lucide-react"

function Providers(){

const providers=[
{
id:"VEN001",
business:"Spark Electricals",
owner:"Rahul Kumar",
phone:"9876543210",
status:"Pending"
},
{
id:"VEN002",
business:"Quick Plumbing",
owner:"Amit Sharma",
phone:"9898989898",
status:"Approved"
},
{
id:"VEN003",
business:"Home Assist",
owner:"Neha Verma",
phone:"9123456780",
status:"Blocked"
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

title="Providers"

description="Manage vendors, approvals, service coverage, and operational status from a clean enterprise-style provider console."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

<MetricCard label="All Providers" value="184" change="+8 this week" icon={<Briefcase size={20} />} accentClassName="bg-[#031B52]" />

<MetricCard label="Approved" value="162" change="Ready for live bookings" icon={<ShieldCheck size={20} />} accentClassName="bg-emerald-500" />

<MetricCard label="Pending Review" value="14" change="Requires admin action" icon={<Users size={20} />} accentClassName="bg-amber-500" />

<MetricCard label="Avg Rating" value="4.8/5" change="Customer sentiment is strong" icon={<Star size={20} />} accentClassName="bg-[#05AFC7]" />

</div>

<SectionCard title="Provider Registry" description="Vendor Name, Business Name, Status, Services, and admin actions are ready for the backend.">

{loading ? <LoadingGrid cards={4} /> : (

<div className="overflow-x-auto">

<table className="w-full min-w-[980px]">

<thead>

<tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">

<th className="pb-4">Vendor Name</th>

<th className="pb-4">Business Name</th>

<th className="pb-4">Status</th>

<th className="pb-4">Services</th>

<th className="pb-4">Actions</th>

</tr>

</thead>

<tbody>

{providers.map((provider)=>(

<tr key={provider.id} className="border-b border-slate-100 last:border-0">

<td className="py-5">

<p className="font-medium text-slate-900">{provider.owner}</p>

<p className="mt-1 text-sm text-slate-500">{provider.phone}</p>

</td>

	const [loading, setLoading] = useState(true)

<td className="py-5">

<StatusPill status={provider.status} />

</td>

<td className="py-5 text-slate-600">Electrical, Plumbing, Appliance Care</td>

<td className="py-5">

<div className="flex flex-wrap gap-2">

<button type="button" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Approve</button>

<button type="button" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">Reject</button>

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Block</button>

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Delete</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="The future provider API can be mounted here without redesigning the page.">

<EmptyState title="API Integration Pending" description="This area is reserved for advanced filters, approval queues, and vendor activity details." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Providers
