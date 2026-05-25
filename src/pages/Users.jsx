import AdminLayout from "../layouts/AdminLayout"
import { useEffect,useState } from "react"
import { getUsers } from "../services/userService"

function Users(){


const [users,setUsers]=useState([])

const [loading,setLoading]=

useState(true)

useEffect(()=>{

fetchUsers()

},[])

const fetchUsers=async()=>{

try{

const data=

await getUsers()

setUsers(

data.users

||

[]

)

}

catch(error){

console.log(error)

}

finally{

setLoading(false)

}

}
return(

<AdminLayout>

<div className="flex justify-between items-center mb-8">

<div>

<h1 className="text-3xl font-bold text-slate-900">

Users

</h1>

<p className="text-slate-500 mt-1">

Manage customer accounts

</p>

</div>

</div>


<div className="bg-white rounded-3xl border border-slate-200 p-6">

<div className="flex gap-4 mb-6">

<input

placeholder="Search users..."

className="flex-1 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"

/>

<select

className="border border-slate-200 rounded-2xl px-4 py-3"

>

<option>

All Users

</option>

<option>

Active

</option>

<option>

Blocked

</option>

</select>

</div>
{

loading

?

<p>

Loading users...

</p>

:

null

}

<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="border-b text-slate-500">

<th className="pb-4">

User

</th>

<th>

Email

</th>

<th>

Phone

</th>

<th>

Status

</th>

<th>

Actions

</th>

</tr>

</thead>


<tbody>

{

users.map((user)=>(

<tr

key={user._id}

className="border-b hover:bg-slate-50"

>

<td className="py-5">

<div>

<p className="font-medium">

{`${user.firstName} ${user.lastName}`}

</p>

<p className="text-sm text-slate-500">

{user.Id}

</p>

</div>

</td>

<td>

{user.email}

</td>

<td>

{user.phone}

</td>

<td>

<span

className={

`px-3 py-1 rounded-full text-sm

${

!user.isBanned

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-600"

}

`

}

>

{

user.isBanned

?

"Blocked"

:

"Active"

}

</span>

</td>

<td>

<div className="flex gap-2">

<button

className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg"

>

Block

</button>

<button

className="bg-red-100 text-red-600 px-3 py-1 rounded-lg"

>

Delete

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</AdminLayout>

)

}

export default Users