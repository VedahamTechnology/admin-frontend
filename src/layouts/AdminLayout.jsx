function AdminLayout({ children }) {
  return (

    <div className="flex min-h-screen bg-slate-100">

      <div className="w-64 bg-slate-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
          Vedaham
        </h1>

        <ul className="space-y-3">

          <li className="bg-cyan-600 p-3 rounded-lg">
            Dashboard
          </li>

          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
            Users
          </li>

          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
            Vendors
          </li>

          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
            Workers
          </li>

          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
            Bookings
          </li>

        </ul>

      </div>

      <div className="flex-1 p-8">

        {children}

      </div>

    </div>

  )
}

export default AdminLayout