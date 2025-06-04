import prisma from '@/lib/prisma';

export const createInvoice = async (
    fichaHospedajeId: string,
    total: number
) => {
    try {
        const invoice = await prisma.factura.create({
            data: {
                fichaHospedajeId,
                total,
                estado: 'EMITIDA',
            },
        });

        return invoice;
    } catch (error) {
        console.error('Error al crear la factura:', error);
        throw error;
    }
};