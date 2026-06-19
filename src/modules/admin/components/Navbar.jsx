
import NotificationDropdown from "../../../components/shared/NotificationDropdown";

function Navbar() {
  return (
    <header className="navbar">
      <input
        placeholder="Search..."
        className="navbar__search"
      />

      <div className="navbar__right">
        <NotificationDropdown unreadCount={3} />

        <div className="navbar__profile">
          <div className="navbar__avatar">A</div>

          <div>
            <p className="navbar__user-name">Admin</p>
            <p className="navbar__user-role">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;