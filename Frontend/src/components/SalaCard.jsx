/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReservationModal } from './ReservationModal';

export const SalaCard = ({ sala, checkAvailability }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation(); // Previene que el evento se propague
    setShowModal(true);
  };

  return (
    <div 
    className="m-4 p-4 border rounded-lg cursor-pointer hover:shadow-xl transition-all w-80 flex-shrink-0"
    onClick={handleClick}
  >
    <div className="h-64 w-full overflow-hidden rounded-md relative">
      <img 
        src={sala.imagen_sala} 
        alt={sala.nombre_sala} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
      />
    </div>
    <div className="mt-4 text-center">
      <h2 className="text-xl font-bold text-gray-800">{sala.nombre_sala}</h2>
      <p className="text-gray-600">Capacidad: {sala.capacidad} personas</p>
    </div>

    {showModal && (
      <ReservationModal 
        sala={sala} 
        onClose={() => setShowModal(false)}
        checkAvailability={checkAvailability}
      />
    )}
  </div>
  );
};

SalaCard.propTypes = {
  sala: PropTypes.shape({
    imagen_sala: PropTypes.string.isRequired,
    nombre_sala: PropTypes.string.isRequired,
    capacidad: PropTypes.number.isRequired,
  }).isRequired,
  checkAvailability: PropTypes.func,
};
