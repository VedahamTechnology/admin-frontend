import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, MetricCard, PageShell, SectionCard } from "../components/admin/AdminPageElements"
import { Briefcase, CalendarCheck, ShieldCheck, Star } from "lucide-react"

function ProviderAnalytics(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),500)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Provider Analytics"

description="Track provider engagement, fulfillment quality, and growth trends with an analytics-ready layout."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

<MetricCard label="All Providers" value="184" change="+8 new approvals" icon={<Briefcase size={20} />} accentClassName="bg-[#031B52]" />

<MetricCard label="Fulfilled Jobs" value="6,420" change="+16.5% month over month" icon={<CalendarCheck size={20} />} accentClassName="bg-[#05AFC7]" />

<MetricCard label="Quality Score" value="4.8/5" change="Based on customer ratings" icon={<Star size={20} />} accentClassName="bg-amber-500" />

<MetricCard label="Verified" value="92%" change="Identity and compliance ready" icon={<ShieldCheck size={20} />} accentClassName="bg-emerald-500" />

</div>

<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

<SectionCard title="Provider Trend Chart" description="Reserved for top providers, completion rate, and retention curves.">

{loading ? <LoadingGrid cards={1} /> : <div className="flex h-[320px] items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">Chart Integration Pending</div>}

</SectionCard>

<SectionCard title="Operational Notes" description="Ready for future insight widgets and service-level summaries.">

{loading ? <LoadingGrid cards={1} /> : (

<div className="space-y-4">

{[

"High-performing providers close requests within the first response window.",

"Top vendors account for a growing share of repeat bookings.",

"Verified providers show stronger conversion across premium services."

].map((point)=>(

<div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">

{point}

</div>

))}

</div>

)}

</SectionCard>

</div>

<SectionCard title="Empty State Placeholder" description="Maintained so the final API response can be slotted in cleanly.">

<EmptyState title="API Integration Pending" description="This section will later render provider segmentation, export controls, and compliance indicators." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default ProviderAnalytics