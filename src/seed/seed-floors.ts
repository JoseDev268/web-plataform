import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedFloors() {
  await prisma.piso.deleteMany();
  await prisma.piso.createMany({
    data: initialData.pisos,
  });
}