
import { useState } from "react"
import { X } from "lucide-react"
 
function CategoryModal({ category, onSave, onClose }) {
  const isEditMode = Boolean(category)
 
  const [name, setName] = useState(category?.name || "")
  const [description, setDescription] = useState(category?.description || "")
  const [displayOrder, setDisplayOrder] = useState(
    category?.displayOrder !== undefined ? String(category.displayOrder) : "0"
  )
  const [image, setImage] = useState(category?.image || "")
  const [icon, setIcon] = useState(category?.icon || "")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
 
  const handleSubmit = async (e) => {
    e.preventDefault()
 
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError("Category name is required")
      return
    }
 
    setError("")
    setSaving(true)
 
    const payload = {
      name: trimmedName,
      description: description.trim(),
      displayOrder: displayOrder === "" ? 0 : Number(displayOrder),
      image: image.trim(),
      icon: icon.trim(),
    }
 
    try {
      await onSave(payload)
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      )
      setSaving(false)
    }
  }
 
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">
            {isEditMode ? "Edit Category" : "Add Category"}
          </h2>
          <button className="drawer__close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
 
        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            {error && (
              <p
                style={{
                  color: "var(--color-danger)",
                  fontSize: "0.875rem",
                  marginBottom: 16,
                }}
              >
                {error}
              </p>
            )}
 
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Category Name *</label>
              <input
                className="admin-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Plumbing"
              />
            </div>
 
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Description</label>
              <textarea
                className="admin-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description of this category"
                rows={3}
              />
            </div>
 
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Display Order</label>
              <input
                className="admin-input"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                placeholder="0"
              />
            </div>
 
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Image URL</label>
              <input
                className="admin-input"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
 
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Icon</label>
              <input
                className="admin-input"
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Icon name or URL"
              />
            </div>
          </div>
 
          <div className="modal__footer">
            <button
              type="button"
              className="btn btn--outline"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? "Saving..." : isEditMode ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
 
export default CategoryModal