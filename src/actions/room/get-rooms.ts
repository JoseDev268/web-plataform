import prisma from '@/lib/prisma';

export const getRooms = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  // Obtener habitaciones paginadas
  const rooms = await prisma.habitacion.findMany({
    skip,
    take: pageSize,
    include: {
      tipoHabitacion: {
        select: {
          nombre: true,
          precio: true,
        },
      },
    },
    orderBy: {
      numero: 'asc',
    },
  });

  // Contar el total de habitaciones
  const totalRooms = await prisma.habitacion.count();

  return { rooms, totalRooms };
};