import prisma from '@/lib/prisma';
import { EstadoHabitacion } from '@prisma/client';

// Obtener KPIs básicos
export const getKpis = async () => {
    try {
        const totalReservations = await prisma.reserva.count();
        const occupiedRooms = await prisma.habitacion.count({
            where: { estado: 'OCUPADA' },
        });
        const totalRevenue = await prisma.pago.aggregate({
            _sum: { monto: true },
        });

        return {
            totalReservations,
            occupiedRooms,
            totalRevenue: totalRevenue._sum.monto || 0,
        };
    } catch (error) {
        console.error('Error al obtener los KPIs:', error);
        throw error;
    }
};

// Obtener resumen de estado de habitaciones
export const getRoomStatusSummary = async () => {
    try {
        const libres = await prisma.habitacion.count({ where: { estado: 'DISPONIBLE' } });
        const ocupadas = await prisma.habitacion.count({ where: { estado: 'OCUPADA' } });
        const limpieza = await prisma.habitacion.count({ where: { estado: 'LIMPIEZA' } });
        const reservadas = await prisma.habitacion.count({ where: { estado: EstadoHabitacion.RESERVADA } });

        return {
            libres,
            ocupadas,
            limpieza,
            reservadas,
        };
    } catch (error) {
        console.error('Error al obtener el resumen de estados de habitaciones:', error);
        throw error;
    }
};

// Obtener recordatorios de check-out pendientes
export const getCheckoutReminders = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const reminders = await prisma.fichaHospedaje.findMany({
            where: {
                fechaSalida: today,
                factura: {
                    estado: 'EMITIDA', // Facturas pendientes de pago
                },
            },
            include: {
                huesped: true,
                habitacion: true,
                factura: true,
            },
        });

        return reminders;
    } catch (error) {
        console.error('Error al obtener los recordatorios de check-out:', error);
        throw error;
    }
};

// Obtener llegadas de hoy
export const getTodaysArrivals = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const arrivals = await prisma.reserva.findMany({
            where: {
                fechaIngreso: today,
            },
            include: {
                huesped: true, // Incluir información del huésped
                detalleReservas: { // Incluir detalles de la reserva
                    include: {
                        habitacion: true, // Incluir información de la habitación
                    },
                },
            },
        });

        return arrivals;
    } catch (error) {
        console.error('Error al obtener las llegadas de hoy:', error);
        throw error;
    }
};