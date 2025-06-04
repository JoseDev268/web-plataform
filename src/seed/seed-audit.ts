import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedAudit() {
  await prisma.auditoria.deleteMany();

  const reservasDB = await prisma.reserva.findMany();
  const reservasMap = reservasDB.reduce((map, reserva) => {
    map[reserva.id] = reserva.id;
    return map;
  }, {} as Record<string, string>);

  const usersDB = await prisma.user.findMany();
  const usersMap = usersDB.reduce((map, user) => {
    map[user.email] = user.id;
    return map;
  }, {} as Record<string, string>);

  for (const auditoria of initialData.auditorias) {
    await prisma.auditoria.create({
      data: {
        entidad: auditoria.entidad,
        entidadId: reservasMap[auditoria.entidadId] || reservasDB[0].id,
        accion: auditoria.accion,
        descripcion: auditoria.descripcion,
        usuarioId: auditoria.usuarioEmail ? usersMap[auditoria.usuarioEmail] : null,
      },
    });
  }
}