import { useEffect,useState } from "react"

import AdminLayout from "../layouts/AdminLayout"

import {

EmptyState,
LoadingGrid,
PageShell,
SectionCard,
StatusPill

}

from "../components/admin/AdminPageElements"

import { Plus } from "lucide-react"

import {

getServices

}

from "../services/adminService"

function ServiceList(){

const [services,setServices]=useState([])

const [loading,setLoading]=useState(true)

useEffect(()=>{

fetchServices()

},[])

const fetchServices=async()=>{

try{

setLoading(true)

const res=

await getServices()

setServices(

res.data.services

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

<PageShell

title="Service List"

description="Manage services available across the Homster platform."

actions={[

<button

key="add-service"

type="button"

className="btn btn--primary"

>

<Plus size={16}/>

Add Service

</button>

]}

>

<SectionCard

title="Service Catalog"

description="Live service data from backend."

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

Service

</th>

<th>

Category

</th>

<th>

Price

</th>

<th>

Duration

</th>

<th>

Status

</th>

<th>

Created

</th>

</tr>

</thead>

<tbody>

{

services.length===0

?

<tr>

<td

colSpan="6"

className="

py-10

text-center

text-slate-500

"

>

No services found

</td>

</tr>

:

services.map((service)=>(

<tr

key={service._id}

>

<td>

<div>

<p

className="

admin-table__cell-primary

"

>

{

service.name

}

</p>

<p

className="

admin-table__cell-sub

"

>

{

service.description

||

"No description"

}

</p>

</div>

</td>

<td>

{

service.category?.name

||

"-"

}

</td>

<td>

₹

{

service.discountedPrice

||

service.basePrice

||

0

}

</td>

<td>

{

service.estimatedDuration

||

"-"

}

</td>

<td>

<StatusPill

status={

service.isActive

?

"Active"

:

"Inactive"

}

/>

</td>

<td>

{

new Date(

service.createdAt

).toLocaleDateString()

}

</td>

</tr>

))

}

</tbody>

</table>

</div>

}

</SectionCard>

<SectionCard

title="Service Analytics"

description="Future service insights and reporting."

>

<EmptyState

title="Analytics Coming Soon"

description="Service performance charts and trends will appear here."

/>

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default ServiceList