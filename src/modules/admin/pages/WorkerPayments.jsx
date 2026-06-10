import AdminLayout from "../layouts/AdminLayout"

import {

Wallet,
Search,
CircleDollarSign

} from "lucide-react"

function WorkerPayments(){

const payments=[

{

id:"PAY001",

worker:"Rohit Kumar",

amount:"₹18,400",

jobs:42,

date:"24 May 2026",

status:"Paid"

},

{

id:"PAY002",

worker:"Aman Singh",

amount:"₹11,250",

jobs:29,

date:"23 May 2026",

status:"Pending"

},

{

id:"PAY003",

worker:"Deepak",

amount:"₹7,800",

jobs:17,

date:"22 May 2026",

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

font-semibold

uppercase

tracking-[4px]

text-sm

"

>

Finance

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

Worker Payments

</h1>

<p

className="

text-slate-500

mt-2

"

>

Track worker earnings and payouts.

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

title="Paid"

value="₹82K"

icon={<Wallet size={22}/>}

color="bg-green-500"

/>

<Card

title="Pending"

value="₹24K"

icon={<CircleDollarSign size={22}/>}

color="bg-orange-500"

/>

<Card

title="Processing"

value="₹13K"

icon={<Wallet size={22}/>}

color="bg-cyan-500"

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

relative

mb-6

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

placeholder="Search payment"

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

Worker

</th>

<th>

Jobs

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

payments.map((payment)=>(

<tr

key={payment.id}

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

{payment.worker}

</p>

<p

className="

text-sm

text-slate-500

"

>

{payment.id}

</p>

</div>

</td>

<td>

{payment.jobs}

</td>

<td>

{payment.amount}

</td>

<td>

{payment.date}

</td>

<td>

<Status

value={payment.status}

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

hover:opacity-90

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

export default WorkerPayments
