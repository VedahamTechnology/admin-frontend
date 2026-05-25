import {

Bell

} from "lucide-react"

function Navbar(){

return(

<header className="h-[80px] border-b bg-white flex items-center justify-between px-6">

<input

placeholder="Search..."

className="border rounded-xl px-4 py-2 w-[300px]"

/>

<div className="flex items-center gap-4">

<Bell/>

<div className="flex items-center gap-3">

<div className="w-10 h-10 rounded-full bg-[#031B52] text-white flex items-center justify-center">

A

</div>

<div>

<p className="font-semibold">

Admin

</p>

<p className="text-xs text-slate-500">

Super Admin

</p>

</div>

</div>

</div>

</header>

)

}

export default Navbar