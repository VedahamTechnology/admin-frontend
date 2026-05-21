import {
HiOutlineViewGrid,
HiOutlineUsers,
HiOutlineClipboardList,
HiOutlineCog,
HiOutlineCurrencyDollar
} from "react-icons/hi"

function Sidebar(){

const menus=[

{
name:"Dashboard",
icon:<HiOutlineViewGrid size={22}/>
},

{
name:"Users",
icon:<HiOutlineUsers size={22}/>
},

{
name:"Bookings",
icon:<HiOutlineClipboardList size={22}/>
},

{
name:"Payments",
icon:<HiOutlineCurrencyDollar size={22}/>
},

{
name:"Settings",
icon:<HiOutlineCog size={22}/>
}

]

return(

<div className="w-64 min-h-screen bg-[#031B52] text-white p-6">

<h1 className="text-3xl font-bold mb-10">

VEDAHAM

</h1>

<div className="space-y-3">

{

menus.map((item,index)=>(

<button

key={index}

className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-cyan-600 duration-200"

>

{item.icon}

<span>

{item.name}

</span>

</button>

))

}

</div>

</div>

)

}

export default Sidebar