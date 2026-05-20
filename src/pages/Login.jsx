import { FaEnvelope, FaLock } from "react-icons/fa"
import { HiOutlineChartBar } from "react-icons/hi"
import { FiUsers } from "react-icons/fi"
import { BsShieldCheck } from "react-icons/bs"

function Login(){

return(

<div className="min-h-screen flex">

<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#031B52] via-[#043A75] to-[#05AFC7] relative overflow-hidden text-white">

<div className="absolute top-16 left-16 grid grid-cols-4 gap-3 opacity-20">

{[...Array(16)].map((_,i)=>(
<div
key={i}
className="w-1 h-1 bg-white rounded-full"
/>
))}

</div>


<div className="absolute bottom-16 left-16 grid grid-cols-4 gap-3 opacity-20">

{[...Array(16)].map((_,i)=>(
<div
key={i}
className="w-1 h-1 bg-white rounded-full"
/>
))}

</div>


<div className="absolute inset-0 bg-black/10"/>

<div className="relative z-10 flex flex-col justify-center px-24">

<h1 className="text-6xl font-bold leading-tight">

Smart Service

<br/>

Management

<br/>

<span className="text-cyan-300">

Platform

</span>

</h1>


<p className="mt-8 text-slate-200 text-lg max-w-md">

Manage bookings, vendors and workers
through one powerful dashboard.

</p>


<div className="space-y-8 mt-14">

<div className="flex gap-4">

<div className="bg-cyan-500/20 p-3 rounded-xl">

<HiOutlineChartBar size={24}/>

</div>

<div>

<h3 className="font-semibold">

Real-time Analytics

</h3>

<p className="text-slate-300">

Track growth and performance

</p>

</div>

</div>


<div className="flex gap-4">

<div className="bg-cyan-500/20 p-3 rounded-xl">

<FiUsers size={24}/>

</div>

<div>

<h3 className="font-semibold">

Vendor Management

</h3>

<p className="text-slate-300">

Manage network easily

</p>

</div>

</div>


<div className="flex gap-4">

<div className="bg-cyan-500/20 p-3 rounded-xl">

<BsShieldCheck size={24}/>

</div>

<div>

<h3 className="font-semibold">

Secure Platform

</h3>

<p className="text-slate-300">

Enterprise security

</p>

</div>

</div>

</div>

</div>

</div>



<div className="flex-1 bg-slate-100 flex items-center justify-center p-8">

<div className="bg-white rounded-3xl shadow-xl p-12 w-full max-w-lg">

<h1 className="text-5xl font-bold text-center text-slate-900">

Welcome Back!

</h1>


<p className="text-center text-slate-500 mt-3 mb-10">

Sign in to access admin panel

</p>



<div className="relative mb-6">

<FaEnvelope
className="absolute left-5 top-5 text-slate-400"
/>

<input

type="email"

placeholder="Email"

className="w-full border border-slate-200 rounded-2xl py-4 pl-14 pr-4 outline-none focus:ring-2 focus:ring-cyan-500"

/>

</div>



<div className="relative mb-6">

<FaLock
className="absolute left-5 top-5 text-slate-400"
/>

<input

type="password"

placeholder="Password"

className="w-full border border-slate-200 rounded-2xl py-4 pl-14 pr-4 outline-none focus:ring-2 focus:ring-cyan-500"

/>

</div>



<div className="flex justify-between mb-8">

<label className="flex gap-2">

<input type="checkbox"/>

Remember me

</label>


<button className="text-cyan-600">

Forgot Password?

</button>

</div>



<button

className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:opacity-90 duration-300"

>

Sign In

</button>

</div>

</div>

</div>

)

}

export default Login