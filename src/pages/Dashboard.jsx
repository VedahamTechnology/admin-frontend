import AdminLayout from "../layouts/AdminLayout"

function Dashboard(){

const cards=[

{
title:"Users",
value:"120"
},

{
title:"Bookings",
value:"45"
},

{
title:"Workers",
value:"28"
},

{
title:"Revenue",
value:"₹18K"
}

]

const handleLogout=()=>{

localStorage.removeItem("token")

localStorage.removeItem("user")

window.location.href="/"

}

const user=JSON.parse(

localStorage.getItem("user")

)

return(

<AdminLayout>

<div className="flex justify-between items-center mb-8">

<div>

<h1 className="text-3xl font-bold">

Dashboard Overview

</h1>

<p className="text-slate-500 mt-1">

Welcome {

user?.firstName

||

"Admin"

}

</p>

</div>

<button

onClick={handleLogout}

className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl duration-300"

>

Logout

</button>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

{

cards.map((card,index)=>(

<div

key={index}

className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg duration-300"

>

<h3 className="text-slate-500">

{card.title}

</h3>

<p className="text-3xl font-bold mt-3">

{card.value}

</p>

</div>

))

}

</div>

<div className="mt-8 bg-white rounded-2xl p-8 shadow-sm h-[300px]">

<h2 className="font-semibold mb-4">

Analytics

</h2>

<div className="h-full flex justify-center items-center text-slate-400">

Charts API integration later

</div>

</div>

</AdminLayout>

)

}

export default Dashboard