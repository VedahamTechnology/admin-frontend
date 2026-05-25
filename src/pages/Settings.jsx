import AdminLayout from "../layouts/AdminLayout"

function Settings(){

return(

<AdminLayout>

<div className="mb-8">

<h1 className="text-3xl font-bold">

Settings

</h1>

<p className="text-slate-500 mt-2">

Manage admin preferences and platform settings

</p>

</div>

<div className="grid lg:grid-cols-2 gap-6">

<div

className="bg-white rounded-3xl border border-slate-200 p-6"

>

<h2 className="font-semibold text-lg mb-5">

Profile Settings

</h2>

<div className="space-y-4">

<input

placeholder="Admin Name"

className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"

/>

<input

placeholder="Email"

className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"

/>

<button

className="bg-[#031B52] text-white px-5 py-3 rounded-2xl"

>

Save Changes

</button>

</div>

</div>


<div

className="bg-white rounded-3xl border border-slate-200 p-6"

>

<h2 className="font-semibold text-lg mb-5">

Security

</h2>

<div className="space-y-4">

<button

className="w-full border border-slate-200 rounded-2xl py-3"

>

Change Password

</button>

<button

className="w-full border border-red-200 text-red-500 rounded-2xl py-3"

>

Logout All Sessions

</button>

</div>

</div>

</div>

</AdminLayout>

)

}

export default Settings