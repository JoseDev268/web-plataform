import { $Enums } from '@prisma/client';

export interface Reservation {
  id: string;
  huespedId: string;
  estado: $Enums.EstadoReserva;
  fechaIngreso: Date;
  fechaSalida: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface ReservationDetail {
  id: string;
  reservacionId: string;
  habitacionId: string;
  precio: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface ReservationGuestDetail {
  id: string;
  detalleReservacionId: string;
  huespedId: string;
}
