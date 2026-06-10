import AdminLayout from "../layouts/AdminLayout"

import { useEffect,useState } from "react"

import { EmptyState, LoadingGrid, MetricCard, PageShell, SectionCard, StatusPill } from "../components/AdminPageElements"

import { Layers3, Percent, Tags, Wallet } from "lucide-react"

function Services(){

const services=[

{

id:"SER001",

name:"AC Repair",

category:"Electrical",

brand:"LG",

price:"₹499"

},

{

id:"SER002",

name:"Pipe Fix",

category:"Plumbing",

brand:"General",

price:"₹299"

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

title="Services"

description="Manage the service catalog, pricing context, categories, and operational status from one workspace."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

<MetricCard label="Service Count" value="286" change="+16 added this month" icon={<Layers3 size={20} />} accentClassName="bg-[#031B52]" />

<MetricCard label="Categories" value="18" change="Catalog is well organized" icon={<Tags size={20} />} accentClassName="bg-[#05AFC7]" />

<MetricCard label="Avg Price" value="₹749" change="Across core services" icon={<Wallet size={20} />} accentClassName="bg-emerald-500" />

<MetricCard label="Promo Coverage" value="24%" change="Offers and bundles active" icon={<Percent size={20} />} accentClassName="bg-amber-500" />

</div>

<SectionCard title="Service Catalog" description="Service Name, Category, Price, and Status are kept in a single table ready for API data.">

{loading ? <LoadingGrid cards={4} /> : (

<div className="overflow-x-auto">

<table className="w-full min-w-[840px]">

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

{services.map((item,index)=>(

<tr key={item.id} className="border-b border-slate-100 last:border-0">

<td className="py-5 font-medium text-slate-900">{item.name}</td>

<td className="py-5 text-slate-600">{item.category}</td>

<td className="py-5 text-slate-600">{item.price}</td>

<td className="py-5"><StatusPill status={index % 2 === 0 ? "Active" : "Draft"} /></td>

<td className="py-5">

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Edit</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="The API-first version of this catalog can land here later without redesign.">

<EmptyState title="API Integration Pending" description="This section remains reserved for service creation, bulk updates, and price-rule management." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Services
