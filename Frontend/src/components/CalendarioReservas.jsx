import * as React from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";

export const CalendarioReservas = ({ sala_seleccionada }) => {
  const [events, setEvents] = useState([]);

  // Función para cargar datos desde Supabase
  const fetchReservas = async () => {
    const { data, error } = await supabase
      .from("reservas")
      .select(
        `
        id_reserva,
        matricula_usuario,
        fecha_reserva,
        hora_inicio,
        hora_fin,
        salas(nombre_sala)
        `
      )
      .eq("id_sala", sala_seleccionada.id_sala);

    if (error) {
      console.error("Error fetching reservas:", error);
      return;
    }

    // Transformar datos a formato del Scheduler
    const transformedEvents = data.map((reserva) => ({
      event_id: reserva.id_reserva,
      title: `${reserva.salas.nombre_sala} - Usuario: ${reserva.matricula_usuario}`,
      start: new Date(`${reserva.fecha_reserva}T${reserva.hora_inicio}`),
      end: new Date(`${reserva.fecha_reserva}T${reserva.hora_fin}`),
    }));

    setEvents(transformedEvents);
  };

  // Llamar a la función de carga al montar el componente
  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div>
      <Scheduler
        view="day"
        navigation="false"
        disableViewNavigator="true"
        agenda="true"
        events={events}
        editable={false} // Desactiva la edición de eventos
      />
    </div>
  );
};
