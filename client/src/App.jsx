import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { getItems, createItem, updateItem, deleteItem } from './api/items';
import './index.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await getItems();
      setItems(data);
    } catch (error) {
      addToast('Failed to fetch items', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const { data } = await createItem(formData);
      setItems((prev) => [data, ...prev]);
      addToast('Item created successfully!');
    } catch (error) {
      addToast('Failed to create item', 'error');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const { data } = await updateItem(editingItem._id, formData);
      setItems((prev) =>
        prev.map((item) => (item._id === data._id ? data : item))
      );
      setEditingItem(null);
      addToast('Item updated successfully!');
    } catch (error) {
      addToast('Failed to update item', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
      if (editingItem && editingItem._id === id) {
        setEditingItem(null);
      }
      addToast('Item deleted!');
    } catch (error) {
      addToast('Failed to delete item', 'error');
    }
  };

  const handleSubmit = (formData) => {
    if (editingItem) {
      handleUpdate(formData);
    } else {
      handleCreate(formData);
    }
  };

  return (
    <>
      <Navbar itemCount={items.length} />

      <div className="app-container">
        <div className="page-header">
          <h1>Item Manager</h1>
          <p>Create, read, update, and delete items — powered by MERN Stack</p>
        </div>

        <div className="main-grid">
          <ItemForm
            onSubmit={handleSubmit}
            editingItem={editingItem}
            onCancelEdit={() => setEditingItem(null)}
          />
          <ItemList
            items={items}
            loading={loading}
            onEdit={setEditingItem}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
