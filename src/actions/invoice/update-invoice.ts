import prisma from '@/lib/prisma';
import { EstadoFactura } from '@prisma/client'; // Importa el enum desde Prisma

export const updateInvoice = async (
    invoiceId: string,
    data: Partial<{
        estado?: EstadoFactura; // Usa el tipo específico del enum
        total?: number;
    }>
) => {
    try {
        // Validar que invoiceId no sea undefined o vacío
        if (!invoiceId) {
            throw new Error('ID de factura no proporcionado');
        }

        const updatedInvoice = await prisma.factura.update({
            where: { id: invoiceId },
            data,
        });

        return updatedInvoice;
    } catch (error) {
        console.error('Error al actualizar la factura:', error);
        throw error;
    }
};