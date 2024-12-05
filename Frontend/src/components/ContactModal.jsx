/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React from "react";

export const ContactModal = ({ onClose }) => {
  const handleRedirect = () => {
    window.open("https://www.cetys.mx", "_blank");
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
          Contacto de Soporte
        </h2>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg text-gray-700">
              Correo:{" "}
              <a
                href="mailto:help@cetys.mx"
                className="text-blue-500 hover:underline"
              >
                help@cetys.mx
              </a>
            </p>
            <p className="text-lg text-gray-700">
              Teléfono:{" "}
              <a
                href="tel:+526461234567"
                className="text-blue-500 hover:underline"
              >
                +52 646 123 4567
              </a>
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleRedirect}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Ir a CETYS.mx
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
