import {
LayoutDashboard,
CalendarCheck,
Users,
Briefcase,
Layers3,
Wallet,
Bell,
BarChart3,
Settings,
LogOut
} from "lucide-react"

function Sidebar(){

const menu=[

{
name:"Dashboard",
icon:<LayoutDashboard size={18}/>,
active:true
},

{
name:"Bookings",
icon:<CalendarCheck size={18}/>
},

{
name:"Users",
icon:<Users size={18}/>
},

{
name:"Providers",
icon:<Briefcase size={18}/>
},

{
name:"Services",
icon:<Layers3 size={18}/>
},

{
name:"Payments",
icon:<Wallet size={18}/>
},

{
name:"Notifications",
icon:<Bell size={18}/>
},

{
name:"Reports",
icon:<BarChart3 size={18}/>
},

{
name:"Settings",
icon:<Settings size={18}/>
}

]

return(

<aside className="sticky top-0 flex h-screen w-[280px] flex-col overflow-y-auto border-r border-white/10 bg-[#031B52] text-white shadow-[0_20px_60px_rgba(3,27,82,0.18)]">

<div className="border-b border-white/10 px-7 py-7">

<div className="flex items-center gap-3">

<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold tracking-[0.2em] text-[#05AFC7]">

H

</div>

<div>

<h1 className="text-2xl font-semibold tracking-[0.2em]">

HOMSTER

</h1>

<p className="text-xs uppercase tracking-[0.25em] text-slate-300/80">

Admin Panel

</p>

</div>

</div>

</div>

<div className="flex-1 px-4 py-6">

<p className="px-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">

Navigation

</p>

{

menu.map((item,index)=>(

<button

key={index}

className={`group mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${item.active ? "bg-white/10 text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)] ring-1 ring-white/10" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}

>

<span className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-200 ${item.active ? "bg-[#05AFC7]/15 text-[#05AFC7]" : "bg-white/5 text-slate-300 group-hover:bg-white/10 group-hover:text-white"}`}>

{item.icon}

</span>

{item.name}

</button>

))

}

</div>

<div className="border-t border-white/10 p-5">

<button

onClick={()=>{

localStorage.removeItem("token")

localStorage.removeItem("user")

window.location.href="/"

}}

className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-300 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-200"

>

<LogOut size={18}/>

Logout

</button>
</div>

 </aside>

)

}

export default Sidebar