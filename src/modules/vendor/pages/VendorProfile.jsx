import VendorLayout from "../Layouts/VendorLayout"
import { PageShell, SectionCard } from "../../../components/admin/AdminPageElements"

const profileFields = [
  { label: "Business Name", value: "Homster Vendor Services" },
  { label: "Owner Name", value: "Amit Sharma" },
  { label: "Email", value: "vendor@homster.com" },
  { label: "Phone", value: "+91 98765 43210" },
  { label: "Address", value: "Bangalore, Karnataka, India" },
]

function VendorProfile() {
  return (
    <VendorLayout>
      <PageShell
        title="Profile"
        description="View vendor business details in the same design language used across the admin panel, with API integration kept separate for later."
      >
        <SectionCard
          title="Business Profile"
          description="Static placeholders are used for now so the layout is ready for future backend data.
        "
        >
          <div className="admin-table-wrapper">
            <table className="admin-table admin-table--min-wide">
              <tbody>
                {profileFields.map((field) => (
                  <tr key={field.label}>
                    <td>
                      <p className="admin-table__cell-primary">{field.label}</p>
                    </td>
                    <td>
                      <p className="admin-table__cell-sub">{field.value}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>
    </VendorLayout>
  )
}

export default VendorProfile