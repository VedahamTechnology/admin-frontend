import AdminLayout from "../layouts/AdminLayout"

import {

Wallet,
CheckCircle2,
Clock3,
Search,
Download

} from "lucide-react"

function Settlements(){

const settlements=[

{

id:"SET001",

vendor:"Spark Electrical",

amount:"₹18,400",

bookings:42,

date:"25 May 2026",

status:"Paid"

},

{

id:"SET002",

vendor:"Quick Plumbing",

amount:"₹11,250",

bookings:29,

date:"24 May 2026",

status:"Pending"

},

{

id:"SET003",

vendor:"Cool Air Services",

amount:"₹22,800",

bookings:53,

date:"23 May 2026",

status:"Processing"

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

Finance Operations

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

Settlements

</h1>

<p

className="

text-slate-500

mt-2

"

>

Manage vendor payouts and settlement flow.

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

title="Paid"

value="₹1.82L"

icon={<CheckCircle2 size={22}/>}

color="bg-green-500"

/>

<Card

title="Pending"

value="₹42K"

icon={<Clock3 size={22}/>}

color="bg-orange-500"

/>

<Card

title="Processing"

value="₹21K"

icon={<Wallet size={22}/>}

color="bg-cyan-500"

/>

<Card

title="This Month"

value="₹3.2L"

icon={<Wallet size={22}/>}

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

flex-col

md:flex-row

justify-between

gap-4

mb-6

"

>

<div

className="relative"

>

<Search

size={18}

className="

absolute

left-4

top-3.5

text-slate-400

"

/>

<input

placeholder="Search settlements"

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

Export

</button>

</div>


<div

className="overflow-x-auto"

>

<table

className="w-full"

>

<thead>

<tr

className="

border-b

text-left

text-slate-500

"

>

<th className="pb-4">

Vendor

</th>

<th>

Bookings

</th>

<th>

Amount

</th>

<th>

Date

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

settlements.map((item)=>(

<tr

key={item.id}

className="

border-b

hover:bg-slate-50

"

>

<td

className="py-5"

>

<div>

<p

className="font-semibold"

>

{item.vendor}

</p>

<p

className="

text-sm

text-slate-500

"

>

{item.id}

</p>

</div>

</td>

<td>

{item.bookings}

</td>

<td>

{item.amount}

</td>

<td>

{item.date}

</td>

<td>

<Status

value={item.status}

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

value==="Paid"

?

"bg-green-100 text-green-700"

:

value==="Pending"

?

"bg-orange-100 text-orange-700"

:

"bg-cyan-100 text-cyan-700"

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

export default Settlements
