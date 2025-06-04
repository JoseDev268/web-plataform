import prisma  from '@/lib/prisma';

export const getRoomDetails = async (roomId: string) => {
  try {
    // Validar que roomId no sea undefined o vacío
    if (!roomId) {
      throw new Error('ID de habitación no proporcionado');
    }

    const room = await prisma.habitacion.findUnique({
      where: { id: roomId },
      include: {
        tipoHabitacion: true,
        detalleReservaciones: { // Usar la relación correcta
          include: {
            reservacion: {
              include: {
                huesped: true, // Incluir información del huésped
              },
            },
            huespedes: true, // Incluir información de los huéspedes asociados
          },
        },
        hospedajes: { // Usar la relación correcta en lugar de 'checkins'
          include: {
            huesped: true, // Incluir información del huésped
          },
        },
      },
    });

    if (!room) {
      throw new Error('Habitación no encontrada');
    }

    return room;
  } catch (error) {
    console.error('Error al obtener los detalles de la habitación:', error);
    throw error;
  }
};