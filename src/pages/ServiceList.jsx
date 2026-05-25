import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, PageShell, SectionCard, StatusPill } from "../components/admin/AdminPageElements"
import { Layers3, Plus } from "lucide-react"

const services=[
  { name:"AC Repair", category:"Electrical", price:"₹499", status:"Active" },
  { name:"Pipe Fix", category:"Plumbing", price:"₹299", status:"Active" },
  { name:"Deep Cleaning", category:"Cleaning", price:"₹899", status:"Draft" },
  { name:"Appliance Service", category:"Repair", price:"₹799", status:"Active" }
]

function ServiceList(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),450)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Service List"

description="Prepare the service catalog table with pricing, category, and status fields for live data integration."

actions={[

<button key="add-service" type="button" className="inline-flex items-center gap-2 rounded-2xl bg-[#031B52] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#04225f]">

<Plus size={16} />

Add Service

</button>

]}

>

<SectionCard title="Service Catalog" description="Service Name, Category, Price, Status, and actions are structured for the API.">

{loading ? <LoadingGrid cards={4} /> : (

<div className="overflow-x-auto">

<table className="w-full min-w-[760px]">

<thead>

<tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">

<th className="pb-4">Service Name</th>

<th className="pb-4">Category</th>

<th className="pb-4">Price</th>

<th className="pb-4">Status</th>

<th className="pb-4">Actions</th>

</tr>

</thead>

<tbody>

{services.map((service)=>(

<tr key={service.name} className="border-b border-slate-100 last:border-0">

<td className="py-5 font-medium text-slate-900">{service.name}</td>

<td className="py-5 text-slate-600">{service.category}</td>

<td className="py-5 text-slate-600">{service.price}</td>

<td className="py-5"><StatusPill status={service.status} /></td>

<td className="py-5">

<div className="flex flex-wrap gap-2">

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Edit</button>

<button type="button" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Publish</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="Keeps the future empty state ready for live service CRUD actions.">

<EmptyState title="API Integration Pending" description="The service catalog API will populate this area with filters, bulk actions, and editable rows." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default ServiceList