import prisma from '@/lib/prisma';

export const getHistorialHospedajes = async () => {
    try {
        const historial = await prisma.fichaHospedaje.findMany({
            where: {
                estado: 'FINALIZADO', // Filtrar solo hospedajes finalizados
                deletedAt: null, // Excluir registros eliminados
            },
            include: {
                huesped: true, // Incluir información del huésped
                habitacion: {
                    include: {
                        tipoHabitacion: true, // Incluir detalles de la habitación y su tipo
                    },
                },
                factura: true, // Incluir información de la factura (opcional)
            },
            orderBy: {
                fechaSalida: 'desc', // Ordenar por fecha de salida descendente
            },
        });

        return historial;
    } catch (error) {
        console.error('Error al obtener el historial de hospedajes:', error);
        throw error;
    }
};