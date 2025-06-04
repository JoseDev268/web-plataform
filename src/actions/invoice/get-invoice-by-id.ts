import prisma from '@/lib/prisma';

export const getInvoiceById = async (invoiceId: string) => {
    try {
        const invoice = await prisma.factura.findUnique({
            where: { id: invoiceId },
            include: {
                fichaHospedaje: {
                    include: {
                        huesped: true,
                        habitacion: true,
                    },
                },
                pagos: true,
            },
        });

        if (!invoice) {
            throw new Error('Factura no encontrada');
        }

        return invoice;
    } catch (error) {
        console.error('Error al obtener la factura por ID:', error);
        throw error;
    }
};