import AdminLayout from "../layouts/AdminLayout"

function Notifications(){

const notifications=[

{

id:1,

title:"New vendor registration",

time:"2 min ago",

type:"vendor"

},

{

id:2,

title:"Booking completed successfully",

time:"10 min ago",

type:"booking"

},

{

id:3,

title:"Payment received",

time:"25 min ago",

type:"payment"

}

]

return(

<AdminLayout>

<div className="mb-8">

<h1 className="text-3xl font-bold">

Notifications

</h1>

<p className="text-slate-500 mt-2">

Recent platform activity

</p>

</div>

<div className="bg-white rounded-3xl border border-slate-200 p-6">

<div className="space-y-4">

{

notifications.map((item)=>(

<div

key={item.id}

className="flex justify-between items-center border border-slate-100 rounded-2xl p-5 hover:bg-slate-50"

>

<div>

<p className="font-medium">

{item.title}

</p>

<p className="text-sm text-slate-500">

{item.time}

</p>

</div>

<span

className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm"

>

{item.type}

</span>

</div>

))

}

</div>

</div>

</AdminLayout>

)

}

export default Notifications