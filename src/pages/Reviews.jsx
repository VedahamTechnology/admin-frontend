import AdminLayout from "../layouts/AdminLayout"

import {

Search,
Star,
MessageSquare,
BadgeCheck

} from "lucide-react"

function Reviews(){

const reviews=[

{

id:"RV001",

user:"Priya Sharma",

worker:"Rohit Kumar",

service:"Electrical Repair",

rating:5,

review:"Quick and professional work.",

status:"Published"

},

{

id:"RV002",

user:"Aman Verma",

worker:"Deepak",

service:"AC Service",

rating:3,

review:"Service delayed.",

status:"Flagged"

},

{

id:"RV003",

user:"Riya Singh",

worker:"Aman Singh",

service:"Plumbing",

rating:4,

review:"Good experience overall.",

status:"Published"

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

Customer Feedback

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

Reviews

</h1>

<p

className="

text-slate-500

mt-2

"

>

Manage ratings and customer reviews.

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

title="Total Reviews"

value="1248"

icon={<MessageSquare size={22}/>}

color="bg-cyan-500"

/>

<Card

title="Avg Rating"

value="4.7"

icon={<Star size={22}/>}

color="bg-orange-500"

/>

<Card

title="Published"

value="1190"

icon={<BadgeCheck size={22}/>}

color="bg-green-500"

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

placeholder="Search review"

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

All Reviews

</option>

<option>

Published

</option>

<option>

Flagged

</option>

</select>

</div>


<div className="space-y-4">

{

reviews.map((review)=>(

<div

key={review.id}

className="

border

border-slate-200

rounded-2xl

p-5

hover:shadow-md

transition-all

"

>

<div

className="

flex

justify-between

mb-3

"

>

<div>

<h3

className="font-semibold"

>

{review.user}

</h3>

<p

className="

text-sm

text-slate-500

"

>

{review.service}

</p>

</div>

<Status

value={review.status}

/>

</div>

<div

className="

flex

items-center

gap-1

mb-3

"

>

{

[...Array(review.rating)]

.map((_,i)=>(

<Star

key={i}

size={16}

fill="#F59E0B"

color="#F59E0B"

/>

))

}

</div>

<p

className="

text-slate-600

"

>

"{review.review}"

</p>

<p

className="

text-sm

text-slate-400

mt-2

"

>

Worker: {review.worker}

</p>

</div>

))

}

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

value==="Published"

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

export default Reviews