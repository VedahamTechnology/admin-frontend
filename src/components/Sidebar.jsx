import {
LayoutDashboard,
CalendarCheck,
Users,
Briefcase,
Wallet,
Bell,
Settings,
LogOut
} from "lucide-react"

import {
Link,
useLocation,
useNavigate
} from "react-router-dom"

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
name:"Bookings",
path:"/bookings",
icon:<CalendarCheck size={18}/>
},

{
name:"Users",
path:"/users",
icon:<Users size={18}/>
},

{
name:"Providers",
path:"/providers",
icon:<Briefcase size={18}/>
},

{
name:"Payments",
path:"/payments",
icon:<Wallet size={18}/>
},

{
name:"Notifications",
path:"/notifications",
icon:<Bell size={18}/>
},

{
name:"Settings",
path:"/settings",
icon:<Settings size={18}/>
}

]

const logout=()=>{

localStorage.removeItem("token")
localStorage.removeItem("user")

navigate("/")

}

return(

<aside className="w-[260px] min-h-screen bg-[#031B52] text-white flex flex-col">

<div className="p-6 border-b border-white/10">

<h1 className="text-2xl font-bold">

HOMSTER

</h1>

<p className="text-sm text-slate-300">

Admin Panel

</p>

</div>

<div className="flex-1 p-4">

{

menu.map((item)=>(

<Link

key={item.path}
to={item.path}

className={`

flex
items-center
gap-3

px-4
py-3

mb-2

rounded-xl

transition-all

${
location.pathname===item.path

?

"bg-cyan-500 text-white"

:

"text-slate-300 hover:bg-white/10"
}

`}

>

{item.icon}

{item.name}

</Link>

))

}

</div>

<button

onClick={logout}

className="m-4 flex items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 text-red-300"

>

<LogOut size={18}/>

Logout

</button>

</aside>

)

}

export default Sidebar