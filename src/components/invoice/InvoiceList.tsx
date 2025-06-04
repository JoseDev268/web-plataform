'use client'; // Indica que este es un componente del lado del cliente

import Link from 'next/link';
import { Invoice } from '@/interfaces';
import InvoiceStatusBadge from './InvoiceStatusBadge';

interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Huésped</th>
            <th className="py-2 px-4 text-left">Monto</th>
            <th className="py-2 px-4 text-left">Estado</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-t border-gray-200">
              <td className="py-2 px-4">{invoice.id}</td>
              <td className="py-2 px-4">
                {invoice.fichaHospedajeId || 'Sin ficha de hospedaje'}
              </td>
              <td className="py-2 px-4">${invoice.total.toFixed(2)}</td>
              <td className="py-2 px-4">
                <InvoiceStatusBadge status={invoice.estado} />
              </td>
              <td className="py-2 px-4">
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Ver detalles
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}