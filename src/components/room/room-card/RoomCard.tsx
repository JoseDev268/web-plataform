'use client'; // Indica que este es un componente del lado del cliente

import Link from 'next/link';
import { updateRoomStatus } from '@/actions/room/update-room-status';
import { useState } from 'react';

interface RoomCardProps {
  room: {
    id: string;
    numero: number;
    estado: string; // Estado de la habitación (DISPONIBLE, OCUPADA, LIMPIEZA, MANTENIMIENTO)
    tipoHabitacion: {
      nombre: string;
      precio: number;
    };
  };
}

export default function RoomCard({ room }: RoomCardProps) {
  const [estado, setEstado] = useState(room.estado);

  // Función para cambiar el estado de la habitación
  const handleUpdateStatus = async (newStatus: string) => {
    try {
      await updateRoomStatus(room.id, newStatus);
      setEstado(newStatus); // Actualiza el estado local
    } catch (error) {
      console.error('Error al actualizar el estado de la habitación:', error);
      alert('Ocurrió un error al actualizar el estado de la habitación.');
    }
  };

  // Determinar el color de fondo según el estado
  const getBackgroundColor = () => {
    switch (estado) {
      case 'DISPONIBLE':
        return 'bg-green-500';
      case 'OCUPADA':
        return 'bg-red-500';
      case 'LIMPIEZA':
        return 'bg-yellow-500';
      case 'RESERVADA':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <Link href={`/room/${room.id}`} className="block">
      <div
        className={`rounded-lg shadow-md p-4 text-white ${getBackgroundColor()}`}
      >
        <h3 className="text-lg font-bold">Habitación {room.numero}</h3>
        <p>Tipo: {room.tipoHabitacion.nombre}</p>
        <p>Precio: ${room.tipoHabitacion.precio}/noche</p>
        <p>Estado: {estado}</p>

        {/* Botones para cambiar el estado */}
        <div className="mt-4 space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evitar que el click en el botón active el enlace
              handleUpdateStatus('DISPONIBLE');
            }}
            className="bg-green-600 px-2 py-1 rounded text-sm"
          >
            Disponible
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateStatus('OCUPADA');
            }}
            className="bg-red-600 px-2 py-1 rounded text-sm"
          >
            Ocupada
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateStatus('LIMPIEZA');
            }}
            className="bg-yellow-600 px-2 py-1 rounded text-sm"
          >
            Limpieza
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateStatus('MANTENIMIENTO');
            }}
            className="bg-gray-600 px-2 py-1 rounded text-sm"
          >
            Mantenimiento
          </button>
        </div>
      </div>
    </Link>
  );
}