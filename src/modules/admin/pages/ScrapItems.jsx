import AdminLayout from "../layouts/AdminLayout"

import {

Package,
Boxes,
Search,
TriangleAlert

} from "lucide-react"

function ScrapItems(){

const items=[

{

id:"SC001",

name:"Copper Wire",

category:"Metal",

stock:"124 Kg",

price:"₹420/Kg",

status:"Available"

},

{

id:"SC002",

name:"Plastic Waste",

category:"Plastic",

stock:"45 Kg",

price:"₹38/Kg",

status:"Low Stock"

},

{

id:"SC003",

name:"Steel Scrap",

category:"Metal",

stock:"210 Kg",

price:"₹58/Kg",

status:"Available"

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

Inventory

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

Scrap Items

</h1>

<p

className="

text-slate-500

mt-2

"

>

Manage scrap inventory and pricing.

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

title="Items"

value="84"

icon={<Package size={22}/>}

color="bg-cyan-500"

/>

<Card

title="In Stock"

value="71"

icon={<Boxes size={22}/>}

color="bg-green-500"

/>

<Card

title="Low Stock"

value="13"

icon={<TriangleAlert size={22}/>}

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

placeholder="Search scrap item"

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

Metal

</option>

<option>

Plastic

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

Item

</th>

<th>

Category

</th>

<th>

Stock

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

items.map((item)=>(

<tr

key={item.id}

className="

border-b

hover:bg-slate-50

"

>

<td className="py-5">

<div>

<p

className="font-semibold"

>

{item.name}

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

{item.category}

</td>

<td>

{item.stock}

</td>

<td>

{item.price}

</td>

<td>

<Status

value={item.status}

/>

</td>

<td>

<button

className="

bg-[#031B52]

text-white

px-4

py-2

rounded-xl

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

value==="Available"

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

export default ScrapItems
