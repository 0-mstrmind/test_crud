import { useState, useEffect } from 'react';

function ItemForm({ onSubmit, editingItem, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description || '',
        status: editingItem.status,
      });
    } else {
      setFormData({ name: '', description: '', status: 'active' });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSubmit(formData);
    if (!editingItem) {
      setFormData({ name: '', description: '', status: 'active' });
    }
  };

  return (
    <div className="form-card">
      <div className="form-card-header">
        <h2 className="form-card-title">
          <span className="icon">{editingItem ? 'E' : '+'}</span>
          {editingItem ? 'Edit Item' : 'New Item'}
        </h2>
        {editingItem && (
          <button className="cancel-edit-btn" onClick={onCancelEdit}>
            ✕ Cancel
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter item name..."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            placeholder="Enter a description..."
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          {editingItem ? 'Update Item' : 'Create Item'}
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
