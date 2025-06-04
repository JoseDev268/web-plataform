export interface Message {
    id: string;
    canal: string;
    contenido: string;
    remitente?: string;
    destinatario?: string;
    estado: string;
    usuarioId?: string;
    huespedId?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }