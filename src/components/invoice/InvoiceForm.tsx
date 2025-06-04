'use client'; // Indica que este es un componente del lado del cliente

import { useEffect, useState } from 'react';
import { createInvoice } from '@/actions';
import { getCheckins } from '@/actions';
import CreateInvoicePage from '@/app/(admin)/invoices/create/page';

interface InvoiceFormProps {
  onSubmitSuccess?: () => void; // Callback opcional para manejar el éxito
}

export default function InvoiceForm({ onSubmitSuccess }: InvoiceFormProps) {
  const [fichaHospedajeId, setFichaHospedajeId] = useState('');
  const [checkins, setCheckins] = useState<any[]>([]); // Lista de check-ins disponibles

  useEffect(() => {
    const fetchCheckins = async () => {
      const data = await getCheckins();
      setCheckins(data);
    };

    fetchCheckins();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await CreateInvoicePage(fichaHospedajeId);
      alert('Factura creada exitosamente');
      onSubmitSuccess?.();
    } catch (error) {
      console.error('Error al crear la factura:', error);
      alert('Ocurrió un error al crear la factura');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Crear Factura</h2>

      {/* Selector de Check-in */}
      <div>
        <label htmlFor="fichaHospedajeId" className="block text-sm font-medium text-gray-700">
          Seleccionar Check-in
        </label>
        <select
          id="fichaHospedajeId"
          value={fichaHospedajeId}
          onChange={(e) => setFichaHospedajeId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">Selecciona un check-in</option>
          {checkins.map((checkin) => (
            <option key={checkin.id} value={checkin.id}>
              {checkin.huesped.nombre} - Habitación {checkin.habitacion.numero}
            </option>
          ))}
        </select>
      </div>

      {/* Botón de Envío */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Crear Factura
      </button>
    </form>
  );
}