import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedInvoices() {
  await prisma.factura.deleteMany();

  const fichasDB = await prisma.fichaHospedaje.findMany();
  const fichasMap = fichasDB.reduce((map, ficha) => {
    map[ficha.id] = ficha.id;
    return map;
  }, {} as Record<string, string>);

  for (const factura of initialData.facturas) {
    await prisma.factura.create({
      data: {
        fichaHospedajeId: fichasMap[factura.fichaHospedajeId],
        estado: factura.estado,
        total: factura.total,
      },
    });
  }
}