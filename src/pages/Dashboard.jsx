import AdminLayout from "../layouts/AdminLayout"

function Dashboard() {

  return (

    <AdminLayout>

      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-slate-500">
            Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹24,000
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-slate-500">
            Users
          </p>

          <h2 className="text-3xl font-bold mt-2">
            120
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-slate-500">
            Vendors
          </p>

          <h2 className="text-3xl font-bold mt-2">
            32
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-slate-500">
            Bookings
          </p>

          <h2 className="text-3xl font-bold mt-2">
            450
          </h2>

        </div>

      </div>

    </AdminLayout>

  )

}

export default Dashboard