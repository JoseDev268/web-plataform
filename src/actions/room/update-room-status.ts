import prisma  from '@/lib/prisma';
import { EstadoHabitacion } from '@prisma/client';

export const updateRoomStatus = async (roomId: string, newStatus: string) => {
  try {
    await prisma.habitacion.update({
      where: { id: roomId },
      data: { estado: newStatus as EstadoHabitacion },
    });
  } catch (error) {
    console.error('Error al actualizar el estado de la habitación:', error);
    throw error;
  }
};