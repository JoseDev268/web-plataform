import prisma from '@/lib/prisma';

export const deleteInvoice = async (invoiceId: string) => {
    try {
        await prisma.factura.delete({
            where: { id: invoiceId },
        });
    } catch (error) {
        console.error('Error al eliminar la factura:', error);
        throw error;
    }
};