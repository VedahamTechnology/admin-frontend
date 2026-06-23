import AdminLayout from "../layouts/AdminLayout"

import { useEffect,useState } from "react"

import {

getUsers,
blockUser,
unblockUser,
deleteUser,
searchUsers

} from "../services/adminService"

function Users(){

const [users,setUsers]=useState([])

const [loading,setLoading]=useState(true)

const [search,setSearch]=useState("")

const [filter,setFilter]=useState("all")

useEffect(()=>{

fetchUsers()

},[])

async function fetchUsers(){

try{

setLoading(true)

const res=await getUsers()

setUsers(

res.data.users

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

const handleSearch=async()=>{

try{

if(!search){

fetchUsers()

return

}

const res=

await searchUsers(search)

setUsers(

res.data.users

||

[]

)

}

catch(error){

console.log(error)

}

}

const handleBlock=async(id)=>{

try{

await blockUser(id)

fetchUsers()

}

catch(error){

console.log(error)

}

}

const handleUnblock=async(id)=>{

try{

await unblockUser(id)

fetchUsers()

}

catch(error){

console.log(error)

}

}

const handleDelete=async(id)=>{

const ok=

window.confirm(

"Delete user?"

)

if(!ok)return

try{

await deleteUser(id)

fetchUsers()

}

catch(error){

console.log(error)

}

}

const filteredUsers=

users.filter((user)=>{

if(filter==="active"){

return !user.isBanned

}

if(filter==="blocked"){

return user.isBanned

}

return true

})

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

value={search}

onChange={(e)=>{

setSearch(

e.target.value

)

}}

placeholder="Search users..."

className="

flex-1

border

border-slate-200

rounded-2xl

px-4

py-3

outline-none

focus:ring-2

focus:ring-cyan-500

"

/>

<button

onClick={handleSearch}

className="

bg-cyan-600

text-white

px-5

rounded-2xl

hover:bg-cyan-700

"

>

Search

</button>

<select

value={filter}

onChange={(e)=>{

setFilter(

e.target.value

)

}}

className="

border

border-slate-200

rounded-2xl

px-4

py-3

"

>

<option value="all">

All Users

</option>

<option value="active">

Active

</option>

<option value="blocked">

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

filteredUsers.length===0

?

<tr>

<td

colSpan="5"

className="

py-10
text-center
text-slate-500

"

>

No users found

</td>

</tr>

:

filteredUsers.map((user)=>(

<tr

key={user._id}

className="

border-b
hover:bg-slate-50

"

>

<td className="py-5">

<div>

<p className="font-medium">

{user.firstName}

{" "}

{user.lastName}

</p>

<p className="text-sm text-slate-500">

{user.userId}

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

`

px-3
py-1
rounded-full
text-sm

${

user.isBanned

?

"bg-red-100 text-red-600"

:

"bg-green-100 text-green-700"

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

{

user.isBanned

?

<button

onClick={()=>{

handleUnblock(

user._id

)

}}

className="

bg-green-100
text-green-700
px-3
py-1
rounded-lg

"

>

Unblock

</button>

:

<button

onClick={()=>{

handleBlock(

user._id

)

}}

className="

bg-yellow-100
text-yellow-700
px-3
py-1
rounded-lg

"

>

Block

</button>

}

<button

onClick={()=>{

handleDelete(

user._id

)

}}

className="

bg-red-100
text-red-600
px-3
py-1
rounded-lg

"

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

}

</div>

</AdminLayout>

)

}

export default Users
