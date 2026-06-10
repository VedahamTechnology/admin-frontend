function ActivityPanel(){

const activities=[

{
text:"New booking created",
time:"2 min ago"
},

{
text:"Vendor approved",
time:"12 min ago"
},

{
text:"Payment received",
time:"25 min ago"
},

{
text:"Refund initiated",
time:"1 hour ago"
}

]

return(

<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:p-8">

<p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">

Feed

</p>

<h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">

Recent Activity

</h2>

<div className="mt-6 space-y-4">

{

activities.map((item,index)=>(

<div

key={index}

className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4 transition-colors duration-200 hover:bg-slate-50"

>

<div

className="mt-1.5 h-3 w-3 rounded-full bg-[#05AFC7] ring-4 ring-[#05AFC7]/10"

>

</div>

<div>

<p className="font-medium text-slate-900">

{item.text}

</p>

<p className="text-sm text-slate-500">

{item.time}

</p>

</div>

</div>

))

}

</div>

</div>

)

}

export default ActivityPanel