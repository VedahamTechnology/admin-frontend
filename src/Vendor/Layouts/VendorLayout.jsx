import VendorSidebar from "../Components/VendorSidebar"
import VendorNavbar from "../Components/VendorNavbar"

function VendorLayout({ children }) {
  return (
    <div className="admin-shell">
      <VendorSidebar />

      <div className="admin-content">
        <VendorNavbar />

        <div className="admin-page-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default VendorLayout