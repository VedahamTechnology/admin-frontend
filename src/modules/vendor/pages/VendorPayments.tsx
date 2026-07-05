import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Eye,
  IndianRupee,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

import VendorLayout from "../Layouts/VendorLayout";
import {
  EmptyState,
  LoadingState,
  PageHeader,
  SectionCard,
} from "../Components/VendorUI";

// ── Types ─────────────────────────────────────────────────────────────────────

type PaymentStatus = "completed" | "pending" | "refunded";
type PaymentMethod = "UPI" | "Card" | "Wallet" | "Cash";

interface Payment {
  transactionId: string;
  bookingId: string;
  customer: string;
  service: string;
  amount: number;
  platformFee: number;
  netEarnings: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidOn: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "all",       label: "All Status" },
  { value: "completed", label: "Completed"  },
  { value: "pending",   label: "Pending"    },
  { value: "refunded",  label: "Refunded"   },
];

const METHOD_OPTIONS: { value: string; label: string }[] = [
  { value: "all",    label: "All Methods" },
  { value: "UPI",    label: "UPI"         },
  { value: "Card",   label: "Card"        },
  { value: "Wallet", label: "Wallet"      },
  { value: "Cash",   label: "Cash"        },
];

// ── Status badge ──────────────────────────────────────────────────────────────

const statusMeta: Record<PaymentStatus, { label: string; className: string }> = {
  completed: { label: "Completed", className: "badge badge--success" },
  pending:   { label: "Pending",   className: "badge badge--warning" },
  refunded:  { label: "Refunded",  className: "badge"                },
};

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const meta = statusMeta[status] ?? { label: status, className: "badge" };
  return <span className={meta.className}>{meta.label}</span>;
}

// ── Payment drawer ────────────────────────────────────────────────────────────

function PaymentDrawer({
  payment,
  onClose,
}: {
  payment: Payment;
  onClose: () => void;
}) {
  const rows: { label: string; value: string }[] = [
    { label: "Transaction ID",   value: payment.transactionId },
    { label: "Booking ID",       value: payment.bookingId     },
    { label: "Customer",         value: payment.customer      },
    { label: "Service",          value: payment.service       },
    { label: "Amount",           value: `₹${payment.amount.toLocaleString("en-IN")}` },
    { label: "Platform Fee",     value: `₹${payment.platformFee.toLocaleString("en-IN")}` },
    { label: "Vendor Earnings",  value: `₹${payment.netEarnings.toLocaleString("en-IN")}` },
    { label: "Payment Method",   value: payment.method },
    { label: "Payment Status",   value: statusMeta[payment.status]?.label ?? payment.status },
    { label: "Payment Date",     value: payment.paidOn ? new Date(payment.paidOn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—" },
  ];

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer__header">
          <h2 className="drawer__title">Payment Details</h2>
          <button className="drawer__close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer__body">
          <div
            style={{
              background: "var(--color-neutral-bg)",
              borderRadius: "var(--radius-xl)",
              padding: "12px 16px",
              marginBottom: 24,
              fontSize: "0.875rem",
            }}
          >
            <strong style={{ color: "var(--color-brand-cyan)" }}>
              {payment.transactionId}
            </strong>
            <span style={{ color: "var(--color-text-secondary)", marginLeft: 8 }}>
              {payment.service}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {rows.map(({ label, value }) => (
              <div key={label} className="info-row">
                <span className="info-row__label">{label}</span>
                <span className="info-row__value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const payments: Payment[] = [];

export default function VendorPayments() {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatus]     = useState("all");
  const [methodFilter, setMethod]     = useState("all");
  const [selected, setSelected]       = useState<Payment | null>(null);

  // These would be set by real data fetching; kept as const for the placeholder build.
  const loading = false;
  const error   = "";

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return payments.filter((p) => {
      const matchSearch =
        !q ||
        p.transactionId.toLowerCase().includes(q) ||
        p.bookingId.toLowerCase().includes(q) ||
        p.customer.toLowerCase().includes(q) ||
        p.service.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      const matchMethod = methodFilter === "all" || p.method === methodFilter;
      return matchSearch && matchStatus && matchMethod;
    });
  }, [search, statusFilter, methodFilter]);

  const stats = useMemo(
    () => ({
      totalEarnings:   payments.reduce((sum, p) => sum + (p.status !== "refunded" ? p.netEarnings : 0), 0),
      received:        payments.filter((p) => p.status === "completed").length,
      pending:         payments.filter((p) => p.status === "pending").length,
      refunded:        payments.reduce((sum, p) => sum + (p.status === "refunded" ? p.amount : 0), 0),
    }),
    []
  );

  return (
    <VendorLayout>
      <div className="page-shell">
        <PageHeader
          eyebrow="Payments"
          title="Payment Management"
          description="Track your earnings, completed payments, pending settlements, and payment history."
        />

        {/* ── Stat cards ───────────────────────────────────── */}
        <div className="metric-grid metric-grid--4">
          <div className="metric-card">
            <div>
              <p className="metric-card__label">Total Earnings</p>
              <p className="metric-card__value">₹{stats.totalEarnings.toLocaleString("en-IN")}</p>
            </div>
            <div className="metric-card__icon accent-cyan">
              <IndianRupee size={20} />
            </div>
          </div>

          <div className="metric-card">
            <div>
              <p className="metric-card__label">Received Payments</p>
              <p className="metric-card__value">{stats.received}</p>
            </div>
            <div className="metric-card__icon accent-success">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <div className="metric-card">
            <div>
              <p className="metric-card__label">Pending Payments</p>
              <p className="metric-card__value">{stats.pending}</p>
            </div>
            <div className="metric-card__icon accent-warning">
              <Clock3 size={20} />
            </div>
          </div>

          <div className="metric-card">
            <div>
              <p className="metric-card__label">Refunded</p>
              <p className="metric-card__value">₹{stats.refunded.toLocaleString("en-IN")}</p>
            </div>
            <div className="metric-card__icon accent-danger">
              <RotateCcw size={20} />
            </div>
          </div>
        </div>

        {/* ── Table card ───────────────────────────────────── */}
        <SectionCard title="Payment History">
          {/* Toolbar */}
          <div className="table-toolbar">
            <div className="search-wrapper">
              <Search size={18} className="search-wrapper__icon" />
              <input
                className="admin-input"
                placeholder="Search transaction..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <select
                className="admin-select"
                value={statusFilter}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <select
                className="admin-select"
                value={methodFilter}
                onChange={(e) => setMethod(e.target.value)}
              >
                {METHOD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* States */}
          {loading ? (
            <LoadingState />
          ) : error ? (
            <div
              style={{
                color: "var(--color-danger)",
                padding: "32px 0",
                textAlign: "center",
                fontSize: "0.9375rem",
              }}
            >
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No payment history available."
              description="Completed customer payments will appear here."
              icon={<IndianRupee size={20} />}
            />
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--min-wide">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Platform Fee</th>
                    <th>Net Earnings</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Paid On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((payment) => (
                    <tr key={payment.transactionId}>
                      <td>
                        <p
                          className="admin-table__cell-primary"
                          style={{ color: "var(--color-brand-cyan)", fontWeight: 700 }}
                        >
                          {payment.transactionId}
                        </p>
                      </td>
                      <td>
                        <p className="admin-table__cell-sub">{payment.bookingId}</p>
                      </td>
                      <td>{payment.customer}</td>
                      <td>{payment.service}</td>
                      <td style={{ fontWeight: 600 }}>
                        ₹{payment.amount.toLocaleString("en-IN")}
                      </td>
                      <td style={{ color: "var(--color-text-secondary)" }}>
                        ₹{payment.platformFee.toLocaleString("en-IN")}
                      </td>
                      <td style={{ fontWeight: 600, color: "var(--color-success)" }}>
                        ₹{payment.netEarnings.toLocaleString("en-IN")}
                      </td>
                      <td>{payment.method}</td>
                      <td>
                        <PaymentStatusBadge status={payment.status} />
                      </td>
                      <td>
                        {payment.paidOn
                          ? new Date(payment.paidOn).toLocaleDateString("en-IN")
                          : "—"}
                      </td>
                      <td>
                        <button
                          className="btn btn--outline service-action-btn"
                          onClick={() => setSelected(payment)}
                        >
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>

      {/* ── Drawer ───────────────────────────────────────────── */}
      {selected && (
        <PaymentDrawer payment={selected} onClose={() => setSelected(null)} />
      )}
    </VendorLayout>
  );
}
