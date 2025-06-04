import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedCheckins() {
  await prisma.fichaHospedaje.deleteMany();

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

  for (const checkin of initialData.checkins) {
    await prisma.fichaHospedaje.create({
      data: {
        huespedId: huespedesMap[checkin.huespedCi],
        habitacionId: habitacionesMap[checkin.habitacionNumero],
        fechaIngreso: new Date(checkin.fechaIngreso),
        fechaSalida: new Date(checkin.fechaSalida),
        estado: checkin.estado,
      },
    });
  }
}