import ItemCard from './ItemCard';

function ItemList({ items, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Loading items...</p>
      </div>
    );
  }

  return (
    <div className="items-section">
      <div className="items-header">
        <h2 className="items-title">All Items</h2>
        <span className="items-count">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">--</div>
          <h3>No items yet</h3>
          <p>Create your first item using the form on the left.</p>
        </div>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;
