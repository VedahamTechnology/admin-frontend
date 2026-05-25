import AdminLayout from "../layouts/AdminLayout"

function Reports(){

const reports=[

{

title:"Revenue Report",

value:"₹1,24,500",

change:"+12%"

},

{

title:"Bookings Report",

value:"328",

change:"+18"

},

{

title:"Customer Growth",

value:"1240",

change:"+45"

}

]

return(

<AdminLayout>

<div className="mb-8">

<h1 className="text-3xl font-bold">

Reports

</h1>

<p className="text-slate-500 mt-2">

Business insights and analytics

</p>

</div>

<div className="grid md:grid-cols-3 gap-6">

{

reports.map((item,index)=>(

<div

key={index}

className="bg-white border border-slate-200 rounded-3xl p-6"

>

<h3 className="text-slate-500">

{item.title}

</h3>

<p className="text-3xl font-bold mt-3">

{item.value}

</p>

<p className="text-emerald-600 mt-2">

{item.change}

</p>

</div>

))

}

</div>

<div className="mt-8 bg-white border border-slate-200 rounded-3xl p-8 h-[350px]">

<h2 className="font-semibold mb-5">

Monthly Analytics

</h2>

<div className="h-full flex justify-center items-center text-slate-400">

Charts integration later

</div>

</div>

</AdminLayout>

)

}

export default Reports