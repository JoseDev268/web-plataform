'use client'; // Indica que este es un componente del lado del cliente

interface InvoiceStatusBadgeProps {
  status: string; // Ejemplo: 'PENDIENTE', 'PAGADA', 'CANCELADA'
}

export default function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const getColor = () => {
    switch (status) {
      case 'PENDIENTE':
        return 'bg-yellow-500 text-black';
      case 'PAGADA':
        return 'bg-green-500 text-white';
      case 'CANCELADA':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <span
      className={`inline-block py-1 px-3 rounded-full text-sm ${getColor()}`}
    >
      {status}
    </span>
  );
}