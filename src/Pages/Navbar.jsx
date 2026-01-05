// import { nav } from 'framer-motion/client'
import React from 'react'
import { Link, NavLink ,useNavigate} from 'react-router-dom'

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
    const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
// the below nullify the effect in app.jsx:67
    localStorage.removeItem("token");
  localStorage.removeItem("user");
  setIsAuthenticated(false);
  };

   // Only render navbar if the user is authenticated
  if (!isAuthenticated) {
    return null; // Hide navbar completely before login
  }
  return (
    <div>
    <nav>
<NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
      {/* <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink> */}
      <button onClick={handleLogout}>Logout</button>
    </nav>
</div>
  )
}

export default Navbar
