function WorkerPayment(){

return(

<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:p-8">

<p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">

Payouts

</p>

<h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">

Worker Payment

</h2>

<p className="mt-1 text-sm text-slate-500">

Payment Overview

</p>

<div className="mt-8 space-y-6">

<div>

<div className="mb-2 flex items-center justify-between text-sm">

<p className="font-medium text-slate-700">

Paid

</p>

<p className="font-semibold text-slate-900">

₹58,000

</p>

</div>

<div className="h-2.5 rounded-full bg-emerald-100">

<div className="h-2.5 w-[80%] rounded-full bg-emerald-500 shadow-sm"></div>

</div>

</div>

<div>

<div className="mb-2 flex items-center justify-between text-sm">

<p className="font-medium text-slate-700">

Pending

</p>

<p className="font-semibold text-slate-900">

₹12,000

</p>

</div>

<div className="h-2.5 rounded-full bg-amber-100">

<div className="h-2.5 w-[20%] rounded-full bg-amber-500 shadow-sm"></div>

</div>

</div>

</div>

</div>

)

}

export default WorkerPayment