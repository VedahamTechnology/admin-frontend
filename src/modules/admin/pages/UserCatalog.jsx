import AdminLayout from "../layouts/AdminLayout"

import {

Search,
Users,
UserPlus,
ShieldCheck

} from "lucide-react"

function UserCatalog(){

const users=[

{

id:"USR001",

name:"Priya Sharma",

email:"priya@gmail.com",

phone:"9876543210",

city:"Delhi",

bookings:14,

status:"Active"

},

{

id:"USR002",

name:"Aman Verma",

email:"aman@gmail.com",

phone:"9812345678",

city:"Noida",

bookings:7,

status:"Blocked"

},

{

id:"USR003",

name:"Riya Singh",

email:"riya@gmail.com",

phone:"9988776655",

city:"Gurgaon",

bookings:19,

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

uppercase

tracking-[4px]

font-semibold

text-sm

"

>

Customer Management

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

User Catalog

</h1>

<p

className="

text-slate-500

mt-2

"

>

View and manage customer accounts.

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

title="Users"

value="1240"

icon={<Users size={22}/>}

color="bg-cyan-500"

/>

<Card

title="New This Month"

value="82"

icon={<UserPlus size={22}/>}

color="bg-green-500"

/>

<Card

title="Verified"

value="1189"

icon={<ShieldCheck size={22}/>}

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

placeholder="Search users"

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

All Users

</option>

<option>

Active

</option>

<option>

Blocked

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

User

</th>

<th>

Email

</th>

<th>

Phone

</th>

<th>

City

</th>

<th>

Bookings

</th>

<th>

Status

</th>

</tr>

</thead>

<tbody>

{

users.map((user)=>(

<tr

key={user.id}

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

{user.name}

</p>

<p

className="

text-sm

text-slate-500

"

>

{user.id}

</p>

</div>

</td>

<td>

{user.email}

</td>

<td>

{user.phone}

</td>

<td>

{user.city}

</td>

<td>

{user.bookings}

</td>

<td>

<Status

value={user.status}

/>

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

"bg-red-100 text-red-700"

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

export default UserCatalog
