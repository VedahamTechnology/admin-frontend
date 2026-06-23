import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import {
  EmptyState,
  LoadingGrid,
  PageShell,
  SectionCard,
  StatusPill,
} from "../components/AdminPageElements";

import { Plus, Edit2, Trash2 } from "lucide-react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkUpdateCategoryStatus,
} from "../services/adminService";

import CategoryModal from "../components/Categorymodal";

function Categories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const [actionError, setActionError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);

      const res = await getCategories();

      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setEditingCategory(null);

    setActionError("");

    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);

    setActionError("");

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);

    setEditingCategory(null);
  };

  const handleSaveCategory = async (payload) => {
    if (editingCategory) {
      await updateCategory(editingCategory._id, payload);
    } else {
      await createCategory(payload);
    }

    await fetchCategories();

    closeModal();
  };

  const handleDeleteCategory = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setActionError("");

    try {
      await deleteCategory(category._id);

      await fetchCategories();
    } catch (error) {
      setActionError(
        error?.response?.data?.message || "Failed to delete category."
      );
    }
  };

  const handleToggleStatus = async (category) => {
    setActionError("");

    try {
      await bulkUpdateCategoryStatus({
        categoryIds: [category._id],

        isActive: !category.isActive,
      });

      await fetchCategories();
    } catch (error) {
      setActionError(
        error?.response?.data?.message || "Failed to update category status."
      );
    }
  };

  return (
    <AdminLayout>
      <PageShell
        title="Categories"
        description="Manage service categories available across the Homster platform."
        actions={[
          <button
            key="add-category"
            type="button"
            className="btn btn--primary"
            onClick={openAddModal}
          >
            <Plus size={16} />
            Add Category
          </button>,
        ]}
      >
        <SectionCard
          title="Category Registry"
          description="Live category data from backend."
        >
          {actionError && (
            <p
              style={{
                color: "var(--color-danger)",

                fontSize: "0.875rem",

                marginBottom: 16,
              }}
            >
              {actionError}
            </p>
          )}

          {loading ? (
            <LoadingGrid cards={4} />
          ) : (
            <div className="admin-table-wrapper">
              <table
                className="
 
admin-table
 
admin-table--min-wide
 
"
              >
                <thead>
                  <tr>
                    <th>Category</th>

                    <th>Category ID</th>

                    <th>Display Order</th>

                    <th>Services</th>

                    <th>Status</th>

                    <th>Created</th>

                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="
 
py-10
 
text-center
 
text-slate-500
 
"
                      >
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category._id}>
                        <td>
                          <div>
                            <p
                              className="
 
admin-table__cell-primary
 
"
                            >
                              {category.name}
                            </p>

                            <p
                              className="
 
admin-table__cell-sub
 
"
                            >
                              {category.description || "No description"}
                            </p>
                          </div>
                        </td>

                        <td>{category.categoryId || "-"}</td>

                        <td>{category.displayOrder ?? 0}</td>

                        <td>{category.totalServices || 0}</td>

                        <td>
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(category)}
                            style={{
                              background: "none",

                              border: "none",

                              padding: 0,

                              cursor: "pointer",
                            }}
                            title={
                              category.isActive
                                ? "Click to deactivate"
                                : "Click to activate"
                            }
                          >
                            <StatusPill
                              status={category.isActive ? "Active" : "Inactive"}
                            />
                          </button>
                        </td>

                        <td>
                          {new Date(category.createdAt).toLocaleDateString()}
                        </td>

                        <td>
                          <div className="service-actions">
                            <button
                              type="button"
                              className="btn btn--outline service-action-btn"
                              onClick={() => openEditModal(category)}
                            >
                              <Edit2 size={14} /> Edit
                            </button>

                            <button
                              type="button"
                              className="btn btn--danger service-action-btn"
                              onClick={() => handleDeleteCategory(category)}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>

        <SectionCard
          title="Category Analytics"
          description="Future category insights and reporting."
        >
          <EmptyState
            title="Analytics Coming Soon"
            description="Category growth trends and performance charts will appear here."
          />
        </SectionCard>
      </PageShell>

      {modalOpen && (
        <CategoryModal
          category={editingCategory}
          onSave={handleSaveCategory}
          onClose={closeModal}
        />
      )}
    </AdminLayout>
  );
}

export default Categories;
