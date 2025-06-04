'use client';

import { useState } from 'react';

interface InvoiceDetailsProps {
  invoice: any; // Reemplaza `any` con el tipo adecuado basado en tu esquema Prisma
}

export default function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Factura #{invoice.id}</h2>
      <p>Huésped: {invoice.fichaHospedaje.huesped.nombre}</p>
      <p>Habitación: {invoice.fichaHospedaje.habitacion.numero}</p>
      <p>Total: ${invoice.total.toFixed(2)}</p>
      <p>Estado: {invoice.estado}</p>

      {/* Pagos Asociados */}
      <div>
        <h3 className="text-lg font-bold">Pagos:</h3>
        {invoice.pagos.length > 0 ? (
          <ul>
            {invoice.pagos.map((pago: any) => (
              <li key={pago.id}>
                <p>Monto: ${pago.monto.toFixed(2)}</p>
                <p>Método: {pago.metodo}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay pagos registrados.</p>
        )}
      </div>
    </div>
  );
}