import {
Search,
Bell,
ChevronDown,
LogOut,
Settings,
User,
Building2
} from "lucide-react"

import {
useEffect,
useRef,
useState
} from "react"

function Navbar(){

const [profileOpen,setProfileOpen]=useState(false)

const profileRef=useRef(null)

useEffect(()=>{

const handleClickOutside=(event)=>{

if(

profileRef.current

&&

!profileRef.current.contains(event.target)

){

setProfileOpen(false)

}

}

document.addEventListener(

"mousedown",

handleClickOutside

)

return()=>{

document.removeEventListener(

"mousedown",

handleClickOutside

)

}

},[])

const handleLogout=()=>{

localStorage.removeItem("token")

localStorage.removeItem("user")

window.location.href="/"

}

return(

<header

className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl"

>

<div

className="flex h-[80px] items-center justify-between gap-6 px-6 lg:px-10"

>

<div

className="relative w-full max-w-[540px]"

>

<Search

size={18}

className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"

/>

<input

type="text"

placeholder="Search bookings, users..."

className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#05AFC7] focus:bg-white focus:ring-4 focus:ring-[#05AFC7]/10"

/>

</div>


<div

className="flex items-center gap-3 lg:gap-4"

>

<button

className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:bg-slate-50"

>

<Bell size={18}/>

<div

className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#05AFC7] ring-2 ring-white"

>

</div>

</button>




<div

className="relative"

ref={profileRef}

>

<button

onClick={()=>{

setProfileOpen(

!profileOpen

)

}}

className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 hover:bg-slate-50 transition-colors duration-200"

>

<div

className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#031B52] text-white font-semibold"

>

A

</div>


<div

className="hidden sm:block text-left"

>

<p

className="text-sm font-semibold text-slate-900"

>

Admin

</p>

<p

className="text-xs text-slate-500"

>

Super Admin

</p>

</div>


<ChevronDown

size={16}

className={`

text-slate-400

transition-transform

duration-200

${

profileOpen

?

"rotate-180"

:

""

}

`}

/>

</button>


{

profileOpen

&&

(

<div

className="absolute right-0 top-[calc(100%+12px)] w-72 rounded-3xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"

>

<div

className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"

>

<div

className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#031B52] text-white font-semibold"

>

A

</div>

<div>

<p

className="font-semibold"

>

Admin

</p>

<p

className="text-xs text-slate-500"

>

Super Admin

</p>

</div>

</div>


<div

className="my-2 h-px bg-slate-100"

>

</div>


<button

className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"

>

<User size={16}/>

Profile

</button>


<button

className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"

>

<Building2 size={16}/>

Workspace

</button>


<button

className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"

>

<Settings size={16}/>

Settings

</button>


<button

onClick={handleLogout}

className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"

>

<LogOut size={16}/>

Logout

</button>

</div>

)

}

</div>

</div>

</div>

</header>

)

}

export default Navbar