import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <Sidebar />

      <div className="admin-content">
        <Navbar />
        <div className="admin-page-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
