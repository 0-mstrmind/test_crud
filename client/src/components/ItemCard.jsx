function ItemCard({ item, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="item-card">
      <div className="item-card-top">
        <h3 className="item-name">{item.name}</h3>
        <span className={`status-badge ${item.status}`}>
          {item.status}
        </span>
      </div>
      {item.description && (
        <p className="item-description">{item.description}</p>
      )}
      <div className="item-card-bottom">
        <span className="item-date">
          {formatDate(item.createdAt)}
        </span>
        <div className="item-actions">
          <button className="action-btn edit-btn" onClick={() => onEdit(item)}>
            Edit
          </button>
          <button className="action-btn delete-btn" onClick={() => onDelete(item._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
