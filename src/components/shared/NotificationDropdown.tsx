import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New Booking",
    message: "You received a new booking request",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Worker Approved",
    message: "A worker has been approved",
    time: "15 min ago",
    read: false,
  },
  {
    id: 3,
    title: "Service Updated",
    message: "Your service was updated successfully",
    time: "1 hr ago",
    read: true,
  },
];

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );
  };

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <button
        className="notification-dropdown__trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="notification-dropdown__badge">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown__menu">
          <div className="notification-dropdown__header">
            <h4>Notifications</h4>

            <button
              className="notification-dropdown__mark-read"
              onClick={markAllAsRead}
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          </div>

          <div className="notification-dropdown__list">
            {notifications.length === 0 ? (
              <div className="notification-dropdown__empty">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-dropdown__item ${
                    !notification.read
                      ? "notification-dropdown__item--unread"
                      : ""
                  }`}
                >
                  <p className="notification-dropdown__title">
                    {notification.title}
                  </p>

                  <p className="notification-dropdown__message">
                    {notification.message}
                  </p>

                  <span className="notification-dropdown__time">
                    {notification.time}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}