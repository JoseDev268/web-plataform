import { notFound } from 'next/navigation';
import { getRoomDetails } from '@/actions/room/get-room-details';
import {RoomDetails} from '@/components';

interface PageProps {
  params: {
    id: string; // Asegúrate de que este parámetro coincida con el nombre del archivo dinámico ([id])
  };
}

export default async function RoomDetailsPage({ params }: PageProps) {
  const { id } = params;

  // Validar que el ID exista
  if (!id) {
    notFound(); // Redirige a una página de error si el ID no está presente
  }

  // Obtener los detalles de la habitación
  const room = await getRoomDetails(id);

  if (!room) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Habitación</h1>
      <RoomDetails room={room} />
    </div>
  );
}