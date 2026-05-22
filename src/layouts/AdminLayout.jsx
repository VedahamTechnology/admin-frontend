import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function AdminLayout({children}){

return(

<div className="flex h-screen bg-[#F5F7FB]">

<Sidebar/>

<div className="flex flex-1 flex-col overflow-hidden">

<Navbar/>

<main

className="flex-1 overflow-y-auto px-6 py-6 lg:px-8"

>

{children}

</main>

</div>

</div>

)

}

export default AdminLayout