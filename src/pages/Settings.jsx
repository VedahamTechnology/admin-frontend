import AdminLayout from "../layouts/AdminLayout"

import {

User,
Shield,
Bell,
Globe,
Save

} from "lucide-react"

function Settings(){

return(

<AdminLayout>

<div className="space-y-6">

<div>

<p

className="

text-cyan-600

uppercase

tracking-[4px]

font-semibold

text-sm

"

>

System Configuration

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

Settings

</h1>

<p

className="

text-slate-500

mt-2

"

>

Manage admin preferences and platform configuration.

</p>

</div>


<div

className="

grid

lg:grid-cols-2

gap-6

"

>

<div

className="

bg-white

border

border-slate-200

rounded-[28px]

p-6

"

>

<div

className="

flex

items-center

gap-3

mb-6

"

>

<User/>

<h2

className="

text-xl

font-bold

"

>

Profile Settings

</h2>

</div>

<div className="space-y-4">

<input

placeholder="Admin Name"

defaultValue="Admin"

className="

w-full

border

rounded-2xl

px-4

py-3

outline-none

focus:ring-2

focus:ring-cyan-500

"

/>

<input

placeholder="Email"

defaultValue="admin@homster.com"

className="

w-full

border

rounded-2xl

px-4

py-3

outline-none

focus:ring-2

focus:ring-cyan-500

"

/>

<input

placeholder="Phone"

defaultValue="+91 9876543210"

className="

w-full

border

rounded-2xl

px-4

py-3

outline-none

focus:ring-2

focus:ring-cyan-500

"

/>

</div>

</div>


<div

className="

bg-white

border

border-slate-200

rounded-[28px]

p-6

"

>

<div

className="

flex

items-center

gap-3

mb-6

"

>

<Shield/>

<h2

className="

text-xl

font-bold

"

>

Security

</h2>

</div>

<div className="space-y-4">

<Toggle

title="Two Factor Authentication"

/>

<Toggle

title="Login Alerts"

/>

<Toggle

title="Session Protection"

/>

</div>

</div>


<div

className="

bg-white

border

border-slate-200

rounded-[28px]

p-6

"

>

<div

className="

flex

items-center

gap-3

mb-6

"

>

<Bell/>

<h2

className="

text-xl

font-bold

"

>

Notifications

</h2>

</div>

<div className="space-y-4">

<Toggle

title="Email Notifications"

/>

<Toggle

title="Booking Alerts"

/>

<Toggle

title="Settlement Updates"

/>

</div>

</div>


<div

className="

bg-white

border

border-slate-200

rounded-[28px]

p-6

"

>

<div

className="

flex

items-center

gap-3

mb-6

"

>

<Globe/>

<h2

className="

text-xl

font-bold

"

>

Platform

</h2>

</div>

<div className="space-y-4">

<select

className="

w-full

border

rounded-2xl

px-4

py-3

outline-none

"

>

<option>

India

</option>

<option>

UAE

</option>

</select>

<select

className="

w-full

border

rounded-2xl

px-4

py-3

outline-none

"

>

<option>

INR ₹

</option>

<option>

USD $

</option>

</select>

</div>

</div>

</div>


<button

className="

flex

items-center

gap-2

bg-[#031B52]

text-white

px-6

py-3

rounded-2xl

hover:opacity-90

"

>

<Save size={18}/>

Save Changes

</button>

</div>

</AdminLayout>

)

}

function Toggle({

title

}){

return(

<div

className="

flex

justify-between

items-center

"

>

<p>

{title}

</p>

<div

className="

w-12

h-6

bg-cyan-500

rounded-full

relative

"

>

<div

className="

absolute

right-1

top-1

w-4

h-4

bg-white

rounded-full

"

>

</div>

</div>

</div>

)

}

export default Settings