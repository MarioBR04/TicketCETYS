/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { SalaCard } from '../components/SalaCard';
import { supabase } from '../supabaseClient';

export const NuevaReservacion = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkAvailability = async (salaId, date) => {
    const { data, error } = await supabase
      .from('reservaciones')
      .select('*')
      .eq('id_sala', salaId)
      .eq('fecha_reserva', date.toISOString().split('T')[0]);

    return data?.length === 0;
  };

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const { data, error } = await supabase.from('salas').select('*');
        if (data) setSalas(data);
        if (error) throw error;
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
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Salas</h2>
        {/* Contenido adicional de sidebar */}
      </div>
      <div className="flex-1 overflow-x-auto p-6 flex space-x-4">
        {salas.map(sala => (
          <SalaCard 
            key={sala.id_sala} 
            sala={sala} 
            checkAvailability={checkAvailability}
          />
        ))}
      </div>
    </div>
  );
};

export default NuevaReservacion;