'use server';

import prisma from '@/lib/prisma';
import { Guest } from '@/interfaces';
import { auth } from '@/auth.config';




export async function getGuests() {



    const session = await auth();
    if (!session || !session.user || !['ADMIN', 'RECEPCIONISTA'].includes(session.user.rol)) {
        throw new Error('No autorizado');
    }

    try {
        const guests = await prisma.huesped.findMany({
            where: { deletedAt: null },
            select: {
                id: true,
                nombre: true,
                ci: true,
                correo: true,
                telefono: true,
                nacionalidad: true,
            },
        });
        return guests.map((guest) => ({
            id: guest.id,
            name: guest.nombre,
            ci: guest.ci,
            email: guest.correo,
            phone: guest.telefono,
            nationality: guest.nacionalidad,
            createdAt: new Date(),
            updatedAt: new Date(),
        })) as Guest[];
    } catch (error) {
        console.error('Error fetching guests:', error);
        throw new Error('No se pudieron obtener los huéspedes');
    }
}