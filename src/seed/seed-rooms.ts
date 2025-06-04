import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedRooms() {
  await prisma.habitacion.deleteMany();

  const tiposHabitacionDB = await prisma.tipoHabitacion.findMany();
  const tiposHabitacionMap = tiposHabitacionDB.reduce((map, tipo) => {
    map[tipo.nombre] = tipo.id;
    return map;
  }, {} as Record<string, string>);

  const pisosDB = await prisma.piso.findMany();
  const pisosMap = pisosDB.reduce((map, piso) => {
    map[piso.numero] = piso.id;
    return map;
  }, {} as Record<number, string>);

  for (const habitacion of initialData.habitaciones) {
    await prisma.habitacion.create({
      data: {
        numero: habitacion.numero,
        tipoHabitacionId: tiposHabitacionMap[habitacion.tipoHabitacionNombre],
        pisoId: pisosMap[habitacion.pisoNumero],
        estado: habitacion.estado,
      },
    });
  }
}