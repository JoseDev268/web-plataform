import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedUsers() {
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: initialData.users,
  });
}