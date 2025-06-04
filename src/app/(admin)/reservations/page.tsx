import { auth } from '@/auth.config';
import { getReservations } from '@/actions';

import { redirect } from 'next/navigation';
import { ReservationTable } from '@/components';
import Link from 'next/link';

export default async function ReservationsPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/auth/login');
  }

  const reservations = await getReservations(
    session?.user?.rol === 'ADMIN' ? undefined : session?.user?.id
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Reservas</h1>
        {/* Botón para crear una nueva reserva */}
        <Link href="/reservations/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nueva Reserva
        </Link>
      </div>

      {/* Tabla de reservas */}
      <ReservationTable reservations={reservations} />
    </div>
  );
}