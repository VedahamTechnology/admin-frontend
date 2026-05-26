import AdminLayout from "../layouts/AdminLayout"

import {

BadgeIndianRupee,
Users,
TrendingUp,
Check

} from "lucide-react"

function Plans(){

const plans=[

{

name:"Basic",

price:"₹499",

vendors:"Up to 20 Vendors",

commission:"12% Platform Fee",

features:[

"Basic Listing",
"Standard Support",
"Analytics Access"

],

status:"Active"

},

{

name:"Pro",

price:"₹999",

vendors:"Up to 75 Vendors",

commission:"8% Platform Fee",

features:[

"Priority Listing",
"Advanced Analytics",
"Priority Support"

],

status:"Popular"

},

{

name:"Enterprise",

price:"₹1999",

vendors:"Unlimited Vendors",

commission:"5% Platform Fee",

features:[

"Dedicated Manager",
"Custom Reports",
"Premium Support"

],

status:"Premium"

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

Subscription Management

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

Plans

</h1>

<p

className="

text-slate-500

mt-2

"

>

Manage vendor subscription plans and pricing.

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

title="Total Plans"

value="3"

icon={<BadgeIndianRupee size={22}/>}

color="bg-cyan-500"

/>

<Card

title="Subscribed Vendors"

value="184"

icon={<Users size={22}/>}

color="bg-green-500"

/>

<Card

title="Monthly Revenue"

value="₹1.2L"

icon={<TrendingUp size={22}/>}

color="bg-orange-500"

/>

</div>


<div

className="

grid

lg:grid-cols-3

gap-6

"

>

{

plans.map((plan)=>(

<div

key={plan.name}

className="

bg-white

rounded-[28px]

border

border-slate-200

p-8

hover:shadow-xl

transition-all

"

>

<div

className="

flex

justify-between

items-center

"

>

<h2

className="

text-2xl

font-bold

"

>

{plan.name}

</h2>

<span

className="

bg-slate-100

px-3

py-1

rounded-full

text-sm

"

>

{plan.status}

</span>

</div>


<h1

className="

text-5xl

font-bold

mt-6

"

>

{plan.price}

</h1>

<p

className="

text-slate-500

mt-2

"

>

Monthly

</p>


<div

className="

mt-6

space-y-3

"

>

<p>

{plan.vendors}

</p>

<p>

{plan.commission}

</p>

</div>


<div

className="

mt-6

space-y-4

"

>

{

plan.features.map((item)=>(

<div

key={item}

className="

flex

gap-3

"

>

<Check

size={18}

className="text-green-600"

/>

<p>

{item}

</p>

</div>

))

}

</div>


<button

className="

mt-8

w-full

bg-[#031B52]

text-white

py-3

rounded-2xl

hover:opacity-90

"

>

Manage Plan

</button>

</div>

))

}

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

export default Plans