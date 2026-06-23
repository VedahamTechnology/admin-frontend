import AdminLayout from "../layouts/AdminLayout"
import { useEffect, useState } from "react"

import {
EmptyState,
LoadingGrid,
MetricCard,
PageShell,
SectionCard,
StatusPill
}

from "../components/AdminPageElements"

import {
Briefcase,
ShieldCheck,
Star,
Users
}

from "lucide-react"

import {

getVendors,
approveVendor,
rejectVendor,
blockVendor,
deleteVendor

}

from "../services/adminService"

function Providers(){

const [providers,setProviders]=useState([])
const [loading,setLoading]=useState(true)

useEffect(()=>{

fetchProviders()

},[])

async function fetchProviders(){

try{

setLoading(true)

const res=await getVendors()

setProviders(

res.data.vendors

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

const handleApprove=async(id)=>{

try{

await approveVendor(id)

fetchProviders()

}

catch(error){

console.log(error)

alert(

error.response?.data?.message

||

"Failed"

)

}

}

const handleReject=async(id)=>{

const reason=

window.prompt(

"Reason for rejection"

)

if(!reason)return

try{

await rejectVendor(

id,
reason

)

fetchProviders()

}

catch(error){

console.log(error)

alert(

error.response?.data?.message

||

"Failed"

)

}

}

const handleBlock=async(id)=>{

try{

await blockVendor(id)

fetchProviders()

}

catch(error){

console.log(error)

}

}

const handleDelete=async(id)=>{

const ok=

window.confirm(

"Delete vendor?"

)

if(!ok)return

try{

await deleteVendor(id)

fetchProviders()

}

catch(error){

console.log(error)

}

}

const approved=

providers.filter(

p=>

p.vendor?.verificationStatus===

"approved"

).length

const pending=

providers.filter(

p=>

p.vendor?.verificationStatus===

"pending"

).length

return(

<AdminLayout>

<PageShell

title="Providers"

description="Manage vendors, approvals, verification status, and operational controls."

>

<div className="metric-grid metric-grid--4">

<MetricCard

label="All Providers"

value={providers.length}

change="+ Live Data"

icon={

<Briefcase size={20}/>

}

accentClassName="accent-navy"

/>

<MetricCard

label="Approved"

value={approved}

change="Ready for bookings"

icon={

<ShieldCheck size={20}/>

}

accentClassName="accent-success"

/>

<MetricCard

label="Pending"

value={pending}

change="Requires review"

icon={

<Users size={20}/>

}

accentClassName="accent-warning"

/>

<MetricCard

label="Platform Rating"

value="4.8/5"

change="Customer trust"

icon={

<Star size={20}/>

}

accentClassName="accent-cyan"

/>

</div>

<SectionCard

title="Provider Registry"

description="Monitor approvals and vendor operations."

>

{

loading

?

<LoadingGrid cards={4}/>

:

<div className="admin-table-wrapper">

<table

className="

admin-table

admin-table--min-wide

"

>

<thead>

<tr>

<th>

Owner

</th>

<th>

Business

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

providers.length===0

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

No vendors found

</td>

</tr>

:

providers.map((provider)=>{

const status=

provider.vendor

?.verificationStatus

||

"pending"

return(

<tr

key={provider._id}

>

<td>

<p

className="

admin-table__cell-primary

"

>

{

provider.firstName

}

{

" "

}

{

provider.lastName

}

</p>

<p

className="

admin-table__cell-sub

"

>

{

provider.userId

}

</p>

</td>

<td>

{

provider.vendor

?.businessName

||

"-"

}

</td>

<td>

{

provider.phone

||

"-"

}

</td>

<td>

<StatusPill

status={status}

/>

</td>

<td>

<div

style={{

display:"flex",

gap:8,

flexWrap:"wrap"

}}

>

{

status!==

"approved"

&&

<button

onClick={()=>{

handleApprove(

provider._id

)

}}

className="

btn

btn--success

"

>

Approve

</button>

}

{

status!==

"rejected"

&&

<button

onClick={()=>{

handleReject(

provider._id

)

}}

className="

btn

btn--danger

"

>

Reject

</button>

}

<button

onClick={()=>{

handleBlock(

provider._id

)

}}

className="

btn

btn--outline

"

>

Block

</button>

<button

onClick={()=>{

handleDelete(

provider._id

)

}}

className="

btn

btn--outline

"

>

Delete

</button>

</div>

</td>

</tr>

)

})

}

</tbody>

</table>

</div>

}

</SectionCard>

<SectionCard

title="Provider Insights"

description="Analytics space reserved for growth metrics."

>

<EmptyState

title="Analytics Coming Soon"

description="Provider insights and performance charts will appear here."

/>

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Providers
