import {

LayoutDashboard,
CalendarCheck,
Users,
Briefcase,
Wallet,
Settings,
LogOut,

UserCog,
Package,
Receipt,
BookOpen,
MessageSquare,
BadgeIndianRupee,
ChevronDown,
Layers3,
BarChart3

} from "lucide-react"

import {

Link,
useLocation,
useNavigate

} from "react-router-dom"

import { useState,useEffect } from "react"

function Sidebar(){

const location=useLocation()

const navigate=useNavigate()

const menu=[

{

name:"Dashboard",

path:"/dashboard",

icon:<LayoutDashboard size={18}/>

},

{

name:"Users",

icon:<Users size={18}/>,

children:[

{

name:"All Users",

path:"/users"

},

{

name:"User Bookings",

path:"/users/bookings"

},

{

name:"User Analytics",

path:"/users/analytics"

}

]

},

{

name:"Vendors",

icon:<Briefcase size={18}/>,

children:[

{

name:"All Vendors",

path:"/vendors"

},

{

name:"Vendor Services",

path:"/vendors/services"

}

]

},

{

name:"Workers",

icon:<UserCog size={18}/>,

children:[

{

name:"All Workers",

path:"/workers"

},

{

name:"Worker Payments",

path:"/workers/payments"

}

]

},

{

name:"Bookings",

icon:<CalendarCheck size={18}/>,

children:[

{

name:"Active",

path:"/bookings"

},

{

name:"Pending",

path:"/bookings/pending"

},

{

name:"Completed",

path:"/bookings/completed"

}

]

},

{
name:"Scrap Items",
icon:<Package size={18}/>,
path:"/scrap"
},

{

name:"Payments",
path:"/payments",

icon:<Wallet size={18}/>

},

{

name:"Settlements",

path:"/settlements",

icon:<Receipt size={18}/>

},

{

name:"User Catalog",

path:"/catalog",

icon:<BookOpen size={18}/>

},

{

name:"Vendor Services",

path:"/vendor-services",

icon:<Layers3 size={18}/>

},

{

name:"Reports",

path:"/reports",

icon:<BarChart3 size={18}/>

},

{

name:"Reviews",

path:"/reviews",

icon:<MessageSquare size={18}/>

},

{

name:"Plans",

path:"/plans",

icon:<BadgeIndianRupee size={18}/>

},

{

name:"Settings",

path:"/settings",

icon:<Settings size={18}/>

}

]

const [openMenu,setOpenMenu]=useState(() => {

for(const item of menu){

if(item.children){

const activeChild=item.children.find(

child=>location.pathname===child.path

)

if(activeChild){

return item.name

}

}

}

return null

})


useEffect(()=>{

for(const item of menu){

if(item.children){

const activeChild=item.children.find(

child=>location.pathname===child.path

)

if(activeChild){

setOpenMenu(item.name)

return

}

}

}

},[location.pathname])

const logout=()=>{

localStorage.removeItem("token")

localStorage.removeItem("user")

navigate("/")

}

return(

<aside
className="

fixed
left-0
top-0

h-screen
w-[280px]

bg-[#031B52]

text-white

flex
flex-col

border-r
border-white/10

shadow-2xl

z-50

"

>

<div
className="

mx-3
mt-4
mb-5

rounded-2xl

bg-white/5

p-4

border

border-white/10

"

>

<h1 className="text-3xl font-bold">

HOMSTER

</h1>

<p className="text-slate-300 text-sm">

Admin Control Center

</p>

</div>

<div
className="

flex-1

overflow-y-auto

px-4
py-5

scrollbar-thin
scrollbar-thumb-slate-700
scrollbar-track-transparent

"

>
    <p

className="

mb-3

px-3

text-[11px]

font-bold

tracking-[3px]

uppercase

text-slate-400

"

>

CORE

</p>

{
menu.map((item)=>(

<div key={item.name}>

{

item.name==="Payments"

&&

<p

className="

mt-6
mb-3

px-3

text-[11px]

font-bold

tracking-[3px]

uppercase

text-slate-400

"

>

MANAGEMENT

</p>

}

{

item.name==="Reports"

&&

<p

className="

mt-6
mb-3

px-3

text-[11px]

font-bold

tracking-[3px]

uppercase

text-slate-400

"

>

ANALYTICS

</p>

}


{

item.children

?

<>

<button

onClick={()=>{

setOpenMenu(

openMenu===item.name

?

null

:

item.name

)

}}

className="

flex

w-full

items-center

justify-between

rounded-xl

px-4

py-3

text-slate-300

hover:bg-white/5

"

>

<div

className="

flex

items-center

gap-3

"

>

{item.icon}

{item.name}

</div>

<ChevronDown

size={18}

className={`

duration-300

${

openMenu===item.name

?

"rotate-180"

:

""

}

`}

/>

</button>


{

openMenu===item.name

&&
<div

className={`

overflow-hidden

transition-all

duration-300

ease-in-out

ml-6

space-y-1

${

openMenu===item.name

?

"max-h-40 opacity-100 mt-2"

:

"max-h-0 opacity-0"

}

`}

>


{

item.children.map((sub)=>(

<Link

key={sub.path}

to={sub.path}

className={`

block

rounded-lg

px-3

py-2

text-sm

transition-all

${

location.pathname===sub.path

?

`

bg-[#18325F]

border-l-4

border-cyan-400

text-white

`

:


"text-slate-300 hover:bg-white/5 hover:translate-x-1 duration-200"

}

`}

>

{sub.name}

</Link>

))

}

</div>

}

</>

:

<Link

to={item.path}

className={`

mb-2

flex

items-center

gap-3

rounded-xl

px-4

py-3

transition-all

${

location.pathname===item.path

?

`
bg-[#18325F]

border-l-4

border-cyan-400

text-white

`

:


"text-slate-300 hover:bg-white/5 hover:translate-x-1 duration-200"

}

`}

>

{item.icon}

{item.name}

</Link>

}

</div>

))

}

</div>


<button

onClick={logout}

className="

m-4

flex

items-center

gap-3

rounded-xl

bg-red-500/10

hover:bg-red-500/20

transition-all

hover:scale-[1.02]

px-4

py-3

text-red-300

"

>

<LogOut size={18}/>

Logout

</button>

</aside>

)

}

export default Sidebar