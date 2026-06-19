import { loginUser } from "../../../services/authService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { HiOutlineChartBar, HiEye, HiEyeOff } from "react-icons/hi"
import { FiUsers } from "react-icons/fi"
import { BsShieldCheck } from "react-icons/bs"
import InputField from "../../../components/InputField"
import Button from "../../../components/Button"
import { Link } from "react-router-dom"

function Login(){

const navigate=useNavigate()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [role,setRole]=useState("admin")
const [showPassword,setShowPassword]=useState(false)

const [loading,setLoading]=useState(false)

const [error,setError]=useState("")

const roleOptions=[

{value:"admin",label:"Admin"},
{value:"vendor",label:"Vendor"},
{value:"customer",label:"Customer"}

]

const handleLogin=async(e)=>{

e.preventDefault()

setError("")

if(!email.trim()){

setError("Email is required")

return

}

if(!password.trim()){

setError("Password is required")

return

}

setLoading(true)

try{

const data={

email,
password,
role

}

const res=await loginUser(data)

console.log("Logged in user:", res.data.user)
console.log("Role:", res.data.user.role)

const userRole = res.data.user.role

if(userRole === "admin"){
localStorage.setItem("token", res.data.accessToken)
localStorage.setItem("user", JSON.stringify(res.data.user))
navigate("/dashboard", { replace:true })
}
else if(userRole === "vendor"){
localStorage.setItem("vendorToken", res.data.accessToken)
localStorage.setItem("vendorUser", JSON.stringify(res.data.user))
navigate("/vendor/dashboard", { replace:true })
}
else if(userRole === "customer"){
localStorage.setItem("token", res.data.accessToken)
localStorage.setItem("user", JSON.stringify(res.data.user))
navigate("/user/dashboard", { replace:true })
}

}

catch(err){

setError(

err.response?.data?.message

||

"Login Failed"

)

}

finally{

setLoading(false)

}

}

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

Sign in to access your panel

</p>

<form onSubmit={handleLogin}>

<div className="mb-5">
  <select
    value={role}
    onChange={(e)=>setRole(e.target.value)}
    className="w-full h-16 rounded-2xl bg-slate-100 px-6 text-slate-700 outline-none"
  >
    {roleOptions.map((option)=>(
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</div>


<InputField

icon={FaEnvelope}

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>


<InputField

icon={FaLock}

type={showPassword?"text":"password"}

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

rightIcon={

<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="absolute right-5 top-5 text-slate-400"

>

{

showPassword

?

<HiEyeOff size={22}/>

:

<HiEye size={22}/>

}

</button>

}

/>


{

error&&(

<p className="text-red-500 text-sm mb-5">

{error}

</p>

)

}


<div className="flex justify-between mb-8">

<label className="flex gap-2">

<input type="checkbox"/>

Remember me

</label>

<button
type="button"
className="text-cyan-600"
>

Forgot Password?

</button>

</div>



<Button

loading={loading}

text="Sign In"

/>

{role !== "admin" && (
  <p className="text-center text-slate-500 mt-6 text-sm">
    Don't have an account?{" "}
    <Link
      to={role === "vendor" ? "/vendor/register" : "/users/register"}
      className="text-cyan-600 font-semibold hover:text-cyan-700"
    >
      Register
    </Link>
  </p>
)}

</form>

</div>

</div>

</div>

)

}

export default Login
