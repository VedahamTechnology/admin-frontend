import { useEffect,useState } from "react"

import AdminLayout from "../layouts/AdminLayout"

import {

EmptyState,
LoadingGrid,
PageShell,
SectionCard,
StatusPill

}

from "../components/AdminPageElements"

import { Plus } from "lucide-react"

import {

getCategories

}

from "../services/adminService"

function Categories(){

const [categories,setCategories]=useState([])

const [loading,setLoading]=useState(true)

useEffect(()=>{

fetchCategories()

},[])

const fetchCategories=async()=>{

try{

setLoading(true)

const res=

await getCategories()

setCategories(

res.data.categories

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

title="Categories"

description="Manage service categories available across the Homster platform."

actions={[

<button

key="add-category"

type="button"

className="btn btn--primary"

>

<Plus size={16}/>

Add Category

</button>

]}

>

<SectionCard

title="Category Registry"

description="Live category data from backend."

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

Category

</th>

<th>

Category ID

</th>

<th>

Base Price

</th>

<th>

Services

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

categories.length===0

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

No categories found

</td>

</tr>

:

categories.map((category)=>(

<tr

key={category._id}

>

<td>

<div>

<p

className="

admin-table__cell-primary

"

>

{

category.name

}

</p>

<p

className="

admin-table__cell-sub

"

>

{

category.description

||

"No description"

}

</p>

</div>

</td>

<td>

{

category.categoryId

||

"-"

}

</td>

<td>

₹

{

category.basePrice

||

0

}

</td>

<td>

{

category.totalServices

||

0

}

</td>

<td>

<StatusPill

status={

category.isActive

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

category.createdAt

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

title="Category Analytics"

description="Future category insights and reporting."

>

<EmptyState

title="Analytics Coming Soon"

description="Category growth trends and performance charts will appear here."

/>

</SectionCard>

</PageShell>

</AdminLayout>

)

}

export default Categories
