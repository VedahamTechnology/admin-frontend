import UserSidebar from "../components/UserSidebar"
import UserNavbar from "../components/UserNavbar"

function UserLayout({ children }) {
  return (
    <div className="admin-shell">
      <UserSidebar />

      <div className="admin-content">
        <UserNavbar />

        <div className="admin-page-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default UserLayout