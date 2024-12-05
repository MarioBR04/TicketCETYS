import React from "react";
import { ContactModal } from "../components/ContactModal";
import { useState } from "react";

const Ayuda = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal

  const openModal = () => setIsModalOpen(true); // Abrir modal
  const closeModal = () => setIsModalOpen(false); // Cerrar modal

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Centro de Ayuda</h1>
      <p style={styles.description}>
        Encuentra respuestas a las preguntas más frecuentes o contáctanos para
        obtener soporte adicional.
      </p>
      <ul style={styles.list}>
        <li>🔹 ¿Cómo crear una cuenta?</li>
        <li>🔹 ¿Cómo restablecer mi contraseña?</li>
        <li>🔹 Guía de uso de la plataforma</li>
        <li>🔹 Contacto con soporte técnico</li>
      </ul>
      <button style={styles.button} onClick={openModal}>
        Contáctanos
      </button>
      {isModalOpen && <ContactModal onClose={closeModal} />}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "20px",
    textAlign: "center",
  },
  list: {
    listStyleType: "none",
    padding: "0",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Ayuda;
