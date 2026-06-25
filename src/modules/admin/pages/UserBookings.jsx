import { useEffect, useState } from "react"
import AdminLayout from "../layouts/AdminLayout"
import { MetricCard, PageShell, SectionCard } from "../components/AdminPageElements"
import { CalendarCheck, Clock3, Search, CheckCircle2, XCircle } from "lucide-react"
import { getBookings, getBookingById, updateBookingStatus } from "../services/adminService"

function BookingStatus({ status }) {
  const s = (status || "pending").toLowerCase()
  let color = "bg-slate-100 text-slate-700"
  if (s === "pending") color = "bg-orange-100 text-orange-700"
  else if (s === "confirmed") color = "bg-blue-100 text-blue-700"
  else if (s === "completed") color = "bg-green-100 text-green-700"
  else if (s === "cancelled") color = "bg-red-100 text-red-700"

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${color}`}>
      {s}
    </span>
  )
}

function UserBookings() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState([])

  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const [viewModalData, setViewModalData] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = { limit: 100 }
      if (selectedStatus !== "All") {
        params.status = selectedStatus.toLowerCase()
      }

      const response = await getBookings(params)
      console.log("Bookings API Response:", response.data)

      // Backend getAllBookings returns: { success, data: [...], stats: [...], pagination: {...} }
      const resData = response.data
      let fetchedBookings = []
      if (resData && Array.isArray(resData.data)) {
        fetchedBookings = resData.data
      } else if (Array.isArray(resData)) {
        fetchedBookings = resData
      } else if (resData && Array.isArray(resData.bookings)) {
        fetchedBookings = resData.bookings
      }

      setBookings(fetchedBookings)

      // Stats come inline from getAllBookings: stats is an array of { _id: 'status', count, totalAmount }
      if (resData && Array.isArray(resData.stats)) {
        setStats(resData.stats)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings")
      console.error("Bookings fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedStatus])

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status)
      alert("Booking status updated successfully")
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status")
    }
  }

  const handleView = async (id) => {
    try {
      setModalLoading(true)
      setViewModalData({ _id: id })
      const res = await getBookingById(id)
      console.log("Booking Detail Response:", res.data)
      // Backend getBookingById returns: { success, booking: {...} }
      setViewModalData(res.data?.booking || res.data?.data || res.data)
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch booking details")
      setViewModalData(null)
    } finally {
      setModalLoading(false)
    }
  }

  // Calculate metrics from inline stats array
  // stats shape: [{ _id: 'pending', count: 5, totalAmount: 1000 }, ...]
  const safeStats = Array.isArray(stats) ? stats : []
  let totalBookings = 0, pendingBookings = 0, completedBookings = 0, cancelledBookings = 0

  safeStats.forEach(item => {
    const count = item.count || 0
    totalBookings += count
    if (item._id === 'pending') pendingBookings = count
    if (item._id === 'completed') completedBookings = count
    if (item._id === 'cancelled') cancelledBookings = count
  })

  // Client-side search filtering
  const safeBookings = Array.isArray(bookings) ? bookings : []
  const filteredBookings = safeBookings.filter(b => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()

    return (
      b.bookingId?.toLowerCase().includes(q) ||
      b._id?.toLowerCase().includes(q) ||
      `${b.customer?.firstName || ''} ${b.customer?.lastName || ''}`.toLowerCase().includes(q) ||
      b.vendor?.businessName?.toLowerCase().includes(q) ||
      `${b.vendor?.firstName || ''} ${b.vendor?.lastName || ''}`.toLowerCase().includes(q) ||
      b.service?.name?.toLowerCase().includes(q)
    )
  })

  return (
    <AdminLayout>
      <PageShell
        title="User Bookings"
        description="Manage all customer bookings, view details, and track statuses."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total Bookings" value={totalBookings} icon={<CalendarCheck size={20} />} accentClassName="bg-[#031B52]" />
          <MetricCard label="Pending" value={pendingBookings} icon={<Clock3 size={20} />} accentClassName="bg-orange-500" />
          <MetricCard label="Completed" value={completedBookings} icon={<CheckCircle2 size={20} />} accentClassName="bg-green-500" />
          <MetricCard label="Cancelled" value={cancelledBookings} icon={<XCircle size={20} />} accentClassName="bg-red-500" />
        </div>

        <SectionCard title="Bookings List" description="Track and manage all bookings in one place.">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                placeholder="Search bookings..."
                className="pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 w-[320px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="pb-4 pr-4">Booking ID</th>
                  <th className="pb-4 pr-4">Customer</th>
                  <th className="pb-4 pr-4">Vendor</th>
                  <th className="pb-4 pr-4">Service</th>
                  <th className="pb-4 pr-4">Category</th>
                  <th className="pb-4 pr-4">Amount</th>
                  <th className="pb-4 pr-4">Date</th>
                  <th className="pb-4 pr-4">Status</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-8">Loading bookings...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="9" className="text-center py-8 text-red-500">{error}</td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-8">No bookings found.</td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b._id} className="border-b hover:bg-slate-50">
                      <td className="py-4 pr-4 font-medium">{b.bookingId || b._id?.slice(-6).toUpperCase() || "N/A"}</td>
                      <td className="py-4 pr-4">{`${b.customer?.firstName || ''} ${b.customer?.lastName || ''}`.trim() || "N/A"}</td>
                      <td className="py-4 pr-4">{b.vendor?.businessName || `${b.vendor?.firstName || ''} ${b.vendor?.lastName || ''}`.trim() || "N/A"}</td>
                      <td className="py-4 pr-4">{b.service?.name || "N/A"}</td>
                      <td className="py-4 pr-4">{b.category?.name || "N/A"}</td>
                      <td className="py-4 pr-4">₹{b.pricing?.totalAmount || b.pricing?.basePrice || b.service?.basePrice || "0"}</td>
                      <td className="py-4 pr-4">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "N/A"}</td>
                      <td className="py-4 pr-4">
                        <BookingStatus status={b.status} />
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(b._id)}
                            className="px-3 py-1 rounded-xl bg-[#031B52] text-white text-sm"
                          >
                            View
                          </button>

                          {b.status === "pending" && (
                            <button
                              onClick={() => handleUpdateStatus(b._id, "confirmed")}
                              className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition-colors"
                            >
                              Confirm
                            </button>
                          )}

                          {b.status === "confirmed" && (
                            <button
                              onClick={() => handleUpdateStatus(b._id, "completed")}
                              className="px-3 py-1 rounded-xl bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200 transition-colors"
                            >
                              Complete
                            </button>
                          )}

                          {["pending", "confirmed"].includes(b.status) && (
                            <button
                              onClick={() => {
                                if(window.confirm("Are you sure you want to cancel this booking?")) {
                                  handleUpdateStatus(b._id, "cancelled")
                                }
                              }}
                              className="px-3 py-1 rounded-xl bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>

      {/* View Modal */}
      {viewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Booking Details</h2>

            {modalLoading ? (
              <div className="py-8 text-center text-slate-500">Loading details...</div>
            ) : (
              <div className="space-y-4 text-slate-600">
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Booking ID</p>
                    <p className="font-semibold text-slate-800">{viewModalData.bookingId || viewModalData._id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Status</p>
                    <div className="mt-1"><BookingStatus status={viewModalData.status} /></div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Customer Details</p>
                  <p className="text-slate-800 font-medium mt-1">{`${viewModalData.customer?.firstName || ''} ${viewModalData.customer?.lastName || ''}`.trim() || "N/A"}</p>
                  <p className="text-sm">{viewModalData.customer?.email || "No Email"}</p>
                  <p className="text-sm">{viewModalData.customer?.phone || "No Phone"}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Vendor Details</p>
                  <p className="text-slate-800 font-medium mt-1">{viewModalData.vendor?.businessName || "N/A"}</p>
                  <p className="text-sm">{`${viewModalData.vendor?.firstName || ''} ${viewModalData.vendor?.lastName || ''}`.trim() || "N/A"}</p>
                  <p className="text-sm">{viewModalData.vendor?.phone || "No Phone"}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Service Details</p>
                  <p className="text-slate-800 font-medium mt-1">{viewModalData.service?.name || "N/A"}</p>
                  <p className="text-sm">Category: {viewModalData.category?.name || "N/A"}</p>
                  <p className="text-sm font-semibold text-slate-800 mt-1">Amount: ₹{viewModalData.pricing?.totalAmount || viewModalData.pricing?.basePrice || viewModalData.service?.basePrice || "0"}</p>
                </div>

                {viewModalData.bookingDate && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Booking Date</p>
                    <p className="text-slate-800 mt-1">{new Date(viewModalData.bookingDate).toLocaleString()}</p>
                  </div>
                )}

                {viewModalData.scheduledDate && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Scheduled Date</p>
                    <p className="text-slate-800 mt-1">{new Date(viewModalData.scheduledDate).toLocaleString()}</p>
                  </div>
                )}

                {viewModalData.address && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Service Address</p>
                    <p className="text-slate-800 text-sm mt-1">
                      {[viewModalData.address.street, viewModalData.address.city, viewModalData.address.state, viewModalData.address.zipCode].filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}

                {viewModalData.cancellation?.reason && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Cancellation Reason</p>
                    <p className="text-red-600 text-sm mt-1">{viewModalData.cancellation.reason}</p>
                  </div>
                )}
              </div>
            )}

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

export default UserBookings
