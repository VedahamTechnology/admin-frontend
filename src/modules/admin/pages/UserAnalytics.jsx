import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, MetricCard, PageShell, SectionCard } from "../components/AdminPageElements"
import { BarChart3, Clock3, Users, Repeat2 } from "lucide-react"

function UserAnalytics(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),500)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="User Analytics"

description="Measure user growth, retention, and engagement while the data pipeline is prepared for production API responses."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

<MetricCard label="Total Users" value="12,480" change="+18.2% month over month" icon={<Users size={20} />} accentClassName="bg-[#031B52]" />

<MetricCard label="Growth %" value="18.2%" change="+4.1% vs last month" icon={<BarChart3 size={20} />} accentClassName="bg-[#05AFC7]" />

<MetricCard label="Retention %" value="74.6%" change="+2.3% steady retention" icon={<Repeat2 size={20} />} accentClassName="bg-emerald-500" />

<MetricCard label="Avg Response" value="3.4m" change="-21 sec faster" icon={<Clock3 size={20} />} accentClassName="bg-amber-500" />

</div>

<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

<SectionCard title="Trend Overview" description="Chart placeholder for user acquisition, retention, and activity curves.">

{loading ? <LoadingGrid cards={1} /> : <div className="flex h-[320px] items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">Chart Integration Pending</div>}

</SectionCard>

<SectionCard title="Key Insights" description="Space reserved for cohort and lifecycle observations.">

{loading ? <LoadingGrid cards={1} /> : (

<div className="space-y-4">

{[

"Most new signups come from mobile sessions.",

"Returning users complete bookings 27% faster.",

"Retention is strongest on weekday morning requests."

].map((point)=>(

<div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">

{point}

</div>

))}

</div>

)}

</SectionCard>

</div>

<SectionCard title="Empty State Placeholder" description="Keeps the final UI state ready until live analytics arrive.">

<EmptyState title="API Integration Pending" description="This section will later render charts, segmented tables, and export controls from the analytics backend." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default UserAnalytics
