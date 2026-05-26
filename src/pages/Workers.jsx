import AdminLayout from "../layouts/AdminLayout"
import { Search, UserCheck, UserX, Wallet } from "lucide-react"

function Workers(){

const workers=[

{
id:"WK001",
name:"Rohit Kumar",
service:"Electrician",
phone:"9876543210",
jobs:42,
rating:"4.8",
status:"Active"
},

{
id:"WK002",
name:"Aman Singh",
service:"Plumber",
phone:"9812345678",
jobs:29,
rating:"4.6",
status:"Busy"
},

{
id:"WK003",
name:"Deepak",
service:"AC Repair",
phone:"9988776655",
jobs:12,
rating:"4.2",
status:"Inactive"
}

]

return(

<AdminLayout>

<div className="space-y-6">

<div>

<p className="text-cyan-600 text-sm font-semibold tracking-[4px] uppercase">

Homster Admin

</p>

<h1 className="text-5xl font-bold text-slate-900">

Workers

</h1>

<p className="text-slate-500 mt-2">

Manage workforce performance and worker operations.

</p>

</div>


<div className="grid md:grid-cols-3 gap-5">

<Card
title="Total Workers"
value="184"
icon={<UserCheck size={22}/>}
color="bg-cyan-500"
/>

<Card
title="Busy Workers"
value="52"
icon={<Wallet size={22}/>}
color="bg-orange-500"
/>

<Card
title="Inactive"
value="11"
icon={<UserX size={22}/>}
color="bg-red-500"
/>

</div>


<div className="bg-white rounded-[28px] border border-slate-200 p-6">

<div className="flex flex-col md:flex-row gap-4 justify-between mb-6">

<div className="relative">

<Search

size={18}

className="absolute left-4 top-3.5 text-slate-400"

/>

<input

placeholder="Search workers"

className="

pl-11
pr-4
py-3

border

rounded-2xl

outline-none

focus:ring-2

focus:ring-cyan-500

w-[320px]

"

/>

</div>

<select

className="

px-4

rounded-2xl

border

outline-none

"

>

<option>

All Workers

</option>

<option>

Active

</option>

<option>

Busy

</option>

<option>

Inactive

</option>

</select>

</div>


<table className="w-full">

<thead>

<tr

className="

border-b

text-slate-500

text-left

"

>

<th className="pb-4">

Worker

</th>

<th>

Service

</th>

<th>

Phone

</th>

<th>

Jobs

</th>

<th>

Rating

</th>

<th>

Status

</th>

</tr>

</thead>


<tbody>

{

workers.map((worker)=>(

<tr

key={worker.id}

className="

border-b

hover:bg-slate-50

transition-all

"

>

<td className="py-5">

<div>

<p className="font-semibold">

{worker.name}

</p>

<p className="text-sm text-slate-500">

{worker.id}

</p>

</div>

</td>

<td>

{worker.service}

</td>

<td>

{worker.phone}

</td>

<td>

{worker.jobs}

</td>

<td>

⭐ {worker.rating}

</td>

<td>

<span

className={`

px-3

py-1

rounded-full

text-sm

${

worker.status==="Active"

?

"bg-green-100 text-green-700"

:

worker.status==="Busy"

?

"bg-orange-100 text-orange-700"

:

"bg-red-100 text-red-600"

}

`}

>

{worker.status}

</span>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</AdminLayout>

)

}


function Card({

title,
value,
icon,
color

}){

return(

<div

className="

bg-white

rounded-[28px]

border

border-slate-200

p-6

flex

justify-between

items-center

hover:-translate-y-1

transition-all

duration-300

hover:shadow-xl

"

>

<div>

<p className="text-slate-500">

{title}

</p>

<h2

className="

text-4xl

font-bold

mt-2

"

>

{value}

</h2>

</div>

<div

className={`

${color}

text-white

p-4

rounded-2xl

`}

>

{icon}

</div>

</div>

)

}

export default Workers