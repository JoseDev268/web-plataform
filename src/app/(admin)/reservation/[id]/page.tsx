import { getReservationById } from '@/actions';
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import {ReservationCard }from '@/components';

export default async function ReservationDetailsPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/auth/login');
  }

  const reservation = await getReservationById(params.id);

  if (!reservation || (session.user.rol !== 'ADMIN' && reservation.huespedId !== session.user.id)) {
    redirect('/reservations');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Reserva</h1>
      <ReservationCard reservation={reservation} />
    </div>
  );
}