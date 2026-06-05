import {
  Bell,
  CheckCheck,
  CalendarCheck,
  UserCheck,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

import VendorLayout from "../Layouts/VendorLayout";

import {
  PageHeader,
  SectionCard,
  EmptyState,
} from "../Components/VendorUI";

import { useNotifications } from "../hooks/useVendor";

import type {
  NotificationType,
  Notification,
} from "../types/vendor";


const TYPE_CONFIG: Record<NotificationType, { icon: React.ReactNode; bg: string; color: string }> = {
  booking_received:  { icon: <CalendarCheck size={18} />, bg: "rgba(5,175,199,0.12)",    color: "var(--color-brand-cyan)"   },
  booking_confirmed: { icon: <CheckCircle size={18} />,   bg: "var(--color-success-bg)", color: "var(--color-success)"      },
  worker_assigned:   { icon: <UserCheck size={18} />,     bg: "rgba(99,102,241,0.12)",   color: "#6366f1"                   },
  booking_completed: { icon: <CheckCheck size={18} />,    bg: "var(--color-success-bg)", color: "var(--color-success)"      },
  booking_cancelled: { icon: <XCircle size={18} />,       bg: "var(--color-danger-bg)",  color: "var(--color-danger)"       },
  general:           { icon: <Info size={18} />,          bg: "var(--color-neutral-bg)", color: "var(--color-text-secondary)"},
};

function timeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(mins  / 60);
  const days  = Math.floor(hours / 24);
  if (days  > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins  > 0) return `${mins}m ago`;
  return "just now";
}

export default function VendorNotifications() {
  const { notifications, markRead, markAllRead, unreadCount } = useNotifications();

  const unread = notifications.filter((n) => !n.read);
  const read   = notifications.filter((n) =>  n.read);

  return (
    <VendorLayout>
      <div className="page-shell">
        <PageHeader
          eyebrow="Updates"
          title="Notifications"
          description="Stay up to date with bookings, assignments and business activity."
          actions={
            unreadCount > 0 ? (
              <button className="btn btn--outline" onClick={markAllRead}>
                <CheckCheck size={16} /> Mark All Read
              </button>
            ) : undefined
          }
        />

        {/* Unread */}
        {unread.length > 0 && (
          <SectionCard
            title={`Unread (${unread.length})`}
            description="New notifications requiring attention."
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {unread.map((n) => (
                <NotifItem key={n.id} notif={n} onRead={() => markRead(n.id)} />
              ))}
            </div>
          </SectionCard>
        )}

        {/* Read */}
        {read.length > 0 && (
          <SectionCard title="Earlier" description="Previously read notifications.">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {read.map((n) => (
                <NotifItem key={n.id} notif={n} onRead={() => markRead(n.id)} />
              ))}
            </div>
          </SectionCard>
        )}

        {notifications.length === 0 && (
          <EmptyState
            title="All clear!"
            description="No notifications yet. They'll appear here as activity happens."
            icon={<Bell size={20} />}
          />
        )}
      </div>
    </VendorLayout>
  );
}

function NotifItem({ notif, onRead }: { notif: Notification; onRead: () => void }) {
  const config = TYPE_CONFIG[notif.type];
  return (
    <div
      className={`notif-item${!notif.read ? " notif-item--unread" : ""}`}
      onClick={onRead}
    >
      <div
        className="notif-icon"
        style={{ background: config.bg, color: config.color }}
      >
        {config.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <p style={{ fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>{notif.title}</p>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", whiteSpace: "nowrap", marginLeft: 12 }}>
            {timeAgo(notif.timestamp)}
          </span>
        </div>
        <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", margin: "4px 0 0", lineHeight: 1.5 }}>
          {notif.message}
        </p>
      </div>
      {!notif.read && <div className="notif-unread-dot" />}
    </div>
  );
}
