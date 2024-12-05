import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./webBase/SideBar";
import Lugares from "./pages/Lugares";
import NuevaReserva from "./pages/NuevaReservacion";
import MisReservas from "./pages/MisReservaciones";
import Ayuda from "./pages/Ayuda";
import "./App.css";
const supabase = createClient(
  "https://tfkgssvsqrlybxxjzwxx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRma2dzc3ZzcXJseWJ4eGp6d3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzM2NDIsImV4cCI6MjA0ODk0OTY0Mn0.z4f4u68nZRuelSi_2yIVQZERjKjyIivtgHdO53OjPkk"
);

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("usuarios").select();
    setCountries(data);
    console.log(data);
  }

  return (
    <>
      <Router>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="root">
          <div className="body">
            <ul>
              {countries.map((country) => (
                <li key={country.nombre}>{country.nombre}</li>
              ))}
            </ul>
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
