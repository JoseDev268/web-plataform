// import { $Enums } from "@prisma/client";

export interface Room {
    id: string;
    numero: number;
    tipoHabitacionId: string;
    pisoId: string;
    estado: EstadoHabitacion;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;

    // Relaciones
    tipoHabitacion: RoomType; // Relación con el tipo de habitación
    piso?: Floor; // Relación con el piso
}

export interface RoomType {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;

    // Relación inversa
    habitaciones: Room[]; // Lista de habitaciones asociadas a este tipo
}

export interface Floor {
    id: string;
    numero: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;

    // Relación inversa
    habitaciones: Room[]; // Lista de habitaciones en este piso
}



export enum EstadoHabitacion {
    DISPONIBLE = 'DISPONIBLE',
    OCUPADA = 'OCUPADA',
    LIMPIEZA = 'LIMPIEZA',
    MANTENIMIENTO = 'MANTENIMIENTO',
    RESERVADA = 'RESERVADA',
  }
