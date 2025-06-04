export interface AuditReport {
    id: string;
    entidad: string;
    accion: string;
    descripcion: string;
    usuarioId?: string;
    createdAt: Date;
  }
  
  export interface FinancialReport {
    id: string;
    totalIngresos: number;
    totalGastos?: number;
    fechaInicio: Date;
    fechaFin: Date;
    createdAt: Date;
  }