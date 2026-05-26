import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function AdminLayout({ children }) {

return(

<div className="flex">

<Sidebar/>

<div
className="

ml-[280px]

flex-1

min-h-screen

bg-slate-50

"

>

<Navbar/>

<div className="p-6">

{children}

</div>

</div>

</div>

)

}

export default AdminLayout