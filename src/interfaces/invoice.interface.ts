export interface Invoice {
    id: string;
    fichaHospedajeId: string;
    estado: EstadoFactura;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  
  export enum EstadoFactura {
    EMITIDA = 'EMITIDA',
    ANULADA = 'ANULADA',
  }