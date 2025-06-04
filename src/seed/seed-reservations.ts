import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedReservations() {
  await prisma.detalleReservacionHuesped.deleteMany();
  await prisma.detalleReservacion.deleteMany();
  await prisma.reserva.deleteMany();

  const huespedesDB = await prisma.huesped.findMany();
  const huespedesMap = huespedesDB.reduce((map, huesped) => {
    map[huesped.ci] = huesped.id;
    return map;
  }, {} as Record<string, string>);

  const habitacionesDB = await prisma.habitacion.findMany();
  const habitacionesMap = habitacionesDB.reduce((map, habitacion) => {
    map[habitacion.numero] = habitacion.id;
    return map;
  }, {} as Record<number, string>);

  for (const reserva of initialData.reservas) {
    const reservaDB = await prisma.reserva.create({
      data: {
        huespedId: huespedesMap[reserva.huespedCi],
        estado: reserva.estado,
        fechaIngreso: new Date(reserva.fechaIngreso),
        fechaSalida: new Date(reserva.fechaSalida),
      },
    });

    for (const detalle of reserva.detalles) {
      const detalleDB = await prisma.detalleReservacion.create({
        data: {
          reservacionId: reservaDB.id,
          habitacionId: habitacionesMap[detalle.habitacionNumero],
          precio: detalle.precio,
        },
      });

      for (const huespedCi of detalle.huespedesCi) {
        await prisma.detalleReservacionHuesped.create({
          data: {
            detalleReservacionId: detalleDB.id,
            huespedId: huespedesMap[huespedCi],
          },
        });
      }
    }
  }
}