import bcryptjs from 'bcryptjs';

interface SeedUser {
  name: string;
  email: string;
  password: string;
  rol: 'ADMIN' | 'RECEPCIONISTA' | 'GERENTE' | 'USER';
}

interface SeedPiso {
  numero: number;
}

interface SeedTipoHabitacion {
  nombre: string;
  descripcion: string;
  precio: number;
  images: string[];
}

interface SeedHabitacion {
  numero: number;
  tipoHabitacionNombre: string;
  pisoNumero: number;
  estado: 'DISPONIBLE' | 'OCUPADA' | 'LIMPIEZA' | 'MANTENIMIENTO';
}

interface SeedHuesped {
  nombre: string;
  ci: string;
  correo?: string;
  telefono?: string;
  nacionalidad?: 'BOLIVIA' | 'ARGENTINA' | 'CHILE' | 'PERU' | 'BRASIL' | 'PARAGUAY' | 'URUGUAY' | 'COLOMBIA' | 'VENEZUELA' | 'ECUADOR' | 'MEXICO' | 'ESTADOUNIDENSE';
}

interface SeedReserva {
  huespedCi: string;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA';
  fechaIngreso: string;
  fechaSalida: string;
  detalles: {
    habitacionNumero: number;
    precio: number;
    huespedesCi: string[];
  }[];
}

interface SeedFichaHospedaje {
  huespedCi: string;
  habitacionNumero: number;
  fechaIngreso: string;
  fechaSalida: string;
  estado: 'ACTIVO' | 'FINALIZADO' | 'CANCELADO';
}

interface SeedFactura {
  fichaHospedajeId: string;
  estado: 'EMITIDA' | 'ANULADA';
  total: number;
}

interface SeedPago {
  facturaId: string;
  monto: number;
  metodo: 'EFECTIVO' | 'TARJETA' | 'QR' | 'TRANSFERENCIA' | 'OTRO';
  observacion?: string;
}

interface SeedAuditoria {
  entidad: string;
  entidadId: string;
  accion: string;
  descripcion: string;
  usuarioEmail?: string;
}

interface SeedMensaje {
  canal: string;
  contenido: string;
  remitente?: string;
  destinatario?: string;
  estado: 'ENVIADO' | 'RECIBIDO' | 'LEIDO';
  usuarioEmail?: string;
  huespedCi?: string;
}

interface SeedData {
  users: SeedUser[];
  pisos: SeedPiso[];
  tipoHabitaciones: SeedTipoHabitacion[];
  habitaciones: SeedHabitacion[];
  huespedes: SeedHuesped[];
  reservas: SeedReserva[];
  checkins: SeedFichaHospedaje[];
  facturas: SeedFactura[];
  pagos: SeedPago[];
  auditorias: SeedAuditoria[];
  mensajes: SeedMensaje[];
}

export const initialData: SeedData = {
  users: [
    {
      name: 'Juan Perez',
      email: 'juan.perez@hotel.com',
      password: bcryptjs.hashSync('123456'),
      rol: 'ADMIN',
    },
    {
      name: 'Maria Gomez',
      email: 'maria.gomez@hotel.com',
      password: bcryptjs.hashSync('123456'),
      rol: 'RECEPCIONISTA',
    },
    {
      name: 'Carlos Lopez',
      email: 'carlos.lopez@hotel.com',
      password: bcryptjs.hashSync('123456'),
      rol: 'GERENTE',
    },
    {
      name: 'Ana Rodriguez',
      email: 'ana.rodriguez@hotel.com',
      password: bcryptjs.hashSync('123456'),
      rol: 'USER',
    },
  ],
  pisos: [
    { numero: 1 },
    { numero: 2 },
    { numero: 3 },
  ],
  tipoHabitaciones: [
    {
      nombre: 'Individual',
      descripcion: 'Habitación con cama individual y baño privado.',
      precio: 50.0,
      images: ['individual1.jpg', 'individual2.jpg'],
    },
    {
      nombre: 'Doble',
      descripcion: 'Habitación con cama doble y vistas al jardín.',
      precio: 80.0,
      images: ['doble1.jpg', 'doble2.jpg'],
    },
    {
      nombre: 'Suite',
      descripcion: 'Habitación de lujo con jacuzzi y balcón.',
      precio: 150.0,
      images: ['suite1.jpg', 'suite2.jpg'],
    },
  ],
  habitaciones: [
    { numero: 101, tipoHabitacionNombre: 'Individual', pisoNumero: 1, estado: 'DISPONIBLE' },
    { numero: 102, tipoHabitacionNombre: 'Individual', pisoNumero: 1, estado: 'OCUPADA' },
    { numero: 201, tipoHabitacionNombre: 'Doble', pisoNumero: 2, estado: 'DISPONIBLE' },
    { numero: 202, tipoHabitacionNombre: 'Doble', pisoNumero: 2, estado: 'LIMPIEZA' },
    { numero: 301, tipoHabitacionNombre: 'Suite', pisoNumero: 3, estado: 'DISPONIBLE' },
  ],
  huespedes: [
    {
      nombre: 'Luis Fernandez',
      ci: '1234567LP',
      correo: 'luis.fernandez@gmail.com',
      telefono: '+59112345678',
      nacionalidad: 'BOLIVIA',
    },
    {
      nombre: 'Sofia Martinez',
      ci: '9876543CB',
      correo: 'sofia.martinez@gmail.com',
      telefono: '+59187654321',
      nacionalidad: 'ARGENTINA',
    },
    {
      nombre: 'Pedro Silva',
      ci: '4567891SC',
      correo: 'pedro.silva@gmail.com',
      telefono: '+59145678912',
      nacionalidad: 'BRASIL',
    },
  ],
  reservas: [
    {
      huespedCi: '1234567LP',
      estado: 'CONFIRMADA',
      fechaIngreso: '2025-06-01T14:00:00Z',
      fechaSalida: '2025-06-05T12:00:00Z',
      detalles: [
        {
          habitacionNumero: 101,
          precio: 50.0,
          huespedesCi: ['1234567LP'],
        },
      ],
    },
    {
      huespedCi: '9876543CB',
      estado: 'PENDIENTE',
      fechaIngreso: '2025-06-10T14:00:00Z',
      fechaSalida: '2025-06-15T12:00:00Z',
      detalles: [
        {
          habitacionNumero: 201,
          precio: 80.0,
          huespedesCi: ['9876543CB', '4567891SC'],
        },
      ],
    },
  ],
  checkins: [
    {
      huespedCi: '1234567LP',
      habitacionNumero: 101,
      fechaIngreso: '2025-06-01T14:00:00Z',
      fechaSalida: '2025-06-05T12:00:00Z',
      estado: 'ACTIVO',
    },
  ],
  facturas: [
    {
      fichaHospedajeId: '',
      estado: 'EMITIDA',
      total: 200.0,
    },
  ],
  pagos: [
    {
      facturaId: '',
      monto: 100.0,
      metodo: 'TARJETA',
      observacion: 'Pago inicial',
    },
    {
      facturaId: '',
      monto: 100.0,
      metodo: 'EFECTIVO',
      observacion: 'Pago final',
    },
  ],
  mensajes: [
    {
      canal: 'EMAIL',
      contenido: 'Gracias por su reserva en nuestro hotel. Confirmamos su llegada el 1 de junio.',
      remitente: 'info@hotel.com',
      destinatario: 'luis.fernandez@gmail.com',
      estado: 'ENVIADO',
      usuarioEmail: 'maria.gomez@hotel.com',
      huespedCi: '1234567LP',
    },
    {
      canal: 'WHATSAPP',
      contenido: 'Hola, ¿puede confirmar su hora de llegada?',
      remitente: '+59112345678',
      destinatario: '+59187654321',
      estado: 'RECIBIDO',
      usuarioEmail: 'maria.gomez@hotel.com',
      huespedCi: '9876543CB',
    },
  ],
  auditorias: [
    {
      entidad: 'Reserva',
      entidadId: '',
      accion: 'CREAR',
      descripcion: 'Creación de reserva para huesped Luis Fernandez',
      usuarioEmail: 'juan.perez@hotel.com',
    },
    {
      entidad: 'Mensaje',
      entidadId: '',
      accion: 'ENVIAR',
      descripcion: 'Envío de mensaje de confirmación a Luis Fernandez',
      usuarioEmail: 'maria.gomez@hotel.com',
    },
  ],
};