function Navbar({ itemCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">C</div>
        <span className="navbar-title">CRUD Manager</span>
      </div>
      <div className="navbar-stats">
        <div className="stat-badge">
          Items <span className="count">{itemCount}</span>
        </div>
        <div className="stat-badge">
          MERN Stack
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
