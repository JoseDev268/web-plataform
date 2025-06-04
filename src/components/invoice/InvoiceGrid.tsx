'use client';

import Link from 'next/link';
import { useState } from 'react';

interface InvoiceGridProps {
  invoices: any[]; // Reemplaza `any` con el tipo adecuado basado en tu esquema Prisma
}

export default function InvoiceGrid({ invoices }: InvoiceGridProps) {
  const [filter, setFilter] = useState('');

  return (
    <div>
      {/* Filtro */}
      <input
        type="text"
        placeholder="Buscar por nombre de huésped..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full mb-4"
      />

      {/* Tabla de Facturas */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Huésped</th>
            <th className="p-2">Total</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices
            .filter((invoice) =>
              invoice.fichaHospedaje.huesped.nombre
                .toLowerCase()
                .includes(filter.toLowerCase())
            )
            .map((invoice) => (
              <tr key={invoice.id}>
                <td className="p-2">{invoice.id}</td>
                <td className="p-2">{invoice.fichaHospedaje.huesped.nombre}</td>
                <td className="p-2">${invoice.total.toFixed(2)}</td>
                <td className="p-2">{invoice.estado}</td>
                <td className="p-2">
                  <Link href={`/invoices/${invoice.id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      Ver Detalles
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}