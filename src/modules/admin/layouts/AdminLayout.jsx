import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function AdminLayout({ children }) {
  return (
    <div className="vendor-layout">
      <Sidebar />

      <div className="vendor-layout__content">
        <Navbar />
      <main className="vendor-layout__main">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

// <div className="vendor-layout">
//       <VendorSidebar />

//       <div className="vendor-layout__content">
//         <VendorNavbar />

//         <main className="vendor-layout__main">
//           {children}
//         </main>
//       </div>
//     </div>