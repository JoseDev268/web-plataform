import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/resend'; // Asumimos que tienes una función para enviar correos

export const sendPendingInvoices = async () => {
    try {
        const pendingInvoices = await prisma.factura.findMany({
            where: { estado: 'EMITIDA' },
            include: {
                fichaHospedaje: {
                    include: {
                        huesped: true,
                    },
                },
            },
        });

        for (const invoice of pendingInvoices) {
            const { huesped } = invoice.fichaHospedaje;

            // Enviar correo electrónico al huésped
            await sendEmail({
                to: huesped.email,
                subject: 'Factura Pendiente',
                body: `Estimado/a ${huesped.nombre}, tiene una factura pendiente por el monto de $${invoice.total}.`,
            });
        }

        return pendingInvoices.length;
    } catch (error) {
        console.error('Error al enviar facturas pendientes:', error);
        throw error;
    }
};