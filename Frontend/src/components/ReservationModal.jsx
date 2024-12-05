/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { isDateValid, isValidReservationTime } from '../utils/validationUtils';

export const ReservationModal = ({ sala, onClose, checkAvailability }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Verificar usuario al montar el componente
    const storedUserId = localStorage.getItem("matricula");
    console.log("Usuario recuperado:", storedUserId);
    setUserId(storedUserId);
  }, []);

  const handleReserve = async () => {
    // Asegurarse de que userId está definido
    const currentUserId = localStorage.getItem("matricula");
    
    if (!currentUserId) {
      setError("Inicia sesión para reservar");
      return;
    }

    const reservationDate = new Date(date);
    if (!isDateValid(reservationDate)) {
      setError("No puedes reservar en fechas pasadas");
      return;
    }

    if (!isValidReservationTime(startTime, endTime)) {
      setError("Horario de reserva inválido");
      return;
    }

    const isAvailable = await checkAvailability(sala.id_sala, reservationDate);
    if (!isAvailable) {
      setError("La sala ya está reservada en ese horario");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reservaciones')
        .insert({
          id_sala: sala.id_sala,
          fecha_reserva: date,
          hora_inicio: startTime,
          hora_fin: endTime,
          matricula: currentUserId
        });

      if (error) throw error;

      alert("Reservación realizada con éxito");
      onClose();
    } catch (err) {
      setError("Error al realizar la reservación");
      console.error(err);
  };
  
  ReservationModal.propTypes = {
    sala: PropTypes.shape({
      id_sala: PropTypes.number.isRequired,
      nombre_sala: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    checkAvailability: PropTypes.func.isRequired,
  };
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {sala.nombre_sala} - Reservación
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700">Fecha</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-2 text-gray-700">Hora Inicio</label>
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-gray-700">Hora Fin</label>
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}
          <div className="flex justify-center space-x-4 mt-6">
            <button 
              onClick={handleReserve} 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              // Elimina el atributo disabled
            >
              Reservar
            </button>
            <button 
              onClick={onClose} 
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};