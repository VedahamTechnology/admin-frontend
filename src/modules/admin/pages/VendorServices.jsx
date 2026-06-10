import AdminLayout from "../layouts/AdminLayout"

import {

Search,
Layers3,
IndianRupee,
CheckCircle2

} from "lucide-react"

function VendorServices(){

const services=[

{

id:"VS001",

vendor:"Spark Electrical",

service:"Electrical Repair",

price:"₹599",

category:"Electrical",

status:"Active"

},

{

id:"VS002",

vendor:"Quick Plumbing",

service:"Pipe Installation",

price:"₹450",

category:"Plumbing",

status:"Pending"

},

{

id:"VS003",

vendor:"Cool Air Services",

service:"AC Installation",

price:"₹899",

category:"AC Repair",

status:"Active"

}

]

return(

<AdminLayout>

<div className="space-y-6">

<div>

<p

className="

text-cyan-600

font-semibold

uppercase

tracking-[4px]

text-sm

"

>

Vendor Operations

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

Vendor Services

</h1>

<p

className="

text-slate-500

mt-2

"

>

Manage vendor listed services and pricing.

</p>

</div>


<div

className="

grid

md:grid-cols-3

gap-5

"

>

<Card

title="Total Services"

value="186"

icon={<Layers3 size={22}/>}

color="bg-cyan-500"

/>

<Card

title="Active"

value="154"

icon={<CheckCircle2 size={22}/>}

color="bg-green-500"

/>

<Card

title="Avg Price"

value="₹620"

icon={<IndianRupee size={22}/>}

color="bg-orange-500"

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

mb-6

"

>

<div

className="

relative

"

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

placeholder="Search vendor service"

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

border

rounded-2xl

px-4

"

>

<option>

All Categories

</option>

<option>

Electrical

</option>

<option>

Plumbing

</option>

<option>

AC Repair

</option>

</select>

</div>


<div className="overflow-x-auto">

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

Vendor

</th>

<th>

Service

</th>

<th>

Category

</th>

<th>

Price

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

services.map((service)=>(

<tr

key={service.id}

className="

border-b

hover:bg-slate-50

"

>

<td className="py-5">

{service.vendor}

</td>

<td>

{service.service}

</td>

<td>

{service.category}

</td>

<td>

{service.price}

</td>

<td>

<Status

value={service.status}

/>

</td>

<td>

<button

className="

px-4

py-2

rounded-xl

bg-[#031B52]

text-white

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

function Status({value}){

const color=

value==="Active"

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

export default VendorServices
