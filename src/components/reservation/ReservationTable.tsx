import Link from 'next/link';
import { Reservation } from '@/interfaces/reservation.interface';

interface ReservationTableProps {
  reservations: (Reservation & {
    huesped: { nombre: string }; // Datos del huésped asociado a la reserva
  })[];
}

export const ReservationTable = ({ reservations }: ReservationTableProps) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">#</th>
          <th className="p-2">Huésped</th>
          <th className="p-2">Fecha de Ingreso</th>
          <th className="p-2">Fecha de Salida</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation, count) => (
          <tr key={reservation.id} className="border-b">
            <td className="p-2">{count + 1}</td>
            <td className="p-2">{reservation.huesped.nombre}</td>
            <td className="p-2">
              {new Date(reservation.fechaIngreso).toLocaleDateString()}
            </td>
            <td className="p-2">
              {new Date(reservation.fechaSalida).toLocaleDateString()}
            </td>
            <td className="p-2">{reservation.estado}</td>
            <td className="p-2">
              <Link
                href={`/reservation/${reservation.id}`}
                className="text-blue-600 hover:underline"
              >
                Ver Detalles
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}