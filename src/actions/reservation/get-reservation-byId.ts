 'use server';

import prisma from '@/lib/prisma';

export const getReservationById = async (id: string) => {
  try {
    // Buscar la reserva por ID e incluir relaciones necesarias
    const reservation = await prisma.reserva.findUnique({
      include: {
        huesped: true, // Incluir datos del huésped
        detalleReservas: {
          include: {
            habitacion: true, // Incluir datos de las habitaciones reservadas
          },
        },
      },
      where: {
        id: id, // Filtrar por ID
      },
    });

    // Si no se encuentra la reserva, retornar null
    if (!reservation) return null;

    // Formatear los datos para facilitar su uso en el frontend
    return {
      ...reservation,
      detalleReservas: reservation.detalleReservas.map((detalle) => ({
        ...detalle,
        habitacionNumero: detalle.habitacion.numero, // Agregar el número de habitación
      })),
    };
  } catch (error) {
    console.error('Error al obtener la reserva por ID:', error);
    throw new Error('Error al obtener la reserva por ID');
  }
};