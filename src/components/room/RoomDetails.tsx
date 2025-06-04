'use client'; // Indica que este es un componente del lado del cliente

import React from 'react';

interface RoomDetailsProps {
  room: any; // Puedes reemplazar `any` con el tipo adecuado basado en tu esquema Prisma
}

export const RoomDetails = ({ room }: RoomDetailsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Habitación {room.numero}</h2>
      <p>Tipo: {room.tipoHabitacion.nombre}</p>
      <p>Precio: ${room.tipoHabitacion.precio}/noche</p>

      {/* Mostrar reservas */}
      <div>
        <h3 className="text-lg font-bold">Reservas:</h3>
        {room.detalleReservaciones.length > 0 ? (
          <ul>
            {room.detalleReservaciones.map((reserva: any) => (
              <li key={reserva.id}>
                <p>Fecha de ingreso: {new Date(reserva.reservacion.fechaIngreso).toLocaleDateString()}</p>
                <p>Fecha de salida: {new Date(reserva.reservacion.fechaSalida).toLocaleDateString()}</p>
                <p>Huésped: {reserva.reservacion.huesped.nombre}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay reservas asociadas a esta habitación.</p>
        )}
      </div>

      {/* Mostrar check-ins */}
      <div>
        <h3 className="text-lg font-bold">Check-ins:</h3>
        {room.hospedajes.length > 0 ? (
          <ul>
            {room.hospedajes.map((checkin: any) => (
              <li key={checkin.id}>
                <p>Fecha de ingreso: {new Date(checkin.fechaIngreso).toLocaleDateString()}</p>
                <p>Fecha de salida: {new Date(checkin.fechaSalida).toLocaleDateString()}</p>
                <p>Huésped: {checkin.huesped.nombre}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay check-ins asociados a esta habitación.</p>
        )}
      </div>
    </div>
  );
}