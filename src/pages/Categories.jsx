import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, PageShell, SectionCard, StatusPill } from "../components/admin/AdminPageElements"
import { Plus, Shapes } from "lucide-react"

const categories=[
  { name:"Electrical", date:"12 Mar 2026", status:"Active" },
  { name:"Plumbing", date:"19 Mar 2026", status:"Active" },
  { name:"Cleaning", date:"01 Apr 2026", status:"Draft" },
  { name:"Appliance Repair", date:"11 Apr 2026", status:"Active" }
]

function Categories(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),450)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Categories"

description="Prepare category management for the service catalog with a production-friendly table layout."

actions={[

<button key="add-category" type="button" className="inline-flex items-center gap-2 rounded-2xl bg-[#031B52] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#04225f]">

<Plus size={16} />

Add Category

</button>

]}

>

<SectionCard title="Category Table" description="Category Name, Created Date, Status, and Actions are ready for API binding.">

{loading ? <LoadingGrid cards={4} /> : (

<div className="overflow-x-auto">

<table className="w-full min-w-[760px]">

<thead>

<tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">

<th className="pb-4">Category Name</th>

<th className="pb-4">Created Date</th>

<th className="pb-4">Status</th>

<th className="pb-4">Actions</th>

</tr>

</thead>

<tbody>

{categories.map((category)=>(

<tr key={category.name} className="border-b border-slate-100 last:border-0">

<td className="py-5 font-medium text-slate-900">{category.name}</td>

<td className="py-5 text-slate-600">{category.date}</td>

<td className="py-5"><StatusPill status={category.status} /></td>

<td className="py-5">

<div className="flex flex-wrap gap-2">

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Edit</button>

<button type="button" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">Delete</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="Keeps a clear empty state available for future backend wiring.">

<EmptyState title="API Integration Pending" description="Category creation, search, and status filters will connect here once the backend is ready." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Categories