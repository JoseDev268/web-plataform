import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedRoomTypes() {
  await prisma.tipoHabitacion.deleteMany();
  await prisma.tipoHabitacion.createMany({
    data: initialData.tipoHabitaciones,
  });
}