-- CreateTable
CREATE TABLE "Mensaje" (
    "id" TEXT NOT NULL,
    "canal" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "remitente" TEXT,
    "destinatario" TEXT,
    "estado" TEXT NOT NULL,
    "usuarioId" TEXT,
    "huespedId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Mensaje_usuarioId_idx" ON "Mensaje"("usuarioId");

-- CreateIndex
CREATE INDEX "Mensaje_huespedId_idx" ON "Mensaje"("huespedId");

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_huespedId_fkey" FOREIGN KEY ("huespedId") REFERENCES "Huesped"("id") ON DELETE SET NULL ON UPDATE CASCADE;
