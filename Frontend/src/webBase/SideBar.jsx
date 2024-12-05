import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineLocationMarker,
  HiOutlinePlusCircle,
  HiUserCircle,
  HiQuestionMarkCircle,
} from "react-icons/hi";
import "./SideBar.css";
import { GiEasterEgg } from "react-icons/gi";

function Sidebar() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Lugares", icon: <HiOutlineLocationMarker /> },
    {
      to: "/misreservas",
      label: "Mis Reservaciones",
      icon: <GiEasterEgg />,
    },
    {
      to: "/nuevareserva",
      label: "Nueva Reservacion",
      icon: <HiOutlinePlusCircle />,
    },
    { to: "/ayuda", label: "Ayuda", icon: <HiQuestionMarkCircle /> },
  ];

  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo-cetys.png/755px-Logo-cetys.png"
          alt="Logo"
        />
        <span className="app-name">Ticket</span>
      </div>
      <div className="sidebar-nav">
        <nav>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`nav-item ${
                location.pathname === item.to ? "nav-active" : ""
              }`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="sidebar-footer">
        <div className="user-info">
          <HiUserCircle className="user-icon" />
          <p className="user-name">
            {JSON.parse(localStorage.getItem("user")).nombre || "Usuario"}
          </p>
          <button className="logOut" onClick={logOut}>
            <span className="logout-text">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
