function TopProviders(){

const providers=[

{

name:"Rahul Kumar",

jobs:120

},

{

name:"Amit Sharma",

jobs:98

},

{

name:"Priya Verma",

jobs:82

}

]

return(

<div className="bg-white rounded-3xl shadow-sm p-8">

<h2 className="font-bold text-xl mb-6">

Top Providers

</h2>

<div className="space-y-5">

{

providers.map((item,index)=>(

<div

key={index}

className="flex justify-between items-center"

>

<div className="flex gap-3">

<div

className="h-12 w-12 rounded-full bg-[#031B52] text-white flex justify-center items-center"

>

{

item.name[0]

}

</div>

<div>

<p className="font-medium">

{item.name}

</p>

<p className="text-sm text-slate-500">

Completed Jobs

</p>

</div>

</div>

<div className="font-bold">

{item.jobs}

</div>

</div>

))

}

</div>

</div>

)

}

export default TopProviders