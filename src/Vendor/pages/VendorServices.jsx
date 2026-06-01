import VendorLayout from "../Layouts/VendorLayout"
import { Plus } from "lucide-react"

import { PageShell, SectionCard, StatusPill } from "../../components/admin/AdminPageElements"

const services = [
  { name: "Deep Cleaning", category: "Home Cleaning", price: "₹1,499", status: "Active" },
  { name: "Bathroom Cleaning", category: "Home Cleaning", price: "₹699", status: "Pending" },
  { name: "AC Service", category: "Appliance Care", price: "₹899", status: "Active" },
  { name: "Painting Support", category: "Home Improvement", price: "₹2,999", status: "Inactive" },
]

function VendorServices() {
  return (
    <VendorLayout>
      <PageShell
        title="Services"
        description="Manage the services you offer with the same design language and table structure used across admin pages."
        actions={[
          <button
            key="add-service"
            type="button"
            className="btn btn--primary"
          >
            <Plus size={16} />
            Add Service
          </button>
        ]}
      >
        <SectionCard
          title="Service Catalog"
          description="Placeholder rows are kept local so API integration can be added separately later."
        >
          <div className="admin-table-wrapper">
            <table className="admin-table admin-table--min-wide">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.name}>
                    <td>
                      <p className="admin-table__cell-primary">{service.name}</p>
                    </td>
                    <td>
                      <p className="admin-table__cell-primary">{service.category}</p>
                    </td>
                    <td>
                      <p className="admin-table__cell-primary">{service.price}</p>
                    </td>
                    <td>
                      <StatusPill status={service.status} />
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

export default VendorServices