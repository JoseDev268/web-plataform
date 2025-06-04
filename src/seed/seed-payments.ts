import prisma from '../lib/prisma';
import { initialData } from './seed';

export async function seedPayments() {
  await prisma.pago.deleteMany();

  const facturasDB = await prisma.factura.findMany();
  const facturasMap = facturasDB.reduce((map, factura) => {
    map[factura.id] = factura.id;
    return map;
  }, {} as Record<string, string>);

  for (const pago of initialData.pagos) {
    await prisma.pago.create({
      data: {
        facturaId: facturasMap[pago.facturaId],
        monto: pago.monto,
        metodo: pago.metodo,
        observacion: pago.observacion,
      },
    });
  }
}