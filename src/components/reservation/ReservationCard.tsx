import { Reservation, ReservationDetail } from '@/interfaces';

interface ReservationCardProps {
    reservation: Reservation & {
        huesped: { nombre: string };
        detalleReservas: (ReservationDetail & {
            habitacion: { numero: string };
        })[];
    };
}

export const ReservationCard = ({ reservation }: ReservationCardProps) => {
    return (
        <div className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-bold">Reserva #{reservation.id}</h3>
            <p><strong>Huésped:</strong> {reservation.huesped.nombre}</p>
            <p><strong>Check-In:</strong> {new Date(reservation.fechaIngreso).toLocaleDateString()}</p>
            <p><strong>Check-Out:</strong> {new Date(reservation.fechaSalida).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> {reservation.estado}</p>

            {/* Detalles de las habitaciones reservadas */}
            <h4 className="text-md font-semibold mt-2">Habitaciones Reservadas</h4>
            <ul className="list-disc pl-5">
                {reservation.detalleReservas.map((detalle, index) => (
                    <li key={index}>
                        Habitación {detalle.habitacion.numero} - ${detalle.precio.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}