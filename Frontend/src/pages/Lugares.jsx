import React, { useState, useEffect } from "react";
import "./Lugares.css";
import { supabase } from "../supabaseClient";

const PlacesView = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const { data, error } = await supabase.from("salas").select("*");
        if (error) throw error;
        setSalas(data);
        if (data.length > 0) setSelectedPlace(data[0]); // Seleccionar la primera sala por defecto
      } catch (err) {
        console.error("Error fetching salas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header"></header>

      {/* Navigation */}
      <nav className="nav">
        {salas.map((sala) => (
          <button
            key={sala.id_sala}
            onClick={() => setSelectedPlace(sala)}
            className={`nav-button ${
              selectedPlace?.id_sala === sala.id_sala ? "active" : ""
            }`}
          >
            {sala.nombre}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      {selectedPlace && (
        <main className="content">
          <div className="place-info">
            <h2>{selectedPlace.nombre_sala}</h2>
            <img
              src={selectedPlace.imagen_sala}
              alt={`Imagen de ${selectedPlace.nombre}`}
              className="place-image"
            />
            <p className="perro">
              <strong>Capacidad:</strong> {selectedPlace.capacidad} personas
            </p>
          </div>
        </main>
      )}
    </div>
  );
};

export default PlacesView;
