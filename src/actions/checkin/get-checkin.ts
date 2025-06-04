import prisma  from '@/lib/prisma';
import { Checkin } from '@/interfaces/checkin.interface';

// Función para obtener todos los check-ins
export const getCheckins = async (): Promise<Checkin[]> => {
  try {
    const checkins = await prisma.fichaHospedaje.findMany({
      where: {
        deletedAt: null, // Filtrar solo registros activos (no eliminados)
      },
      include: {
        huesped: true, // Incluir información del huésped
        habitacion: {
          include: {
            tipoHabitacion: true, // Incluir detalles de la habitación y su tipo
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Ordenar por fecha de creación descendente
      },
    });

    return [];

  } catch (error) {
    console.error('Error al obtener los check-ins:', error);
    throw error;
  }
};

// Función para obtener un check-in específico por ID
export const getCheckinById = async (checkinId: string): Promise<Checkin | null> => {
  try {
    if (!checkinId) {
      throw new Error('ID de check-in no proporcionado');
    }

    const checkin = await prisma.fichaHospedaje.findUnique({
      where: {
        id: checkinId,
        deletedAt: null, // Asegurarse de que el registro no esté marcado como eliminado
      },
      include: {
        huesped: true, // Incluir información del huésped
        habitacion: {
          include: {
            tipoHabitacion: true, // Incluir detalles de la habitación y su tipo
          },
        },
      },
    });

    if (!checkin) {
      throw new Error('Check-in no encontrado');
    }

    return null;
  } catch (error) {
    console.error('Error al obtener el check-in por ID:', error);
    throw error;
  }
};