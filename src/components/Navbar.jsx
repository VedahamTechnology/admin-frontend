import { HiOutlineBell } from "react-icons/hi"

function Navbar(){

return(

<div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

<h1 className="text-2xl font-semibold">

Dashboard

</h1>

<div className="flex items-center gap-5">

<HiOutlineBell size={24}/>

<div className="w-10 h-10 rounded-full bg-cyan-500"/>

</div>

</div>

)

}

export default Navbar