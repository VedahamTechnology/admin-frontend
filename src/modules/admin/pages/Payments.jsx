import AdminLayout from "../layouts/AdminLayout"

import { useEffect, useState } from "react"

import { EmptyState, LoadingGrid, MetricCard, PageShell, SectionCard, StatusPill } from "../components/AdminPageElements"

import { CircleDollarSign, Landmark, ReceiptText, Wallet } from "lucide-react"

function Payments(){

const payments=[
{
id:"PAY001",
booking:"BK1001",
customer:"Rahul Sharma",
worker:"Spark Electricals",
amount:"₹899",
status:"Paid"
},
{
id:"PAY002",
booking:"BK1002",
customer:"Priya Singh",
worker:"Quick Plumbing",
amount:"₹699",
status:"Pending"
},
{
id:"PAY003",
booking:"BK1003",
customer:"Aman Gupta",
worker:"Home Assist",
amount:"₹1,250",
status:"Paid"
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
title="Payments"

description="Keep transaction flow, settlement readiness, and payout health visible from a single overview surface."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

<MetricCard label="Collected" value="₹2.84L" change="Across paid transactions" icon={<CircleDollarSign size={20} />} accentClassName="bg-[#031B52]" />

<MetricCard label="Settlements" value="₹94K" change="Queued for release" icon={<Landmark size={20} />} accentClassName="bg-emerald-500" />

<MetricCard label="Pending" value="₹41K" change="Awaiting confirmation" icon={<Wallet size={20} />} accentClassName="bg-amber-500" />

<MetricCard label="Receipts" value="328" change="Fully traceable records" icon={<ReceiptText size={20} />} accentClassName="bg-[#05AFC7]" />

</div>

<SectionCard title="Payment Ledger" description="Payment ID, Booking, Customer, Provider, Amount, and Status are ready for API integration.">

{loading ? <LoadingGrid cards={4} /> : (

<div className="overflow-x-auto">

<table className="w-full min-w-[900px]">

<thead>

<tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">

<th className="pb-4">Payment ID</th>

<th className="pb-4">Booking</th>

<th className="pb-4">Customer</th>

<th className="pb-4">Provider</th>

<th className="pb-4">Amount</th>

<th className="pb-4">Status</th>

<th className="pb-4">Actions</th>

</tr>

</thead>

<tbody>

{payments.map((payment)=>(

<tr key={payment.id} className="border-b border-slate-100 last:border-0">

<td className="py-5 font-medium text-slate-900">{payment.id}</td>

<td className="py-5 text-slate-600">{payment.booking}</td>

<td className="py-5 text-slate-600">{payment.customer}</td>

<td className="py-5 text-slate-600">{payment.worker}</td>

<td className="py-5 text-slate-600">{payment.amount}</td>

<td className="py-5"><StatusPill status={payment.status} /></td>

<td className="py-5">

<div className="flex flex-wrap gap-2">

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">View</button>

<button type="button" className="rounded-2xl border border-[#05AFC7]/20 bg-[#05AFC7]/10 px-4 py-2 text-sm font-semibold text-[#047e93]">Export</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="The detailed transaction and settlement views continue in the submenu pages.">

<EmptyState title="API Integration Pending" description="This overview remains available for dashboard summaries and payment health snapshots." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Payments
