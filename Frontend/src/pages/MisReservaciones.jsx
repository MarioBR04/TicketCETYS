import React, { useState, useEffect } from "react";
import "./MisReservaciones.css";
import { supabase } from "../supabaseClient";

const MisReservaciones = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // Control del popup
  const [reservaToDelete, setReservaToDelete] = useState(null); // ID de la reserva a eliminar

  const fetchReservaciones = async () => {
    try {
      const { data, error } = await supabase
        .from("reservas")
        .select(
          `
          id_reserva,
          matricula_usuario,
          id_sala,
          fecha_reserva,
          hora_inicio,
          hora_fin,
          salas(imagen_sala, nombre_sala),
          usuarios(nombre)
        `
        )
        .eq(
          "matricula_usuario",
          JSON.parse(localStorage.getItem("user")).matricula
        );

      if (error) throw error;
      setReservaciones(data);
    } catch (error) {
      console.error("Error al obtener las reservaciones:", error.message);
    }
  };

  useEffect(() => {
    fetchReservaciones();
  }, []);

  const handleEliminar = (id) => {
    setReservaToDelete(id); // Establecer la reserva a eliminar
    setShowPopup(true); // Mostrar el popup
  };

  const confirmarEliminacion = async () => {
    try {
      const { error } = await supabase
        .from("reservas")
        .delete()
        .eq("id_reserva", reservaToDelete);

      if (error) {
        alert("Error al eliminar la reservación");
        console.error(error);
      } else {
        setReservaciones((prevReservaciones) =>
          prevReservaciones.filter(
            (reservacion) => reservacion.id_reserva !== reservaToDelete
          )
        );
      }
    } catch (error) {
      console.error("Error al eliminar la reservación:", error.message);
    } finally {
      setShowPopup(false); // Cerrar el popup
    }
  };

  const cancelarEliminacion = () => {
    setShowPopup(false); // Cerrar el popup sin hacer nada
  };

  return (
    <div className="mis-reservaciones">
      <h1>Mis Reservaciones</h1>
      <div className="tarjetas-container">
        {reservaciones.map((reservacion) => (
          <div key={reservacion.id_reserva} className="tarjeta">
            <div className="tarjeta-info">
              <div className="imagen">
                <img
                  src={reservacion.salas.imagen_sala}
                  alt={reservacion.salas.nombre_sala}
                />
              </div>
              <h2>Reserva #{reservacion.id_reserva}</h2>
              <p>Usuario: {reservacion.usuarios.nombre}</p>
              <p>Sala: {reservacion.salas.nombre_sala}</p>
              <p>Fecha: {reservacion.fecha_reserva}</p>
              <p>Hora de inicio: {reservacion.hora_inicio}</p>
              <p>Hora de fin: {reservacion.hora_fin}</p>
              <div className="tarjeta-botones">
                <button
                  className="eliminar-btn"
                  onClick={() => handleEliminar(reservacion.id_reserva)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup de confirmación */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>¿Estás seguro de que quieres eliminar esta reservación?</h3>
            <div className="popup-botones">
              <button
                className="popup-btn confirmar"
                onClick={confirmarEliminacion}
              >
                Confirmar
              </button>
              <button
                className="popup-btn cancelar"
                onClick={cancelarEliminacion}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisReservaciones;
