import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout.jsx"
import { EmptyState, LoadingGrid, PageShell, SectionCard, StatusPill } from "../components/admin/AdminPageElements"
import { Building2, ShieldCheck, Wallet } from "lucide-react"

const settlements=[
  { id:"SET-8001", provider:"Spark Electricals", amount:"₹18,450", date:"22 May 2026", status:"Settling" },
  { id:"SET-8002", provider:"Quick Plumbing", amount:"₹11,790", date:"21 May 2026", status:"Paid" },
  { id:"SET-8003", provider:"Home Assist", amount:"₹9,250", date:"20 May 2026", status:"Pending" }
]

function Settlements(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),500)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Settlements"

description="Manage provider settlements, payout status, and processing state from a production-ready table."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-3">

<div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
<p className="text-sm font-medium text-slate-500">Pending Settlement</p>
<p className="mt-3 text-3xl font-bold text-slate-900">₹38K</p>
<p className="mt-2 text-sm text-slate-500">Ready for scheduled payouts</p>
</div>

<div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
<p className="text-sm font-medium text-slate-500">Settled This Week</p>
<p className="mt-3 text-3xl font-bold text-slate-900">₹94K</p>
<p className="mt-2 text-sm text-slate-500">Confirmed and disbursed</p>
</div>

<div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
<p className="text-sm font-medium text-slate-500">Providers</p>
<p className="mt-3 text-3xl font-bold text-slate-900">184</p>
<p className="mt-2 text-sm text-slate-500">Settlement-ready providers</p>
</div>

</div>

<SectionCard title="Settlement Ledger" description="Settlement ID, Provider, Amount, Date, Status, and actions are prepared for live processing.">

{loading ? <LoadingGrid cards={3} /> : (

<div className="overflow-x-auto">

<table className="w-full min-w-[860px]">

<thead>

<tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">

<th className="pb-4">Settlement ID</th>

<th className="pb-4">Provider</th>

<th className="pb-4">Amount</th>

<th className="pb-4">Date</th>

<th className="pb-4">Status</th>

<th className="pb-4">Actions</th>

</tr>

</thead>

<tbody>

{settlements.map((settlement)=>(

<tr key={settlement.id} className="border-b border-slate-100 last:border-0">

<td className="py-5 font-medium text-slate-900">{settlement.id}</td>

<td className="py-5 text-slate-600">{settlement.provider}</td>

<td className="py-5 text-slate-600">{settlement.amount}</td>

<td className="py-5 text-slate-600">{settlement.date}</td>

<td className="py-5"><StatusPill status={settlement.status} /></td>

<td className="py-5">

<div className="flex flex-wrap gap-2">

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">View</button>

<button type="button" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Release</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="Reserved for payout processing, proof-of-payment, and reconciliation states.">

<EmptyState title="API Integration Pending" description="This section will later surface settlement exports, approval flows, and payout confirmations." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Settlements