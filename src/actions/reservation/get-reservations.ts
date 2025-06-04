import  prisma  from '@/lib/prisma';

export const getReservations = async (userId?: string) => {
  try {
    return await prisma.reserva.findMany({
      where: userId ? { huespedId: userId } : {},
      include: {
        huesped: true, // Include guest details
        detalleReservas: {
          include: {
            habitacion: true, // Include room details
          },
        },
      },
      orderBy: { fechaIngreso: 'asc' }, // Sort by check-in date
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw new Error('Failed to fetch reservations');
  }
};