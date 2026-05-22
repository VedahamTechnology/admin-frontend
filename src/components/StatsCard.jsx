import { ArrowUpRight } from "lucide-react"

function StatsCard({

title,
value,
icon,
change,
bg

}){

return(

<div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]">

<div className="flex items-start justify-between gap-4">

<div>

<p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">

{title}

</p>

<h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">

{value}

</h2>

<div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">

<ArrowUpRight size={14} />

{change}

</div>

</div>

<div

className={`${bg} flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105`}

>

{icon}

</div>

</div>

</div>

)

}

export default StatsCard