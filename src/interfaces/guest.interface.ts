export interface Guest {
    id: string;
    nombre: string;
    ci: string;
    email?: string;
    phone?: string;
    nationality?: Nationality;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  
  export enum Nationality {
    BOLIVIA = 'BOLIVIA',
    ARGENTINA = 'ARGENTINA',
    CHILE = 'CHILE',
    PERU = 'PERU',
    BRAZIL = 'BRASIL',
    PARAGUAY = 'PARAGUAY',
    URUGUAY = 'URUGUAY',
    COLOMBIA = 'COLOMBIA',
    VENEZUELA = 'VENEZUELA',
    ECUADOR = 'ECUADOR',
    MEXICO = 'MEXICO',
    UNITED_STATES = 'ESTADOUNIDENSE',
  }