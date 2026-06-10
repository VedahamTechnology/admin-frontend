import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, MetricCard, PageShell, SectionCard } from "../components/AdminPageElements"
import { IndianRupee, Percent, Tags, Wallet } from "lucide-react"

function Pricing(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),500)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Pricing"

description="Keep service pricing, margin assumptions, and package-level values ready for a future pricing API."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

<MetricCard label="Base Pricing" value="₹299" change="Lowest entry point" icon={<IndianRupee size={20} />} accentClassName="bg-[#031B52]" />

<MetricCard label="Margin %" value="24%" change="Safe operating margin" icon={<Percent size={20} />} accentClassName="bg-[#05AFC7]" />

<MetricCard label="Categories" value="18" change="Ready for catalog scale" icon={<Tags size={20} />} accentClassName="bg-amber-500" />

<MetricCard label="Revenue Pool" value="₹6.4L" change="Projected monthly" icon={<Wallet size={20} />} accentClassName="bg-emerald-500" />

</div>

<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

<SectionCard title="Pricing Blocks" description="Reserve space for pricing tiers, discounts, and service add-ons.">

{loading ? <LoadingGrid cards={2} /> : (

<div className="grid gap-4 md:grid-cols-2">

{[

{ name:"Standard", amount:"₹299", note:"Basic service starting price" },

{ name:"Premium", amount:"₹799", note:"Priority response package" }

].map((tier)=>(

<div key={tier.name} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">

<p className="text-sm font-semibold text-slate-500">{tier.name}</p>

<p className="mt-3 text-3xl font-bold text-slate-900">{tier.amount}</p>

<p className="mt-2 text-sm text-slate-500">{tier.note}</p>

</div>

))}

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="An empty state is kept ready for pricing rules and discount engine wiring.">

<EmptyState title="API Integration Pending" description="Use this area for package pricing, overrides, seasonal discounts, and approval workflows later on." />

</SectionCard>

</div>

</PageShell>

</AdminLayout>

)

}

export default Pricing
