function BookingStatus(){

const data=[

{
status:"Completed",
count:42,
color:"bg-emerald-500"
},

{
status:"Pending",
count:18,
color:"bg-amber-500"
},

{
status:"Cancelled",
count:7,
color:"bg-rose-500"
}

]

return(

<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:p-8">

<p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">

Fulfillment

</p>

<h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">

Booking Status

</h2>

<div className="mt-6 space-y-5">

{

data.map((item,index)=>(

<div key={index} className="space-y-2">

<div className="flex items-center justify-between text-sm">

<p className="font-medium text-slate-700">

{item.status}

</p>

<p className="font-semibold text-slate-900">

{item.count}

</p>

</div>

<div className="h-2.5 rounded-full bg-slate-100">

<div

className={`${item.color} h-2.5 rounded-full shadow-sm`}

style={{

width:`${item.count*2}%`

}}

>

</div>

</div>

</div>

))

}

</div>

</div>

)

}

export default BookingStatus
