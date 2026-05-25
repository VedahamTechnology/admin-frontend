import { ArrowRight, Loader2 } from "lucide-react"

export function PageShell({
title,
description,
actions,
children
}){

return(

<div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8">

<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

<div className="space-y-2">

<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#05AFC7]">

HOMSTER Admin

</p>

<h1 className="text-3xl font-bold text-slate-900 md:text-4xl">

{title}

</h1>

<p className="max-w-3xl text-sm leading-6 text-slate-500 md:text-base">

{description}

</p>

</div>

{actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}

</div>

{children}

</div>

)

}

export function MetricCard({
label,
value,
change,
note,
icon,
accentClassName="bg-[#031B52]"
}){

return(

<div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">

<div className="flex items-start justify-between gap-4">

<div>

<p className="text-sm font-medium text-slate-500">{label}</p>

<p className="mt-3 text-2xl font-bold text-slate-900 md:text-[2rem]">{value}</p>

{change ? <p className="mt-2 text-sm font-medium text-emerald-600">{change}</p> : null}

{note ? <p className="mt-2 text-sm text-slate-500">{note}</p> : null}

</div>

<div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg ${accentClassName}`}>

{icon}

</div>

</div>

</div>

)

}

export function SectionCard({
title,
description,
children,
className=""
}){

return(

<section className={`rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] ${className}`}>

<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

<div>

<h2 className="text-lg font-semibold text-slate-900">{title}</h2>

{description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}

</div>

</div>

{children}

</section>

)

}

export function LoadingGrid({cards=4}){

return(

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

{Array.from({length:cards}).map((_,index)=>(

<div key={index} className="animate-pulse rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">

<div className="h-3 w-24 rounded-full bg-slate-200" />

<div className="mt-4 h-8 w-28 rounded-full bg-slate-200" />

<div className="mt-4 h-3 w-36 rounded-full bg-slate-100" />

<div className="mt-6 flex items-center gap-3">

<div className="h-10 w-10 rounded-2xl bg-slate-200" />

<div className="h-10 flex-1 rounded-2xl bg-slate-100" />

</div>

</div>

))}

</div>

)

}

export function EmptyState({
title="API Integration Pending",
description="Connect the backend to display live records in this section.",
actionLabel,
onAction
}){

return(

<div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">

<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#05AFC7] shadow-sm">

<Loader2 size={20} />

</div>

<h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>

<p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>

{actionLabel ? (

<button

type="button"

onClick={onAction}

className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#031B52] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#04225f]"

>

{actionLabel}

<ArrowRight size={16} />

</button>

) : null}

</div>

)

}

export function StatusPill({status}){

const normalizedStatus=(status || "Unknown").toLowerCase()

const colorMap={

approved:"bg-emerald-100 text-emerald-700",

active:"bg-emerald-100 text-emerald-700",

completed:"bg-emerald-100 text-emerald-700",

paid:"bg-emerald-100 text-emerald-700",

pending:"bg-amber-100 text-amber-700",

processing:"bg-amber-100 text-amber-700",

settling:"bg-amber-100 text-amber-700",

cancelled:"bg-rose-100 text-rose-700",

rejected:"bg-rose-100 text-rose-700",

blocked:"bg-slate-200 text-slate-700",

draft:"bg-slate-100 text-slate-600"

}

return(

<span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${colorMap[normalizedStatus] || "bg-slate-100 text-slate-600"}`}>

{status}

</span>

)

}