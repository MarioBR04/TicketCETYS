import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./webBase/SideBar";
import Lugares from "./pages/Lugares";
import NuevaReserva from "./pages/NuevaReservacion";
import MisReservas from "./pages/MisReservaciones";
import Ayuda from "./pages/Ayuda";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const [user, setUser] = useState();

  if (!user && !localStorage.getItem("user")) {
    return <Login setUser={setUser} />;
  }
  return (
    <>
      <Router>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="root">
          <div className="body">
            <Routes>
              <Route path="/" element={<Lugares />} />
              <Route path="/nuevareserva" element={<NuevaReserva />} />
              <Route path="/misreservas" element={<MisReservas />} />
              <Route path="/ayuda" element={<Ayuda />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
