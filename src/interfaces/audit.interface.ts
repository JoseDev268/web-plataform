export interface Audit {
    id: string;
    entidad: string;
    entidadId: string;
    accion: string;
    descripcion: string;
    usuarioId?: string;
    createdAt: Date;
  }