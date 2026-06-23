import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"
import { EmptyState, LoadingGrid, PageShell, SectionCard, StatusPill } from "../components/AdminPageElements"

const transactions=[
  { id:"TXN-7001", booking:"BK1001", customer:"Rahul Sharma", method:"Card", amount:"₹899", status:"Paid" },
  { id:"TXN-7002", booking:"BK1002", customer:"Priya Singh", method:"UPI", amount:"₹699", status:"Pending" },
  { id:"TXN-7003", booking:"BK1003", customer:"Aman Gupta", method:"Wallet", amount:"₹1,250", status:"Paid" }
]

function Transactions(){

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>setLoading(false),500)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Transactions"

description="Track platform transactions, payment modes, and live settlement readiness in a clean table layout."

>

<div className="grid grid-cols-1 gap-4 md:grid-cols-3">

<div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
<p className="text-sm font-medium text-slate-500">Paid Volume</p>
<p className="mt-3 text-3xl font-bold text-slate-900">₹2.8L</p>
<p className="mt-2 text-sm text-slate-500">Across successful checkout flows</p>
</div>

<div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
<p className="text-sm font-medium text-slate-500">Pending Volume</p>
<p className="mt-3 text-3xl font-bold text-slate-900">₹41K</p>
<p className="mt-2 text-sm text-slate-500">Awaiting capture or settlement</p>
</div>

<div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
<p className="text-sm font-medium text-slate-500">Refunds</p>
<p className="mt-3 text-3xl font-bold text-slate-900">₹6.4K</p>
<p className="mt-2 text-sm text-slate-500">Reserved for future reconciliation</p>
</div>

</div>

<SectionCard title="Transaction Ledger" description="Transaction ID, Booking, Customer, Method, Amount, and Status are ready for API binding.">

{loading ? <LoadingGrid cards={4} /> : (

<div className="overflow-x-auto">

<table className="w-full min-w-[900px]">

<thead>

<tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">

<th className="pb-4">Transaction ID</th>

<th className="pb-4">Booking</th>

<th className="pb-4">Customer</th>

<th className="pb-4">Method</th>

<th className="pb-4">Amount</th>

<th className="pb-4">Status</th>

<th className="pb-4">Actions</th>

</tr>

</thead>

<tbody>

{transactions.map((transaction)=>(

<tr key={transaction.id} className="border-b border-slate-100 last:border-0">

<td className="py-5 font-medium text-slate-900">{transaction.id}</td>

<td className="py-5 text-slate-600">{transaction.booking}</td>

<td className="py-5 text-slate-600">{transaction.customer}</td>

<td className="py-5 text-slate-600">{transaction.method}</td>

<td className="py-5 text-slate-600">{transaction.amount}</td>

<td className="py-5"><StatusPill status={transaction.status} /></td>

<td className="py-5">

<div className="flex flex-wrap gap-2">

<button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">View</button>

<button type="button" className="rounded-2xl border border-[#05AFC7]/20 bg-[#05AFC7]/10 px-4 py-2 text-sm font-semibold text-[#047e93]">Retry</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</SectionCard>

<SectionCard title="Integration Placeholder" description="Keeps the empty state in place for the payment gateway integration.">

<EmptyState title="API Integration Pending" description="This section will later surface reconciliation, capture status, and export actions." />

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Transactions
