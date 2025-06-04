import { getRooms } from '@/actions/room/get-rooms';
import RoomCard from '@/components/room/room-card/RoomCard';
import Pagination from '@/components/ui/pagination/Pagination';

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function RoomsPage({ searchParams }: PageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const pageSize = 3;

  // Obtener las habitaciones paginadas
  const { rooms, totalRooms } = await getRooms(currentPage, pageSize);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Habitaciones</h1>

      {/* Grid de tarjetas de habitaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalRooms / pageSize)}
        basePath="/rooms"
      />
    </div>
  );
}