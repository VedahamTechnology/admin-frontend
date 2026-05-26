import AdminLayout from "../layouts/AdminLayout"

import {

BarChart3,
TrendingUp,
Users,
Wallet,
Download

} from "lucide-react"

function Reports(){

const reports=[

{

name:"Revenue Report",

date:"25 May 2026",

type:"Finance",

status:"Generated"

},

{

name:"Booking Analytics",

date:"24 May 2026",

type:"Operations",

status:"Generated"

},

{

name:"Vendor Performance",

date:"24 May 2026",

type:"Vendor",

status:"Pending"

},

{

name:"User Activity",

date:"23 May 2026",

type:"Customer",

status:"Generated"

}

]

return(

<AdminLayout>

<div className="space-y-6">

<div>

<p

className="

text-cyan-600

uppercase

tracking-[4px]

font-semibold

text-sm

"

>

Analytics Center

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

Reports

</h1>

<p

className="

text-slate-500

mt-2

"

>

Platform reports and business analytics.

</p>

</div>


<div

className="

grid

md:grid-cols-4

gap-5

"

>

<Card

title="Revenue"

value="₹1.24L"

icon={<Wallet size={22}/>}

color="bg-cyan-500"

/>

<Card

title="Bookings"

value="328"

icon={<BarChart3 size={22}/>}

color="bg-orange-500"

/>

<Card

title="Growth"

value="+12%"

icon={<TrendingUp size={22}/>}

color="bg-green-500"

/>

<Card

title="Users"

value="1240"

icon={<Users size={22}/>}

color="bg-[#031B52]"

/>

</div>


<div

className="

bg-white

rounded-[28px]

border

border-slate-200

p-6

"

>

<div

className="

flex

justify-between

items-center

mb-6

"

>

<h2

className="

text-2xl

font-bold

"

>

Generated Reports

</h2>

<button

className="

flex

items-center

gap-2

bg-[#031B52]

text-white

px-5

py-3

rounded-2xl

"

>

<Download size={18}/>

Export All

</button>

</div>


<div

className="overflow-x-auto"

>

<table className="w-full">

<thead>

<tr

className="

border-b

text-left

text-slate-500

"

>

<th className="pb-4">

Report Name

</th>

<th>

Date

</th>

<th>

Type

</th>

<th>

Status

</th>

<th>

Action

</th>

</tr>

</thead>

<tbody>

{

reports.map((report)=>(

<tr

key={report.name}

className="

border-b

hover:bg-slate-50

"

>

<td

className="py-5"

>

{report.name}

</td>

<td>

{report.date}

</td>

<td>

{report.type}

</td>

<td>

<Status

value={report.status}

/>

</td>

<td>

<button

className="

bg-slate-100

px-4

py-2

rounded-xl

hover:bg-slate-200

"

>

View

</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</div>

</AdminLayout>

)

}

function Status({

value

}){

const color=

value==="Generated"

?

"bg-green-100 text-green-700"

:

"bg-orange-100 text-orange-700"

return(

<span

className={`

px-3

py-1

rounded-full

text-sm

${color}

`}

>

{value}

</span>

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

hover:shadow-xl

transition-all

"

>

<div>

<p

className="text-slate-500"

>

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

export default Reports