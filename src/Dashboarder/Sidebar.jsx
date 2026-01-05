import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css"; // Sidebar styles

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Open"}
        </button>
        {/* <h3>Dashboard</h3> */}
      </div>
      {isSidebarOpen && (<nav>
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "sidebar-btn active" : "sidebar-btn"
                }
              >
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/result"
                className={({ isActive }) =>
                  isActive ? "sidebar-btn active" : "sidebar-btn"
                }
              >
                Check Result
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "sidebar-btn active" : "sidebar-btn"
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar