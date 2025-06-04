import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedGuests() {
  await prisma.huesped.deleteMany();
  await prisma.huesped.createMany({
    data: initialData.huespedes,
  });
}