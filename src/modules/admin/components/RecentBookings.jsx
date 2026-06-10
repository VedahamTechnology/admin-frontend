import { Search } from "lucide-react"
import { useState } from "react"

function RecentBookings(){

const [search,setSearch]=useState("")

const bookings=[

{
id:"H1001",
customer:"Rahul",
service:"AC Repair",
amount:"₹899",
status:"Completed"
},

{
id:"H1002",
customer:"Priya",
service:"Cleaning",
amount:"₹499",
status:"Pending"
},

{
id:"H1003",
customer:"Amit",
service:"Plumbing",
amount:"₹1299",
status:"Completed"
},

{
id:"H1004",
customer:"Neha",
service:"Electrician",
amount:"₹699",
status:"Cancelled"
}

]

const filtered=bookings.filter((item)=>item.customer.toLowerCase().includes(search.toLowerCase()))

return(

<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">

<div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5 lg:px-8">

<div>

<p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">

Operations

</p>

<h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">

Recent Bookings

</h2>

<p className="mt-1 text-sm text-slate-500">

Latest customer activity and booking status.

</p>

</div>

<div className="relative w-full max-w-[320px]">

<Search

size={18}

className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"

/>

<input

placeholder="Search customer"

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#05AFC7] focus:bg-white focus:ring-4 focus:ring-[#05AFC7]/10"

/>

</div>

</div>

<div className="overflow-x-auto px-6 pb-2 lg:px-8">

<table className="w-full border-separate border-spacing-0">

<thead>

<tr className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">

<th className="rounded-l-2xl px-5 py-4">

ID

</th>

<th className="px-5 py-4">

Customer

</th>

<th className="px-5 py-4">

Service

</th>

<th className="px-5 py-4">

Amount

</th>

<th className="rounded-r-2xl px-5 py-4">

Status

</th>

</tr>

</thead>

<tbody>

{

filtered.map((item)=>(

<tr

key={item.id}

className="group border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50/80"

>

<td className="px-5 py-5 text-sm font-medium text-slate-900">

{item.id}

</td>

<td className="px-5 py-5 text-sm text-slate-700">

{item.customer}

</td>

<td className="px-5 py-5 text-sm text-slate-600">

{item.service}

</td>

<td className="px-5 py-5 text-sm font-medium text-slate-900">

{item.amount}

</td>

<td className="px-5 py-5">

<span

className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${item.status==="Completed" ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" : item.status==="Pending" ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100" : "bg-rose-50 text-rose-700 ring-1 ring-rose-100"}`}

>

{item.status}

</span>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

)

}

export default RecentBookings