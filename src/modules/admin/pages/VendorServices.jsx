import AdminLayout from "../layouts/AdminLayout"
import { Search, Layers3, CheckCircle2, Clock, XCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { getServices, approveService, rejectService, deleteService } from "../services/adminService"

function VendorServices(){
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("All Categories")
  const [viewModalData, setViewModalData] = useState(null)

  const fetchServices = async ({ showLoading = true } = {}) => {
    try {
      if (showLoading) {
        setLoading(true)
      }
      const response = await getServices()
      console.log("Services Response:", response.data)
      
      let fetchedServices = []
      const resData = response.data
      if (Array.isArray(resData)) {
        fetchedServices = resData
      } else if (resData && Array.isArray(resData.data)) {
        fetchedServices = resData.data
      } else if (resData && Array.isArray(resData.services)) {
        fetchedServices = resData.services
      }
      
      setServices(fetchedServices)
    } catch {
      setError("Failed to fetch services")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices({ showLoading: false })
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const handleApprove = async (id) => {
    try {
      await approveService(id)
      alert("Service approved successfully")
      fetchServices()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve service")
    }
  }

  const handleReject = async (id) => {
    const reason = window.prompt("Enter rejection reason:")
    if (reason) {
      try {
        await rejectService(id, reason)
        alert("Service rejected successfully")
        fetchServices()
      } catch (err) {
        alert(err.response?.data?.message || "Failed to reject service")
      }
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?")
    if (confirmDelete) {
      try {
        await deleteService(id)
        alert("Service deleted successfully")
        fetchServices()
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete service")
      }
    }
  }

  const safeServices = Array.isArray(services) ? services : []

  const categories = ["All Categories", ...new Set(safeServices.map(s => s.category?.name).filter(Boolean))]

  const totalServices = safeServices.length
  const approvedServices = safeServices.filter(s => s.approvalStatus === "approved").length
  const pendingServices = safeServices.filter(s => s.approvalStatus === "pending").length
  const rejectedServices = safeServices.filter(s => s.approvalStatus === "rejected").length

  const filteredServices = safeServices.filter((service) => {
    const vendorName = service.createdByVendor?.businessName || service.vendor?.businessName || ""
    const matchesSearch = 
      (service.name && service.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (service.category?.name && service.category.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (vendorName.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = filterCategory === "All Categories" || service.category?.name === filterCategory

    return matchesSearch && matchesCategory
  })

return(

<AdminLayout>

<div className="space-y-6">

<div>

<p

className="

text-cyan-600

font-semibold

uppercase

tracking-[4px]

text-sm

"

>

Vendor Operations

</p>

<h1

className="

text-5xl

font-bold

text-slate-900

"

>

Vendor Services

</h1>

<p

className="

text-slate-500

mt-2

"

>

Manage vendor listed services and pricing.

</p>

</div>


<div className="grid md:grid-cols-4 gap-5">
  <Card title="Total Services" value={totalServices} icon={<Layers3 size={22}/>} color="bg-cyan-500" />
  <Card title="Approved" value={approvedServices} icon={<CheckCircle2 size={22}/>} color="bg-green-500" />
  <Card title="Pending" value={pendingServices} icon={<Clock size={22}/>} color="bg-orange-500" />
  <Card title="Rejected" value={rejectedServices} icon={<XCircle size={22}/>} color="bg-red-500" />
</div>


<div

className="

bg-white

rounded-[28px]

border

border-slate-200

p-6

"

>

<div className="flex justify-between mb-6">
  <div className="relative">
    <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
    <input 
      placeholder="Search vendor service" 
      className="pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 w-[320px]" 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  <select 
    className="border rounded-2xl px-4"
    value={filterCategory}
    onChange={(e) => setFilterCategory(e.target.value)}
  >
    {categories.map((cat, idx) => (
      <option key={idx} value={cat}>{cat}</option>
    ))}
  </select>
</div>


<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr

className="

border-b

text-left

text-slate-500

"

>

<th className="pb-4">

Vendor

</th>

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

Status

</th>

<th>

Action

</th>

</tr>

</thead>


<tbody>
  {loading ? (
    <tr>
      <td colSpan="6" className="text-center py-8">Loading services...</td>
    </tr>
  ) : error ? (
    <tr>
      <td colSpan="6" className="text-center py-8 text-red-500">{error}</td>
    </tr>
  ) : filteredServices.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center py-8">No services found.</td>
    </tr>
  ) : (
    filteredServices.map((service) => (
      <tr key={service._id} className="border-b hover:bg-slate-50">
        <td className="py-5">{service.createdByVendor?.businessName || service.vendor?.businessName || "N/A"}</td>
        <td>{service.name || "N/A"}</td>
        <td>{service.category?.name || "N/A"}</td>
        <td>₹{service.basePrice || "0"}</td>
        <td>
          <Status value={service.approvalStatus || "pending"} />
        </td>
        <td>
          {service.approvalStatus === "pending" ? (
            <div className="flex gap-2">
              <button 
                onClick={() => handleApprove(service._id)}
                className="px-3 py-1 rounded-xl bg-green-600 text-white text-sm"
              >
                Approve
              </button>
              <button 
                onClick={() => handleReject(service._id)}
                className="px-3 py-1 rounded-xl bg-red-600 text-white text-sm"
              >
                Reject
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => setViewModalData(service)}
                className="px-3 py-1 rounded-xl bg-[#031B52] text-white text-sm"
              >
                View
              </button>
              <button 
                onClick={() => handleDelete(service._id)}
                className="px-3 py-1 rounded-xl bg-red-100 text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    ))
  )}
</tbody>

</table>

</div>

</div>
</div>

      {/* View Modal */}
      {viewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Service Details</h2>
            <div className="space-y-3 text-slate-600">
              <p><strong className="text-slate-800">Service Name:</strong> {viewModalData.name || "N/A"}</p>
              <p><strong className="text-slate-800">Vendor Name:</strong> {viewModalData.createdByVendor?.businessName || viewModalData.vendor?.businessName || "N/A"}</p>
              <p><strong className="text-slate-800">Category:</strong> {viewModalData.category?.name || "N/A"}</p>
              <p><strong className="text-slate-800">Base Price:</strong> ₹{viewModalData.basePrice || "0"}</p>
              <div className="flex items-center gap-2">
                <strong className="text-slate-800">Status:</strong> 
                <Status value={viewModalData.approvalStatus || "pending"} />
              </div>
              <p><strong className="text-slate-800">Description:</strong> {viewModalData.description || "N/A"}</p>
              <p><strong className="text-slate-800">Created:</strong> {viewModalData.createdAt ? new Date(viewModalData.createdAt).toLocaleDateString() : "N/A"}</p>
            </div>
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setViewModalData(null)}
                className="px-6 py-2 bg-slate-100 text-slate-800 font-semibold rounded-xl hover:bg-slate-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

</AdminLayout>

)

}

function Status({value}) {
  let color = "bg-slate-100 text-slate-700";
  if (value === "approved") color = "bg-green-100 text-green-700";
  else if (value === "pending") color = "bg-orange-100 text-orange-700";
  else if (value === "rejected") color = "bg-red-100 text-red-700";

  return(
    <span className={`px-3 py-1 rounded-full text-sm capitalize ${color}`}>
      {value}
    </span>
  )
}

function Card({

title,
value,
icon,
color

}){

return(

<div

className="

bg-white

rounded-[28px]

border

border-slate-200

p-6

flex

justify-between

items-center

hover:shadow-xl

transition-all

"

>

<div>

<p className="text-slate-500">

{title}

</p>

<h2

className="

text-4xl

font-bold

mt-2

"

>

{value}

</h2>

</div>

<div

className={`

${color}

text-white

p-4

rounded-2xl

`}

>

{icon}

</div>

</div>

)

}

export default VendorServices
