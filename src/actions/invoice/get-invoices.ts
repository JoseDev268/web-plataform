import prisma from '@/lib/prisma';

export const getInvoices = async () => {
  try {
    const invoices = await prisma.factura.findMany({
      include: {
        fichaHospedaje: {
          include: {
            huesped: true,
            habitacion: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return invoices;
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
    throw error;
  }
};