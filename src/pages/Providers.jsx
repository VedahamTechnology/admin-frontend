import AdminLayout from "../layouts/AdminLayout"

import { useEffect, useState } from "react"

import {
EmptyState,
LoadingGrid,
MetricCard,
PageShell,
SectionCard,
StatusPill
} from "../components/admin/AdminPageElements"

import {
Briefcase,
ShieldCheck,
Star,
Users
} from "lucide-react"

function Providers(){

const providers=[

{
id:"VEN001",
business:"Spark Electricals",
owner:"Rahul Kumar",
phone:"9876543210",
status:"Pending"
},

{
id:"VEN002",
business:"Quick Plumbing",
owner:"Amit Sharma",
phone:"9898989898",
status:"Approved"
},

{
id:"VEN003",
business:"Home Assist",
owner:"Neha Verma",
phone:"9123456780",
status:"Blocked"
},

{
id:"VEN004",
business:"Elite Repairs",
owner:"Rohit Gupta",
phone:"9988776655",
status:"Approved"
}

]

const [loading,setLoading]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>{

setLoading(false)

},500)

return()=>clearTimeout(timer)

},[])

return(

<AdminLayout>

<PageShell

title="Providers"

description="Manage vendors, approvals, service coverage, and operational status."

>

<div

className="

grid
grid-cols-1
gap-4

md:grid-cols-2

xl:grid-cols-4

"

>

<MetricCard

label="All Providers"

value="184"

change="+8 this week"

icon={<Briefcase size={20}/>}

accentClassName="bg-[#031B52]"

/>

<MetricCard

label="Approved"

value="162"

change="Ready for live bookings"

icon={<ShieldCheck size={20}/>}

accentClassName="bg-emerald-500"

/>

<MetricCard

label="Pending Review"

value="14"

change="Requires admin action"

icon={<Users size={20}/>}

accentClassName="bg-amber-500"

/>

<MetricCard

label="Average Rating"

value="4.8/5"

change="Customer satisfaction strong"

icon={<Star size={20}/>}

accentClassName="bg-cyan-500"

/>

</div>


<SectionCard

title="Provider Registry"

description="Monitor vendors, approvals, and operational status."

>

{

loading

?

<LoadingGrid cards={4}/>

:

(

<div className="overflow-x-auto">

<table

className="

w-full
min-w-[950px]

"

>

<thead>

<tr

className="

border-b

border-slate-200

text-left

text-xs

font-semibold

uppercase

tracking-[0.15em]

text-slate-500

"

>

<th className="pb-4">

Owner

</th>

<th className="pb-4">

Business

</th>

<th className="pb-4">

Phone

</th>

<th className="pb-4">

Status

</th>

<th className="pb-4">

Services

</th>

<th className="pb-4">

Actions

</th>

</tr>

</thead>


<tbody>

{

providers.map((provider)=>(

<tr

key={provider.id}

className="

border-b

border-slate-100

hover:bg-slate-50

transition-all

"

>

<td className="py-5">

<div>

<p

className="

font-semibold

text-slate-900

"

>

{provider.owner}

</p>

<p

className="

text-sm

text-slate-500

"

>

{provider.id}

</p>

</div>

</td>


<td className="py-5">

<p

className="

font-medium

text-slate-700

"

>

{provider.business}

</p>

</td>


<td

className="

py-5

text-slate-600

"

>

{provider.phone}

</td>


<td className="py-5">

<StatusPill

status={provider.status}

/>

</td>


<td

className="

py-5

text-slate-600

"

>

Electrical,
Plumbing,
Cleaning

</td>


<td className="py-5">

<div

className="

flex

flex-wrap

gap-2

"

>

<button

className="

px-3

py-2

rounded-xl

bg-emerald-50

text-emerald-700

font-medium

hover:bg-emerald-100

"

>

Approve

</button>

<button

className="

px-3

py-2

rounded-xl

bg-red-50

text-red-600

font-medium

hover:bg-red-100

"

>

Reject

</button>

<button

className="

px-3

py-2

rounded-xl

border

border-slate-200

hover:bg-slate-100

"

>

Block

</button>

<button

className="

px-3

py-2

rounded-xl

border

border-slate-200

hover:bg-slate-100

"

>

Delete

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}

</SectionCard>


<SectionCard

title="Provider Insights"

description="Reserved for backend analytics and provider API integration."

>

<EmptyState

title="API Integration Pending"

description="Provider performance analytics and approval queue will appear here."

/>

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Providers