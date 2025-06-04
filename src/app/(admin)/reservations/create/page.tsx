'use client'
import ReservationForm from '@/components/reservation/ReservationForm';
// import {ReservationForm }from '@/components';
import Link from 'next/link';

export default function CreateReservationPage() {
  const handleSuccess = () => {
    // Redirige a la lista de reservas después de crear una nueva reserva
    window.location.href = '/reservations';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Reserva</h1>
      <ReservationForm onSubmitSuccess={handleSuccess} />
    </div>
  );
}