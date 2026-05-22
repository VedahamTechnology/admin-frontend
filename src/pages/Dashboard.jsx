import AdminLayout from "../layouts/AdminLayout"

import {
Users,
CalendarCheck,
Wallet,
Briefcase
} from "lucide-react"

import StatsCard from "../components/StatsCard"
import RevenueChart from "../components/RevenueChart"
import RecentBookings from "../components/RecentBookings"
import ActivityPanel from "../components/ActivityPanel"
import BookingStatus from "../components/BookingStatus"
import WorkerPayment from "../components/WorkerPayment"

function Dashboard(){

const user=JSON.parse(localStorage.getItem("user"))

const cards=[
{

title:"Revenue",

value:"₹1,24,500",

change:"+12.4% this month",

icon:<Wallet className="text-white"/>,

bg:"bg-[#031B52]"

},

{

title:"Bookings",

value:"328",

change:"+18 today",

icon:<CalendarCheck className="text-white"/>,

bg:"bg-[#05AFC7]"

},

{

title:"Customers",

value:"1240",

change:"+45 new users",

icon:<Users className="text-white"/>,

bg:"bg-emerald-500"

},

{

title:"Providers",

value:"184",

change:"+8 approved",

icon:<Briefcase className="text-white"/>,

bg:"bg-orange-500"

}

]

return(

<AdminLayout>
<div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8">
<div

className="pb-2"

>

<div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">

<div>

<h1 className="text-4xl font-bold text-slate-900">

Dashboard

</h1>

<p className="text-slate-500 mt-2">

Welcome back,

{

user?.firstName

||

"Admin"

}

. Here's your platform overview today.

</p>

</div>


<div

className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"

>

<span

className="h-2 w-2 rounded-full bg-emerald-500"

>

</span>

Data updated 2 min ago

</div>

</div>

</div>
<div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"></div>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

{

cards.map((card,index)=>(

<StatsCard

key={index}

title={card.title}

value={card.value}

change={card.change}

icon={card.icon}

bg={card.bg}

/>

))

}

</div>

<div className="grid gap-6 lg:grid-cols-3">

<div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:p-8">

<div className="mb-6 flex items-start justify-between gap-4">

<div>

<p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">

Analytics

</p>

<h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">

Revenue Analytics

</h2>

<p className="mt-1 text-sm text-slate-500">

Monthly Performance

</p>

</div>

<div className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">

Live line chart

</div>

</div>

<div className="h-[380px]">

<RevenueChart/>

</div>

</div>

<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:p-8">

<h2 className="mb-6 text-xl font-semibold tracking-tight text-slate-900">

Pending Actions

</h2>

<div className="space-y-4">

<div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-4 transition-colors duration-200 hover:bg-slate-50">

<p className="text-sm font-medium text-slate-700">

Vendor Approvals

</p>

<span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-100">

12

</span>

</div>

<div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-4 transition-colors duration-200 hover:bg-slate-50">

<p className="text-sm font-medium text-slate-700">

Pending Bookings

</p>

<span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-100">

8

</span>

</div>

<div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-4 transition-colors duration-200 hover:bg-slate-50">

<p className="text-sm font-medium text-slate-700">

Refund Requests

</p>

<span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-100">

3

</span>

</div>

</div>

</div>

</div>

<div className="grid gap-6 lg:grid-cols-2">

<BookingStatus/>

<WorkerPayment/>

</div>

<div>

<RecentBookings/>

</div>

<div className="pb-2">

<ActivityPanel/>

</div>

</div>

</AdminLayout>

)

}

export default Dashboard