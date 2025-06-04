export interface Checkin {
    id: string;
    huespedId: string;
    habitacionId: string;
    fechaIngreso: Date;
    fechaSalida: Date;
    estado: EstadoHospedaje;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  
  export enum EstadoHospedaje {
    ACTIVO = 'ACTIVO',
    FINALIZADO = 'FINALIZADO',
    CANCELADO = 'CANCELADO',
  }