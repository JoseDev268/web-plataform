// seed-messages.ts
import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedMessages() {
  await prisma.mensaje.deleteMany();

  const usuariosDB = await prisma.user.findMany();
  const usuariosMap = usuariosDB.reduce((map, user) => {
    map[user.email] = user.id;
    return map;
  }, {} as Record<string, string>);

  const huespedesDB = await prisma.huesped.findMany();
  const huespedesMap = huespedesDB.reduce((map, huesped) => {
    map[huesped.ci] = huesped.id;
    return map;
  }, {} as Record<string, string>);

  for (const mensaje of initialData.mensajes) {
    await prisma.mensaje.create({
      data: {
        canal: mensaje.canal,
        contenido: mensaje.contenido,
        remitente: mensaje.remitente,
        destinatario: mensaje.destinatario,
        estado: mensaje.estado,
        usuarioId: mensaje.usuarioEmail ? usuariosMap[mensaje.usuarioEmail] : null,
        huespedId: mensaje.huespedCi ? huespedesMap[mensaje.huespedCi] : null,
      },
    });
  }
}