'use server';

import prisma  from '@/lib/prisma';

// Función para calcular el precio total
const calcularPrecio = async (habitacionId: string, fechaIngreso: Date, fechaSalida: Date): Promise<number> => {
  // Obtener el tipo de habitación asociado a la habitación
  const habitacion = await prisma.habitacion.findUnique({
    where: { id: habitacionId },
    include: {
      tipoHabitacion: true,
    },
  });

  if (!habitacion || !habitacion.tipoHabitacion) {
    throw new Error('Habitación o tipo de habitación no encontrado');
  }

  // Calcular el número de noches
  const ingreso = new Date(fechaIngreso);
  const salida = new Date(fechaSalida);
  const diffTime = salida.getTime() - ingreso.getTime();
  const numeroNoches = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Calcular el precio total
  const precioTotal = habitacion.tipoHabitacion.precio * numeroNoches;
  return precioTotal;
};

export const createReservation = async (
  huespedId: string,
  fechaIngreso: Date,
  fechaSalida: Date,
  habitaciones: string[] // IDs de las habitaciones seleccionadas
) => {
  try {
    // Verificar la disponibilidad de las habitaciones
    const habitacionesDisponibles = await prisma.habitacion.findMany({
      where: {
        id: { in: habitaciones },
        estado: 'DISPONIBLE',
      },
    });

    if (habitacionesDisponibles.length !== habitaciones.length) {
      return {
        ok: false,
        message: 'Una o más habitaciones no están disponibles',
      };
    }

    // Crear la reserva
    const reserva = await prisma.reserva.create({
      data: {
        huespedId,
        fechaIngreso,
        fechaSalida,
        estado: 'PENDIENTE', // Estado inicial de la reserva
        detalleReservas: {
          create: await Promise.all(
            habitaciones.map(async (habitacionId) => ({
              habitacionId,
              precio: await calcularPrecio(habitacionId, fechaIngreso, fechaSalida),
            }))
          ),
        },
      },
      select: {
        id: true,
        fechaIngreso: true,
        fechaSalida: true,
        estado: true,
        huesped: {
          select: {
            nombre: true,
          },
        },
      },
    });

    // Actualizar el estado de las habitaciones a OCUPADA
    await prisma.habitacion.updateMany({
      where: { id: { in: habitaciones } },
      data: { estado: 'OCUPADA' },
    });

    return {
      ok: true,
      reserva: reserva,
      message: 'Reserva creada exitosamente',
    };
  } catch (error) {
    console.error('Error al crear la reserva:', error);

    return {
      ok: false,
      message: 'No se pudo crear la reserva',
    };
  }
};