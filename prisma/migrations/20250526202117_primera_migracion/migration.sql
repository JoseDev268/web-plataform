-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "EstadoHospedaje" AS ENUM ('ACTIVO', 'FINALIZADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "EstadoFactura" AS ENUM ('EMITIDA', 'ANULADA');

-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('EFECTIVO', 'TARJETA', 'QR', 'TRANSFERENCIA', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoHabitacion" AS ENUM ('DISPONIBLE', 'OCUPADA', 'LIMPIEZA', 'MANTENIMIENTO');

-- CreateEnum
CREATE TYPE "RolUser" AS ENUM ('ADMIN', 'RECEPCIONISTA', 'GERENTE', 'USER');

-- CreateEnum
CREATE TYPE "Nacionalidad" AS ENUM ('BOLIVIA', 'ARGENTINA', 'CHILE', 'PERU', 'BRASIL', 'PARAGUAY', 'URUGUAY', 'COLOMBIA', 'VENEZUELA', 'ECUADOR', 'MEXICO', 'ESTADOUNIDENSE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "RolUser" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Huesped" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "correo" TEXT,
    "telefono" TEXT,
    "nacionalidad" "Nacionalidad",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Huesped_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habitacion" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "tipoHabitacionId" TEXT NOT NULL,
    "pisoId" TEXT NOT NULL,
    "estado" "EstadoHabitacion" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Habitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Piso" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Piso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoHabitacion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TipoHabitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL,
    "huespedId" TEXT NOT NULL,
    "estado" "EstadoReserva" NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "fechaSalida" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleReservacion" (
    "id" TEXT NOT NULL,
    "reservacionId" TEXT NOT NULL,
    "habitacionId" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DetalleReservacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleReservacionHuesped" (
    "id" TEXT NOT NULL,
    "detalleReservacionId" TEXT NOT NULL,
    "huespedId" TEXT NOT NULL,

    CONSTRAINT "DetalleReservacionHuesped_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FichaHospedaje" (
    "id" TEXT NOT NULL,
    "huespedId" TEXT NOT NULL,
    "habitacionId" TEXT NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "fechaSalida" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoHospedaje" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FichaHospedaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factura" (
    "id" TEXT NOT NULL,
    "fichaHospedajeId" TEXT NOT NULL,
    "estado" "EstadoFactura" NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" TEXT NOT NULL,
    "facturaId" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "metodo" "MetodoPago" NOT NULL,
    "observacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auditoria" (
    "id" TEXT NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidadId" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "usuarioId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Huesped_ci_key" ON "Huesped"("ci");

-- CreateIndex
CREATE INDEX "Huesped_ci_idx" ON "Huesped"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "Habitacion_numero_key" ON "Habitacion"("numero");

-- CreateIndex
CREATE INDEX "Habitacion_numero_idx" ON "Habitacion"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Piso_numero_key" ON "Piso"("numero");

-- CreateIndex
CREATE INDEX "Piso_numero_idx" ON "Piso"("numero");

-- CreateIndex
CREATE INDEX "Reserva_huespedId_idx" ON "Reserva"("huespedId");

-- CreateIndex
CREATE INDEX "DetalleReservacion_reservacionId_idx" ON "DetalleReservacion"("reservacionId");

-- CreateIndex
CREATE INDEX "DetalleReservacion_habitacionId_idx" ON "DetalleReservacion"("habitacionId");

-- CreateIndex
CREATE INDEX "DetalleReservacionHuesped_detalleReservacionId_idx" ON "DetalleReservacionHuesped"("detalleReservacionId");

-- CreateIndex
CREATE INDEX "DetalleReservacionHuesped_huespedId_idx" ON "DetalleReservacionHuesped"("huespedId");

-- CreateIndex
CREATE INDEX "FichaHospedaje_huespedId_idx" ON "FichaHospedaje"("huespedId");

-- CreateIndex
CREATE INDEX "FichaHospedaje_habitacionId_idx" ON "FichaHospedaje"("habitacionId");

-- CreateIndex
CREATE UNIQUE INDEX "Factura_fichaHospedajeId_key" ON "Factura"("fichaHospedajeId");

-- CreateIndex
CREATE INDEX "Factura_fichaHospedajeId_idx" ON "Factura"("fichaHospedajeId");

-- CreateIndex
CREATE INDEX "Pago_facturaId_idx" ON "Pago"("facturaId");

-- CreateIndex
CREATE INDEX "Auditoria_usuarioId_idx" ON "Auditoria"("usuarioId");

-- AddForeignKey
ALTER TABLE "Habitacion" ADD CONSTRAINT "Habitacion_tipoHabitacionId_fkey" FOREIGN KEY ("tipoHabitacionId") REFERENCES "TipoHabitacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habitacion" ADD CONSTRAINT "Habitacion_pisoId_fkey" FOREIGN KEY ("pisoId") REFERENCES "Piso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_huespedId_fkey" FOREIGN KEY ("huespedId") REFERENCES "Huesped"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleReservacion" ADD CONSTRAINT "DetalleReservacion_reservacionId_fkey" FOREIGN KEY ("reservacionId") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleReservacion" ADD CONSTRAINT "DetalleReservacion_habitacionId_fkey" FOREIGN KEY ("habitacionId") REFERENCES "Habitacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleReservacionHuesped" ADD CONSTRAINT "DetalleReservacionHuesped_detalleReservacionId_fkey" FOREIGN KEY ("detalleReservacionId") REFERENCES "DetalleReservacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleReservacionHuesped" ADD CONSTRAINT "DetalleReservacionHuesped_huespedId_fkey" FOREIGN KEY ("huespedId") REFERENCES "Huesped"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaHospedaje" ADD CONSTRAINT "FichaHospedaje_huespedId_fkey" FOREIGN KEY ("huespedId") REFERENCES "Huesped"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaHospedaje" ADD CONSTRAINT "FichaHospedaje_habitacionId_fkey" FOREIGN KEY ("habitacionId") REFERENCES "Habitacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_fichaHospedajeId_fkey" FOREIGN KEY ("fichaHospedajeId") REFERENCES "FichaHospedaje"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auditoria" ADD CONSTRAINT "Auditoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
