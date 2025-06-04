import prisma  from '@/lib/prisma';

export const getAvailableData = async () => {
  // Obtener todos los huéspedes
  const huespedes = await prisma.huesped.findMany({
    select: {
      id: true,
      nombre: true,
    },
  });

  // Obtener todas las habitaciones disponibles con su tipo y piso
  const habitaciones = await prisma.habitacion.findMany({
    where: {
      estado: 'DISPONIBLE',
    },
    include: {
      tipoHabitacion: {
        select: {
          nombre: true,
          precio: true,
        },
      },
      piso: {
        select: {
          id: true,
          numero: true,
        },
      },
    },
  });

  return { huespedes, habitaciones };
};