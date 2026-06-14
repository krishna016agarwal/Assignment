import { HeartHandshake, LayoutDashboard, LogOut, Menu, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const links = (
    <>
      <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
      {user && <NavLink to="/volunteer" onClick={() => setOpen(false)}>Volunteer</NavLink>}
      {user?.role === "admin" && <NavLink to="/admin" onClick={() => setOpen(false)}>Admin</NavLink>}
      {!user ? (
        <>
          <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
          <NavLink to="/register" className="nav-cta" onClick={() => setOpen(false)}><UserPlus size={17} /> Join</NavLink>
        </>
      ) : (
        <button className="logout-btn" onClick={handleLogout}><LogOut size={17} /> Logout</button>
      )}
    </>
  );

  return (
    <nav className="navbar glass">
      <Link to="/" className="brand"><span><HeartHandshake size={24} /></span>NayePankh</Link>
      <div className="nav-links">{links}</div>
      <button className="menu-btn" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      {open && <div className="mobile-menu glass">{links}</div>}
    </nav>
  );
};

export default Navbar;
